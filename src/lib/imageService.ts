// import { promises as fs } from "fs";
// import path from "path";

// export default class ImageService {
//   static async saveImages(
//     imageArray: File[],
//     subdirectory: string,
//     subSubdirectory: string,
//   ): Promise<string> {
//     if (!subdirectory || !subSubdirectory) {
//       console.error("Invalid directory names provided:", {
//         subdirectory,
//         subSubdirectory,
//       });
//       throw new Error("Directory names must be valid non-empty strings.");
//     }

//     const baseDir = path.join(process.cwd(), "public", subdirectory);
//     await ImageService.ensureDirectoryExists(baseDir);

//     const finalDir = path.join(baseDir, subSubdirectory);
//     await ImageService.ensureDirectoryExists(finalDir);
//     let dirlist = [];

//     for (const file of imageArray) {
//       if (file.name) {
//         const filePath = path.join(finalDir, file.name);
//         const data = new Uint8Array(await file.arrayBuffer());
//         await fs.writeFile(filePath, data);
//         dirlist.push(filePath);
//       } else {
//         console.error("File name is missing for file:", file);
//         throw new Error("Each file must have a name.");
//       }
//     }
//     const jsonDirlist = JSON.stringify(dirlist);

//     // Now you can use the jsonDirlist variable however you need it, for example, return it:
//     return jsonDirlist;
//   }

//   //URL --> can use directly in img tags and al
//   static async retrieveImages(
//     subdirectory: string,
//     subSubdirectory: string,
//   ): Promise<string[]> {
//     if (!subdirectory || !subSubdirectory) {
//       console.error("Invalid directory names provided:", {
//         subdirectory,
//         subSubdirectory,
//       });
//       throw new Error("Directory names must be valid non-empty strings.");
//     }

//     const dirPath = path.join("public", subdirectory, subSubdirectory);

//     try {
//       const files = await fs.readdir(path.join(process.cwd(), dirPath));

//       return files.map((file) => `/${subdirectory}/${subSubdirectory}/${file}`);
//     } catch (error) {
//       console.error("Error retrieving images:", error);
//       throw error;
//     }
//   }

//   private static async ensureDirectoryExists(
//     directoryPath: string,
//   ): Promise<void> {
//     try {
//       await fs.access(directoryPath);
//     } catch (error) {
//       console.log(`Creating directory at ${directoryPath}`);
//       await fs.mkdir(directoryPath, { recursive: true });
//     }
//   }
// }

import { put, list, del } from '@vercel/blob';

export default class ImageService {
  static async saveImage(
    image:File,
    subdirectory: string,
    subSubdirectory: string,
  ):Promise<string>{
    
    if (!subdirectory || !subSubdirectory) {
      console.error("Invalid directory names provided:", { subdirectory, subSubdirectory });
      throw new Error("Directory names must be valid non-empty strings.");
    }
      let imageUrl:string
      if (image.name) {
        const blobPath = `${subdirectory}/${subSubdirectory}/${image.name}`;
        const { url } = await put(blobPath, image, { access: 'public' });
        imageUrl = url
      } else {
        console.error("File name is missing for file:", image);
        throw new Error("Each file must have a name.");
      }

    return imageUrl;
  }
  static async saveImages(
    imageArray:File[],
    subdirectory: string,
    subSubdirectory: string,
  ): Promise<string> {

    if (!subdirectory || !subSubdirectory) {
      console.error("Invalid directory names provided:", { subdirectory, subSubdirectory });
      throw new Error("Directory names must be valid non-empty strings.");
    }

    const imageUrls = [];

    for (const file of imageArray) {
      if (file.name) {
        const blobPath = `${subdirectory}/${subSubdirectory}/${file.name}`;
        const { url } = await put(blobPath, file, { access: 'public' });
        imageUrls.push(url);
      } else {
        console.error("File name is missing for file:", file);
        throw new Error("Each file must have a name.");
      }
    }

    return JSON.stringify(imageUrls);
  }

  static async retrieveImages(quoteId: string): Promise<string[]> {
    const { blobs } = await list();
    return blobs
      .filter(blob => blob.pathname.includes(`Quotations/${quoteId}/`))
      .map(blob => blob.url);
  }

  static async deleteImage(url: string): Promise<void> {
    await del(url);
  }
}