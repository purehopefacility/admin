// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMN8TyE6WGuG-2AZy7kmCYC5Nrxx59qzs",
  authDomain: "purehope-web.firebaseapp.com",
  projectId: "purehope-web",
  storageBucket: "purehope-web.appspot.com",
  messagingSenderId: "458513442949",
  appId: "1:458513442949:web:17f004684478b705f3a1ec",
  measurementId: "G-D1NM1J58LQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

//STORAG REFS FOR EACH DIR
const CustomerRef = ref(storage, "customer_avatars/");
const ServiceRef = ref(storage, "service_images/");
const SliderRef = ref(storage, "slider_images/");
//const analytics = getAnalytics(app);

//FUNCTIONS
export const AddImage = async (file: File, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};
export const AddImageSet = async (
  files: File[],
  path: string,
): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file) => AddImage(file, path));

    const downloadURLs = await Promise.all(uploadPromises);

    return downloadURLs;
  } catch (error) {
    console.error("Error uploading image set: ", error);
    throw error;
  }
};

export const DelImage = async (url: string): Promise<void> => {
  try {
    const imageRef = ref(storage, url);

    await deleteObject(imageRef);

    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image: ", error);
    throw error;
  }
};
export const DelImageSet = async (urls: string[]): Promise<void> => {
  try {
    const deletePromises = urls.map((url) => DelImage(url));

    await Promise.all(deletePromises);

    console.log("All images deleted successfully");
  } catch (error) {
    console.error("Error deleting image set: ", error);
    throw error;
  }
};
