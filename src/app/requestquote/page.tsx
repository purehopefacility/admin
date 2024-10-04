"use client";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

import { useState, FormEvent } from "react";

// Define the type for the form data
interface FormData {
  name: string;
  mobile: string;
  email: string;
  address: string;
  message: string;
}

export default function RequestQuote() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    address: "",
    message: "",
  });

  // Form submit function
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({
      name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
        .value,
      mobile: (e.currentTarget.elements.namedItem("mobile") as HTMLInputElement)
        .value,
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
        .value,
      address: (
        e.currentTarget.elements.namedItem("address") as HTMLInputElement
      ).value,
      message: (
        e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement
      ).value,
    });

    console.log("Form Data on Submit:", formData);

    setSelectedService(null);
  };

  // Service selection function
  const handleButtonClick = (service: string) => {
    setSelectedService(service);
  };

  // Back button function
  const handleBackClick = () => {
    setSelectedService(null); // Reset the selected service to go back
  };

  const formContent = (
    <>
      <NavBar />
      <div className="mb-4">
        <label className="block text-sm text-white mb-1" htmlFor="name">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name" // Add the name attribute for reference in handleSubmit
          className="w-full py-2 px-3 bg-[#219ebc4d] placeholder:text-white rounded text-white sm:text-base text-sm focus:outline-none"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-white mb-1" htmlFor="mobile">
          Mobile Number
        </label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          className="w-full py-2 px-3 bg-[#219ebc4d] placeholder:text-white rounded text-white sm:text-base text-sm focus:outline-none"
          placeholder="Enter your mobile number"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-white mb-1" htmlFor="email">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full py-2 px-3 bg-[#219ebc4d] placeholder:text-white rounded text-white sm:text-base text-sm focus:outline-none"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-white mb-1" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="w-full py-2 px-3 bg-[#219ebc4d] placeholder:text-white rounded text-white sm:text-base text-sm focus:outline-none"
          placeholder="Enter your address"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-white mb-1" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full py-2 px-3 bg-[#219ebc4d] placeholder:text-white rounded text-white sm:text-base text-sm focus:outlwhite"
          placeholder="Enter your message"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-[#219EBC] hover:bg-opacity-80 rounded font-semibold mb-4"
      >
        Submit
      </button>
      <div className="flex items-center justify-center">
        <Footer />
      </div>
    </>
  );

  if (selectedService === "Other Service") {
    return (
      <div className="flex justify-center items-center">
        <div className="flex w-3/4 justify-center items-center  my-20">
          <div className="flex flex-col bg-[#003047] text-white rounded-3xl p-10 w-full">
            <h2 className="text-2xl text-[#219EBC] font-bold mb-4">
              Request a Quote
            </h2>
            <p className="text-sm mb-8">
              You've selected{" "}
              <span className="font-semibold">{selectedService}</span>. Please
              fill in the form below.
            </p>
            <form onSubmit={handleSubmit}>{formContent}</form>
            <button
              onClick={handleBackClick}
              className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded font-semibold"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (selectedService === "Pure Hope Cleaning Services") {
    return (
      <div className="flex justify-center items-center">
        <div className="flex w-3/4 justify-center items-center  my-20">
          <div className="flex flex-col bg-[#003047] text-white rounded-3xl p-10 w-full">
            <h2 className="text-2xl text-[#219EBC] font-bold mb-4">
              Request a Quote
            </h2>
            <p className="text-sm mb-8">
              You've selected{" "}
              <span className="font-semibold">{selectedService}</span>. Please
              fill in the form below.
            </p>
            <form onSubmit={handleSubmit}>{formContent}</form>
            <button
              onClick={handleBackClick}
              className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded font-semibold"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (selectedService === "Pure Hope Floor Care Services") {
    return (
      <div className="flex justify-center items-center">
        <div className="flex w-3/4 justify-center items-center  my-20">
          <div className="flex flex-col bg-[#003047] text-white rounded-3xl p-10 w-full">
            <h2 className="text-2xl text-[#219EBC] font-bold mb-4">
              Request a Quote
            </h2>
            <p className="text-sm mb-8">
              You've selected{" "}
              <span className="font-semibold">{selectedService}</span>. Please
              fill in the form below.
            </p>
            <form onSubmit={handleSubmit}>{formContent}</form>
            <button
              onClick={handleBackClick}
              className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded font-semibold"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex w-3/4 justify-center items-center  my-20">
        <div className="flex flex-col md:flex-row bg-[#003047] text-white rounded-3xl overflow-hidden">
          {/* Image and text section */}
          <div className="md:w-3/4 relative">
            <img
              src="images/home/services.png"
              alt="City skyline"
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#219EBC] bg-opacity-40 p-10 flex flex-col justify-center">
              <h2 className="text-2xl text-[#003047] font-bold mb-2">
                Request Quote
              </h2>
              <p className="text-sm">
                Send us a request to deliver a service quote to your email
                address.
              </p>
            </div>
          </div>

          {/* Form section */}
          <div className="w-full p-10 bg-[#003047]">
            <h3 className="text-sm mb-4 text-gray-400">
              Select Our Valuable Category
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleButtonClick("Pure Hope Cleaning Services")}
                className="w-full py-2 px-4 bg-[#219EBC] bg-opacity-30 hover:bg-[#219EBC] sm:text-base text-sm rounded sm:text-left text-center border border-[#219EBC]"
              >
                Pure Hope Cleaning Services
              </button>
              <button
                onClick={() =>
                  handleButtonClick("Pure Hope Floor Care Services")
                }
                className="w-full py-2 px-4 bg-[#219EBC] bg-opacity-30 hover:bg-[#219EBC] sm:text-base text-center text-sm rounded sm:text-left border border-[#219EBC]"
              >
                Pure Hope Floor Care Services
              </button>
              <button
                onClick={() => handleButtonClick("Other Service")}
                className="w-full py-2 px-4 bg-[#219EBC] bg-opacity-30 hover:bg-[#219EBC] sm:text-base text-sm rounded sm:text-left text-center border border-[#219EBC]"
              >
                Other Service
              </button>
            </div>
            <p className="text-sm mt-4 text-gray-400">Choose one option</p>
          </div>
        </div>
      </div>
    </div>
  );
}
