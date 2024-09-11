'use client'

import { SwiperSlide } from "swiper/react";
import ServiceCard from "./servicecard";
import ServiceForm from "./serviceform";
import Swiper from "swiper";
import SliderCard from "./cardslide";
import { useEffect, useState } from "react";

interface Service {
  serviceId: number;
  serviceOrder: number;
  ServiceCategory: string;
  ServiceCategoryOrder: number;
  ServiceCategoryId: number;
  serviceTitle_1: string;
  serviceTitle_2: string;
  serviceCoverImg:string;
  serviceDesc: string;
  status: string;
  serviceImages: string;
}


export default function ServiceId({ params }: { params: { service: number } }) {
  
  const [services, setServices] = useState<Service | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/services/one/${params.service}`);
      const data = await response.json();
      console.log(data)
      setServices(data);

    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col content-end">
      <div
        className="flex w-full items-end justify-center h-64  relative bg-cover bg-center bg-gray-300"
        style={{
          backgroundImage: `url(${services?.serviceCoverImg})`,
        }}
      >
        <div className="absolute w-3/4 h-1/2 bottom-[-20%]  p-2 rounded-t-lg bg-white flex justify-center items-center">
          <h1 className="text-2xl text-center">
            <span className="font-medium ">Services {" > "}</span>
            <span className=" font-medium text-[#003047]">{services?.serviceTitle_1} </span>
            <span className="text-[#219EBC]">{services?.serviceTitle_2}</span>
          </h1>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6 justify-center p-20 px-[13%]">
        <div className="flex lg:col-span-2 md:col-span-2 sm:col-span-1">
          <p>
            {services?.serviceDesc ?? "No Description added."}
          </p>
        </div>
        <div className="flex w-full">
          <ServiceForm sid={params.service} formName={`${services?.serviceTitle_1 ?? "..."} ${services?.serviceTitle_2 ?? "..."}`} />
        </div>
      </div>
      <div className="flex flex-col p-10 ">
        <div className="flex flex-row pb-10 justify-center">
          <h1 className="text-2xl text-[#219EBC] mx-[10%] lg:text-start text-center">
            <span className="text-[#003047] font-bold lg:text-start text-center">You may</span> Like
          </h1>
        </div>{
          services?.ServiceCategoryId && (
            
          <SliderCard categoryId={services?.ServiceCategoryId ?? 0} />
          )
        }
      </div>
    </div>
  );
}

