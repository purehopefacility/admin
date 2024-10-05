"use client";
import { useState, useEffect } from "react";
import RequestForm from "./requestform/page";// Import the RequestForm component

// Define the type for the service category
interface ServiceCategory {
  categoryId: number;
  categoryTitle: string;
}

// Define the type for the service
interface Service {
  serviceId: number;
  serviceTitle1: string;
  serviceTitle2: string;
  serviceOrder: number;
}

export default function RequestQuote() {
  // State for storing service categories
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null); // Hold selected service

  // Function to fetch service categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/requestquote/selectcategory");
      const data = await response.json();
      setCategories(data.data); // Assuming the response format has `data`
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to fetch services based on selected category
  const fetchServices = async (categoryId: number) => {
    try {
      const response = await fetch(`/api/requestquote/selectservices?categoryId=${categoryId}`);
      const data = await response.json();
      console.log(data);
      setServices(data.data); // Assuming the response format has `data`
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Handle category button click
  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    fetchServices(categoryId); // Fetch services for the selected category
  };

  // Handle service button click
  const handleServiceClick = (service: Service) => {
    setSelectedService(service); // Set the selected service
  };

  // Handle back button click in RequestForm
  const handleBackClick = () => {
    setSelectedService(null); // Reset the selected service to go back to services list
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="flex w-3/4 justify-center items-center my-20">
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
            {/* Conditionally render category selection, services, or the request form */}
            {selectedService === null ? (
              selectedCategory === null ? (
                <>
                  <h3 className="text-sm mb-4 text-gray-400">
                    Select Our Valuable Category
                  </h3>
                  <div className="space-y-3">
                    {/* Map over categories fetched from API */}
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <button
                          key={category.categoryId}
                          onClick={() => handleCategoryClick(category.categoryId)}
                          className="w-full py-2 px-4 bg-[#219EBC] bg-opacity-30 hover:bg-[#219EBC] sm:text-base text-sm rounded sm:text-left text-center border border-[#219EBC]"
                        >
                          {category.categoryTitle}
                        </button>
                      ))
                    ) : (
                      <p>Loading categories...</p>
                    )}
                  </div>
                  <p className="text-sm mt-4 text-gray-400">Choose one option</p>
                </>
              ) : (
                <>
                  <h3 className="text-sm mb-4 text-gray-400">
                    Services in Selected Category
                  </h3>
                  <div className="space-y-3">
                    {/* Map over services fetched from API */}
                    {services.length > 0 ? (
                      services.map((service) => (
                        <button
                          key={service.serviceId}
                          onClick={() => handleServiceClick(service)} // Handle service click
                          className="w-full py-2 px-4 bg-[#219EBC] bg-opacity-30 hover:bg-[#219EBC] sm:text-base text-sm rounded sm:text-left text-center border border-[#219EBC]"
                        >
                          <h4>{service.serviceTitle1}</h4>
                          <p>{service.serviceTitle2}</p>
                        </button>
                      ))
                    ) : (
                      <p>No services found for this category.</p>
                    )}
                  </div>
                </>
              )
            ) : (
              <RequestForm selectedService={selectedService} handleBackClick={handleBackClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
