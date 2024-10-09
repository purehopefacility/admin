// import React, { FormEvent, useState, ChangeEvent } from "react";

// interface FormData {
//   name: string;
//   mobile: string;
//   email: string;
//   address: string;
//   message: string;
// }

// interface RequestFormProps {
//   selectedService: {
//     serviceId: number;
//     serviceTitle1: string;
//     serviceTitle2: string;
//   };
//   handleBackClick: () => void;
// }

// interface InputFieldProps {
//   label: string;
//   name: string;
//   type?: string;
//   value: string;
//   onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   required?: boolean;
// }

// interface TextAreaFieldProps {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
//   required?: boolean;
// }

// export default function RequestForm({ selectedService, handleBackClick }: RequestFormProps) {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     mobile: "",
//     email: "",
//     address: "",
//     message: "",
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
    
//     const formDataToSend = new FormData();
//     formDataToSend.append('customerName', formData.name);
//     formDataToSend.append('mobileNumber', formData.mobile);
//     formDataToSend.append('email', formData.email);
//     formDataToSend.append('address', formData.address);
//     formDataToSend.append('note', formData.message);
//     formDataToSend.append('serviceId', selectedService.serviceId.toString());
//     formDataToSend.append('datetime', new Date().toISOString());

//     try {
//       const response = await fetch('/api/addquote', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to submit request quote');
//       }

//       const data = await response.json();
//       console.log('Response from API:', data);
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setError(error instanceof Error ? error.message : 'An unknown error occurred');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <div className="flex justify-center w-full items-center my-20">
//         <div className="flex flex-col bg-[#003047] text-white rounded-3xl w-full">
//           {isSubmitted ? (
//             <div className="text-center">
//               <h2 className="text-2xl font-bold mb-4">Thank you for your request!</h2>
//               <p className="mb-6">Your request has been submitted successfully.</p>
//               <button
//                 onClick={handleBackClick}
//                 className="bg-[#219EBC] hover:bg-[#0077B6] text-white py-2 px-4 rounded transition duration-300"
//               >
//                 Back
//               </button>
//             </div>
//           ) : (
//             <>
//               <h2 className="text-2xl text-[#219EBC] font-bold mb-6">
//                 Request a Quote for {selectedService.serviceTitle1}
//               </h2>

//               {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//                   <strong className="font-bold">Error: </strong>
//                   <span className="block sm:inline">{error}</span>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <InputField label="Name" name="name" value={formData.name} onChange={handleChange} required />
//                 <InputField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
//                 <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
//                 <InputField label="Address" name="address" value={formData.address} onChange={handleChange} required />
//                 <TextAreaField label="Message" name="message" value={formData.message} onChange={handleChange} required />

//                 <div className="flex flex-col w-full justify-between items-center">
//                   <button
//                     type="submit"
//                     className="bg-[#219EBC] hover:bg-[#0077B6] text-white py-2 px-6 rounded transition duration-300 w-full mb-6"
//                   >
//                     Submit
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleBackClick}
//                     className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded transition duration-300 w-full"
//                   >
//                     Back
//                   </button>
//                 </div>
//               </form>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const InputField: React.FC<InputFieldProps> = ({ label, name, type = "text", value, onChange, required }) => (
//   <div className="flex flex-col">
//     <label htmlFor={name} className="text-sm text-gray-400 mb-1">{label}</label>
//     <input
//       type={type}
//       name={name}
//       id={name}
//       value={value}
//       onChange={onChange}
//       placeholder={`Enter your ${label.toLowerCase()}`}
//       className="p-2 rounded bg-[#219EBC] bg-opacity-30 text-white border border-[#219EBC] outline-none focus:ring-2 focus:ring-[#0077B6] transition duration-300"
//       required={required}
//     />
//   </div>
// );

// const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, name, value, onChange, required }) => (
//   <div className="flex flex-col">
//     <label htmlFor={name} className="text-sm text-gray-400 mb-1">{label}</label>
//     <textarea
//       name={name}
//       id={name}
//       value={value}
//       onChange={onChange}
//       placeholder={`Enter your ${label.toLowerCase()}`}
//       rows={4}
//       className="p-2 rounded bg-[#219EBC] bg-opacity-30 text-white border border-[#219EBC] outline-none focus:ring-2 focus:ring-[#0077B6] transition duration-300"
//       required={required}
//     />
//   </div>
// );

import React, { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ImageUploader from '@/components/util/fileuploader';

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
                      <ImageUploader
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
