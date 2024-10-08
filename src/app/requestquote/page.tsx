"use client";
import { useState, useEffect } from "react";
import RequestForm from "./requestform";

interface ServiceCategory {
  categoryId: number;
  categoryTitle: string;
  categoryOrder: number;
  categoryDesc: string;
}

interface Service {
  serviceId: number;
  serviceTitle1: string;
  serviceTitle2: string;
  serviceOrder: number;
}

export default function RequestQuote() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [services, setServices] = useState<Service[] | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/requestquote/selectcategory");
      const data = await response.json();
      const sortedCategories = data.data.sort((a: ServiceCategory, b: ServiceCategory) => a.categoryOrder - b.categoryOrder);
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchServices = async (categoryId: number) => {
    setIsLoading(true);
    setServices(null); // Reset services before fetching new ones
    try {
      const response = await fetch(`/api/requestquote/selectservices?categoryId=${categoryId}`);
      const data = await response.json();
      setServices(data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]); // Set to empty array in case of error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
    fetchServices(categoryId);
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleBackClick = () => {
    setSelectedService(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="flex w-3/4 justify-center items-center my-20">
        <div className="flex flex-col md:flex-row bg-[#003047] text-white rounded-3xl overflow-hidden">
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

          <div className="w-full p-10 bg-[#003047]">
            {selectedService === null ? (
              selectedCategory === null ? (
                <>
                  <h3 className="text-sm mb-4 text-gray-400">
                    Select Our Valuable Category
                  </h3>
                  <div className="space-y-3">
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
                    {isLoading ? (
                      <p>Loading services...</p>
                    ) : services === null ? (
                      <p>Error loading services. Please try again.</p>
                    ) : services.length > 0 ? (
                      services.map((service) => (
                        <button
                          key={service.serviceId}
                          onClick={() => handleServiceClick(service)}
                          className="w-full py-2 px-4 bg-[#219EBC] bg-opacity-30 hover:bg-[#219EBC] sm:text-base text-sm rounded sm:text-left text-center border border-[#219EBC]"
                        >
                          <h4>{service.serviceTitle1}</h4>
                          <p>{service.serviceTitle2}</p>
                        </button>
                      ))
                    ) : (
                      <p>No services available for this category.</p>
                    )}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="bg-[#219EBC] hover:bg-[#0077B6] text-white py-2 px-4 rounded transition duration-300 w-full"
                    >
                      Back
                    </button>
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
