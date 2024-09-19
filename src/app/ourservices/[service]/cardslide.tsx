'use client';

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Poppins, Ubuntu } from "next/font/google";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import ServiceCard from "./servicecard";


const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

interface ServiceData {
  serviceId: number;
  serviceTitle_1: string;
  serviceTitle_2: string;
  serviceImg: string;
}

const SliderCard = ({ categoryId }: { categoryId: number }) => {
  const [servicesData, setServicesData] = useState<ServiceData[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/services/recommend/${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServicesData(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [categoryId]);

  return (
    <div className=" mx-[10%] pb-12">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 2,
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className=""
        autoplay={true}
      >
        {servicesData.map((service) => (
          <SwiperSlide key={service.serviceId}>
            <div className="h-[450px]">
              <ServiceCard
                title={`${service.serviceTitle_1} ${service.serviceTitle_2}`}
                alt={`${service.serviceTitle_1} ${service.serviceTitle_2}`}
                imgPath={service.serviceImg}
                href={service.serviceId}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderCard;

// 'use client';

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/free-mode";
// import { Poppins, Ubuntu } from "next/font/google";
// import { FreeMode, Pagination } from "swiper/modules";

// import ServiceCard from "../servicecard";

// const ubuntu = Ubuntu({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--font-ubuntu",
// });
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   variable: "--font-poppins",
// });

// const SliderCard = () => {
//   // JSON data representing your services
//   const servicesData = [
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Commercial Cleaning",
//       alt: "Commercial Cleaning Image",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Residential Cleaning",
//       alt: "Residential Cleaning Image",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Industrial Cleaning",
//       alt: "Industrial Cleaning Image",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Office Cleaning",
//       alt: "Office Cleaning Image",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Window Cleaning",
//       alt: "Window Cleaning Image",
//     },
//     {
//         imgSrc: "/images/home/cleaning.jpg",
//         title: "Industrial Cleaning",
//         alt: "Industrial Cleaning Image",
//       },
//       {
//         imgSrc: "/images/home/cleaning.jpg",
//         title: "Office Cleaning",
//         alt: "Office Cleaning Image",
//       },
//       {
//         imgSrc: "/images/home/cleaning.jpg",
//         title: "Window Cleaning",
//         alt: "Window Cleaning Image",
//       },
//   ];

//   return (
//     <div className="max-w-[90%] md:max-w-[80%] lg:max-w-[100%] pb-12 mx-auto">
//       {/* Swiper container */}
//       <Swiper
//         breakpoints={{
//           340: {
//             slidesPerView: 1,
//             spaceBetween: 15,
//           },
//           700: {
//             slidesPerView: 2,
//           },
//           1100: {
//             slidesPerView: 4,
//             spaceBetween: 30,
//           },
//         }}
//         freeMode={true}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[FreeMode, Pagination]}
//         className=""
//       >
        
//         {servicesData.map((service, index) => (
//           <SwiperSlide key={index}>
//             <div className="h-[350px]">
//             <ServiceCard
//               title={service.title}
//               alt={service.alt}
//               imgPath={service.imgSrc}
//             />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default SliderCard;
