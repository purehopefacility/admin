'use client';
import { useState, useEffect } from 'react';
import ServiceCard from './servicecard';

export interface Service {
  serviceId: number;
  serviceOrder: number;
  categoryName: string;
  serviceTitle1: string;
  serviceTitle2: string;
  serviceImg: string | null;
  serviceDesc: string | null;
}

export default function OurService() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/services/frontall');
      const data = await response.json();
      console.log(data)

      const sortedServices = sortServices(data.data || []);
      setServices(sortedServices);

      const uniqueCategories = getUniqueCategories(data.data || []);
      console.log(uniqueCategories)
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortServices = (services: Service[]): Service[] => {
    return services.sort((a, b) => {
      // Prioritize services with order 1 or 0
      if (a.serviceOrder <= 1 && b.serviceOrder > 1) return -1;
      if (b.serviceOrder <= 1 && a.serviceOrder > 1) return 1;
      
      // For other services, sort in ascending order
      return a.serviceOrder - b.serviceOrder;
    });
  };

  const getUniqueCategories = (services: Service[]): string[] => {
    const categoriesSet = new Set<string>();
    services.forEach(service => categoriesSet.add(service.categoryName));
    return ['All', ...Array.from(categoriesSet)];
  };

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(service => service.categoryName === selectedCategory);

  return (
    <div className="flex flex-col content-end">

      <div className="flex w-full items-end justify-center h-64 relative bg-cover bg-center bg-blue-700"
        style={{ backgroundImage: "url('/images/ourservices/ourservicesheader.png')" }}>
        <div className="absolute md:w-3/4 w-[84%] h-1/2 bottom-[-20%] p-2 rounded-t-lg bg-white flex justify-center items-center">
          <h1 className="text-[#219EBC] text-2xl"><span className="font-bold text-[#003047]">Our</span> Services</h1>

        </div>
      </div>
      <div className="flex flex-col justify-center p-10 ">
        <div className="flex flex-row gap-2 flex-wrap justify-center pt-20 pb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={`py-3 px-4 rounded-lg text-white transition-colors ${selectedCategory === category ? 'bg-[#219EBC]' : 'bg-[#003047] hover:bg-[#219EBC]'
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-1  gap-y-10 gap-x-4 md:grid-cols-2 lg:grid-cols-4 py-10 mx-[12%] ">
          {isLoading ? (
            <p className='text-[#003047]' >Loading services...</p>
          ) : filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.serviceId}
                title={`${service.serviceTitle1} ${service.serviceTitle2}`}
                alt={`${service.serviceTitle1} ${service.serviceTitle2}`}
                imgPath={service.serviceImg || ""}
                href={service.serviceId}
              />
            ))
          ) : (
            <p className='text-[#003047]'>No services found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// export default function OurService() {
//
//   return (
//     <div className="flex flex-col content-end">
//       <div className="flex w-full items-end justify-center h-64  relative bg-cover bg-center bg-blue-700 " style={{ backgroundImage: "url('/images/ourservices/ourservicesheader.png')", }}>
//         <div className="absolute w-3/4 h-1/2 bottom-[-20%] p-2 rounded-t-lg bg-white flex justify-center items-center"  >
//           <h1 className=" text-[#219EBC] text-2xl"><span className="font-bold text-[#003047]">Our</span> Services</h1>
//         </div>
//       </div>
//       <div className="flex flex-col justify-center p-10">
//         <div className="flex flex-row gap-2 flex-wrap justify-center pt-20 pb-10"  >
//           <button className="bg-[#003047] py-3 px-4 rounded-lg text-white hover:bg-[#219EBC]">All</button>
//           <button className="bg-[#003047] py-3 px-4 rounded-lg text-white hover:bg-[#219EBC]">Pure Hope Cleaning</button>
//           <button className="bg-[#003047] py-3 px-4 rounded-lg text-white hover:bg-[#219EBC]">Pure Hope Floor Care</button>
//           <button className="bg-[#003047] py-3 px-4 rounded-lg text-white hover:bg-[#219EBC]">Other</button>
//         </div>
//         <div className="grid sm:grid-cols-1 container gap-y-10 gap-x-4 md:grid-cols-2 lg:grid-cols-4 py-10 px-10">
//           <ServiceCard title="Cleaning Service" alt="Cleaning" imgPath="/images/ourservices/ourservicesheader.png" href="topv" />
//           <ServiceCard title="Cleaning Service" alt="Cleaning" imgPath="/images/ourservices/ourservicesheader.png" href="topv" />
//           <ServiceCard title="Cleaning Service" alt="Cleaning" imgPath="/images/ourservices/ourservicesheader.png" href="topv" />
//           <ServiceCard title="Cleaning Service" alt="Cleaning" imgPath="/images/ourservices/ourservicesheader.png" href="topv" />
//           <ServiceCard title="Cleaning Service" alt="Cleaning" imgPath="/images/ourservices/ourservicesheader.png" href="topv" />
//           <ServiceCard title="Cleaning Service" alt="Cleaning" imgPath="/images/ourservices/ourservicesheader.png" href="topv" />
//           <ServiceCard title="Cleaning Service" alt="Cleaning" imgPath="/images/ourservices/ourservicesheader.png" href="topv" />
//           <ServiceCard title="Cleaning Service" alt="Cleaning" imgPath="/images/ourservices/ourservicesheader.png" href="topv" />
//           <ServiceCard title="Cleaning Service" alt="Cleaning" imgPath="/images/ourservices/ourservicesheader.png" href="topv" />
//         </div>
//       </div>
//
//     </div>
//   )
// }
