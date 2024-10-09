import React, { useState, useCallback } from "react";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface RequestFormProps {
  selectedService: {
    serviceId: number;
    serviceTitle1: string;
    serviceTitle2: string;
  };
  handleBackClick: () => void;
}

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  mobile: z.string().min(10, { message: "Mobile number must be at least 10 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  message: z.string(),
  images: z.array(z.object({
    file: z.any(),
    preview: z.string()
  })).max(5, { message: "You can only upload up to 5 images." }),
});

type FormData = z.infer<typeof formSchema>;

export default function RequestForm({ selectedService, handleBackClick }: RequestFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('serviceId', selectedService.serviceId.toString());
    formData.append('customerName', data.name);
    formData.append('mobileNumber', data.mobile);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('note', data.message);
    formData.append('datetime', new Date().toISOString());

    // Append images
    data.images.forEach((image, index) => {
      formData.append(`quoteimages`, image.file);
    });

    try {
      const response = await fetch('/api/addquote', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center w-full items-center my-20">
        <div className="flex flex-col bg-[#003047] text-white rounded-3xl w-full ">
          {isSubmitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Thank you for your request!</h2>
              <p className="mb-6">Your request has been submitted successfully.</p>
              <button
                onClick={handleBackClick}
                className="bg-[#219EBC] hover:bg-[#0077B6] text-white py-2 px-4 rounded transition duration-300"
              >
                Back
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl text-[#219EBC] font-bold mb-6">
                Request a Quote for {selectedService.serviceTitle1} {selectedService.serviceTitle2}
              </h2>

              {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputField label="Name" {...register('name')} error={errors.name?.message} />
                <InputField label="Mobile" {...register('mobile')} error={errors.mobile?.message} />
                <InputField label="Email" type="email" {...register('email')} error={errors.email?.message} />
                <InputField label="Address" {...register('address')} error={errors.address?.message} />
                <TextAreaField label="Message" {...register('message')} error={errors.message?.message} />

                <div>
                  <Controller
                    name="images"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <CustomImageUploader
                        onImagesChange={(images) => field.onChange(images)}
                      />
                    )}
                  />
                  {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>}
                </div>

                <div className="flex flex-col w-full justify-between items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#219EBC] hover:bg-[#0077B6] text-white py-2 px-6 rounded transition duration-300 w-full mb-6 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded transition duration-300 w-full"
                  >
                    Back
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const InputField = React.forwardRef<HTMLInputElement, any>(
  ({ label, error, ...props }, ref) => (
    <div className="flex flex-col">
      <label htmlFor={props.name} className="text-sm text-gray-400 mb-1">{label}</label>
      <input
        ref={ref}
        {...props}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="p-2 rounded bg-[#219EBC] bg-opacity-30 text-white border border-[#219EBC] outline-none focus:ring-2 focus:ring-[#0077B6] transition duration-300"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

const TextAreaField = React.forwardRef<HTMLTextAreaElement, any>(
  ({ label, error, ...props }, ref) => (
    <div className="flex flex-col">
      <label htmlFor={props.name} className="text-sm text-gray-400 mb-1">{label}</label>
      <textarea
        ref={ref}
        {...props}
        placeholder={`Enter your ${label.toLowerCase()}`}
        rows={4}
        className="p-2 rounded bg-[#219EBC] bg-opacity-30 text-white border border-[#219EBC] outline-none focus:ring-2 focus:ring-[#0077B6] transition duration-300"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

interface CustomImageUploaderProps {
  onImagesChange: (images: { file: File; preview: string }[]) => void;
}

const CustomImageUploader: React.FC<CustomImageUploaderProps> = ({ onImagesChange }) => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prevImages => {
      const updatedImages = [...prevImages, ...newImages].slice(0, 5);
      onImagesChange(updatedImages);
      return updatedImages;
    });
  }, [onImagesChange]);

  const removeImage = useCallback((index: number) => {
    setImages(prevImages => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      onImagesChange(updatedImages);
      return updatedImages;
    });
  }, [onImagesChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full ">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#219EBC] border-dashed rounded-lg cursor-pointer bg-[#219EBC] bg-opacity-30 hover:bg-opacity-50 transition duration-300">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 md:text-sm text-xs text-white text-center"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-300 text-center">PNG, JPG or GIF (MAX. 5 images)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} multiple accept="image/*" />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image.preview} alt={`preview ${index}`} className="w-full h-24 object-cover rounded" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};