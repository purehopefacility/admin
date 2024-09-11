'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, Transition } from '@headlessui/react';
import { DialogOverlay } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import SuccessDialog from '@/components/util/successDialog';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNum: z
  .string()
  .min(5, { message: "Phone number must be at least 10 digits" })
  .regex(/^\d+$/, { message: "Phone number must only contain digits" }),
  address: z.string().min(5, { message: "Add address" }),
  note: z.string().min(5,{message:"Add Note"}),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm : React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('customerName', data.name);
    formData.append('mobileNumber', data.phoneNum);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('note', data.note);
    formData.append('datetime', new Date().toISOString());

    try {
      const response = await fetch('/api/addinquire', {
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
    route.push('/');
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <div className="mb-4 flex flex-col">
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Name"
          className="w-full placeholder-[#003047] flex px-3 py-2 border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="mt-1 flex text-sm text-red-600">{errors.name.message}</p>}
      </div>
      
      <div className='grid md:grid-cols-2 grid-cols-1 md:gap-4 w-full'>
        <div className="flex flex-col mb-4">
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder='Email'
            className="w-full px-3 placeholder-[#003047] flex py-2 border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
          {errors.email && <p className="mt-1 text-sm text-red-600 flex">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col mb-4">
          <input
            {...register('phoneNum')}
            type="text"
            id="phonenum"
            placeholder='Mobile Number'
            className="w-full px-3 placeholder-[#003047] py-2 flex border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full px-3 placeholder-[#003047] py-2 flex border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && <p className="mt-1 flex text-sm text-red-600">{errors.address.message}</p>}
      </div>

      <div className="flex mb-4 flex-col">
        <textarea
          {...register('note')}
          id="note"
          placeholder='Note'
          className="w-full px-3 placeholder-[#003047] py-2 flex border border-[#219EBC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.note && <p className="mt-1 flex text-sm text-red-600">{errors.note.message}</p>}
      </div>

      {/* Submit Button Container */}
      {/* <div className="flex justify-end">
        <button
          type="submit"
          className="py-2 px-4 hover:bg-[#219EBC] bg-[#003047] text-white font-semibold rounded-md mt-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div> */}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-2 px-4 hover:bg-[#0e2c33] bg-[#003047] text-white font-semibold rounded-md mt-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
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

export default ContactForm;
