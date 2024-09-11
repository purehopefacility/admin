'use client'

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ImageUploader from '@/components/util/fileuploader';
import { useRouter } from 'next/navigation';
import SuccessDialog from '@/components/util/successDialog';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNum: z.string().min(10, { message: "mobile number must be 10 numbers" }),
  address: z.string().min(5, { message: "Add address" }),
  note: z.string(),
  images: z.array(z.object({
    file: z.any(),
    preview: z.string()
  })).max(5, { message: "You can only upload up to 5 images." }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface ServiceFormProp {
  sid: number
  formName: string
}

export default function ServiceForm({ sid, formName }: ServiceFormProp) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('serviceId', sid.toString());
    formData.append('customerName', data.name);
    formData.append('mobileNumber', data.phoneNum);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('note', data.note);
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
      setIsSuccessDialogOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  
  };

  const handleDialogClose = () => {
    setIsSuccessDialogOpen(false);
    // Redirect to another page after closing the dialog
    router.push('/ourservices');
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <div className='mb-4 bg-[#219EBC] rounded-md flex flex-col' >
        <h3 className='text-[#003047] font-medium p-2 text-center' >{formName}</h3>
      </div>
      <div className="mb-4 flex flex-col">
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Name"
          className="w-full placeholder-[#003047] placeholder:text-sm flex px-3 py-2 border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="mt-1 flex text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className='grid  w-full'>
        <div className="flex flex-col mb-4">
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder='email'
            className="w-full placeholder-[#003047] placeholder:text-sm flex px-3 py-2 border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

          />
          {errors.email && <p className="mt-1 text-sm text-red-600 flex">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col mb-4">
          <input
            {...register('phoneNum')}
            type="text"
            id="phonenum"
            placeholder='Mobile Number'
            className="w-full placeholder-[#003047] flex px-3 placeholder:text-sm py-2 border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNum && <p className="mt-1 flex text-sm text-red-600">{errors.phoneNum.message}</p>}
        </div>
      </div>
      <div className="mb-4 flex flex-col">
        <input
          {...register('address')}
          type="text"
          id="address"
          placeholder='Address'
          className="w-full placeholder-[#003047] flex px-3 placeholder:text-sm py-2 border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && <p className="mt-1 flex text-sm text-red-600">{errors.address.message}</p>}
      </div>

      <div className="flex mb-4 flex-col">
        <textarea
          {...register('note')}
          id="note"
          placeholder='Note'
          className="w-full placeholder-[#003047] flex px-3 placeholder:text-sm py-2 border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && <p className="mt-1 flex text-sm text-red-600">{errors.address.message}</p>}
      </div>

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
      <div className="mb-4 flex flex-col">
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register('termsAccepted')}
            className="form-checkbox h-5 w-5 border text-[#219EBC] "
          />
          <span className="ml-2 text-sm text-[#219EBC]">
            I accept the terms and conditions
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="mt-1 text-sm text-red-600 flex">{errors.termsAccepted.message}</p>
        )}
      </div>
      {/* <div className='flex flex-row-reverse ' >
        <button
          type="submit"
          className="py-2 px-20 hover:bg-[#003047] bg-[#219EBC] text-white font-semibold rounded-md mt-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div> */}
      <div className='flex flex-row-reverse'>
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-20 hover:bg-[#0e2c33] bg-[#003047] text-white font-semibold rounded-md mt-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {submitError && (
        <p className="mt-4 text-red-600">{submitError}</p>
      )}
    </form>

    <SuccessDialog
        isOpen={isSuccessDialogOpen}
        onClose={handleDialogClose}
        title='Form Submitted Successfully'
        des='Your form has been successfully submitted. Thank you for your input!'
        btntitle='Got it, Thanks!'
      />
    </>
  );
};

