import React, { useState, useCallback } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_IMAGE_COUNT = 5;

interface ImageFile {
  file: File;
  preview: string;
}

interface ImageUploaderProps {
  onImagesChange: (images: ImageFile[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange }) => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 5MB limit.";
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return "Invalid file type. Only .jpg, .jpeg, .png and .webp are allowed.";
    }
    return null;
  };

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: ImageFile[] = [];
    let errorMessage: string | null = null;

    files.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errorMessage = error;
      } else if (imageFiles.length + newImages.length < MAX_IMAGE_COUNT) {
        newImages.push({
          file,
          preview: URL.createObjectURL(file),
        });
      } else {
        errorMessage = `You can only upload up to ${MAX_IMAGE_COUNT} images.`;
      }
    });

    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError(null);
      const updatedImages = [...imageFiles, ...newImages];
      setImageFiles(updatedImages);
      onImagesChange(updatedImages);
    }
  }, [imageFiles, onImagesChange]);

  const removeImage = useCallback((index: number) => {
    setImageFiles((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      onImagesChange(updatedImages);
      return updatedImages;
    });
  }, [onImagesChange]);

  return (
    <div className="mb-4">
      <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-700">
        Images (Max {MAX_IMAGE_COUNT})
      </label>
      <input
        type="file"
        id="images"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        multiple
        onChange={handleImageUpload}
        className="w-full px-3 py-2 border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      
      {imageFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Image Previews:</h3>
          <div className="grid grid-cols-3 gap-2">
            {imageFiles.map((image, index) => (
              <div key={index} className="relative">
                <img src={image.preview} alt={`preview ${index}`} className="w-full h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
