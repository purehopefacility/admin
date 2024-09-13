'use client';

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Poppins, Ubuntu } from "next/font/google";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { ArrowUpRight } from "lucide-react";
import '@/components/css/custom-swiper-bullets.css';
import Link from "next/link";

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

interface Service {
  serviceId: number;
  serviceOrder: number;
  categoryName: string;
  serviceTitle1: string;
  serviceTitle2: string;
  serviceImg: string | null;
  serviceDesc: string | null;
}

const Slider = () => {
  const [servicesData, setServicesData] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services/all');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServicesData(data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const title = "text-[rgba(0,48,71,1)] font-medium text-[18px] mt-2 p-2 flex justify-center items-center";

  // Slice the last 8 services
  const latestServices = servicesData.slice(-8);

  return (
    <div className="w-full bg-[url('/images/home/services.png')] p-10 bg-cover bg-no-repeat ">
      <div className="md:mx-[10%] pb-12 ">
        <div className={`${poppins.variable} bg-[rgba(0,48,71,1)] text-white w-32 h-8 rounded-md flex justify-center items-center font-light mx-[2%]`}>
          Our Services
        </div>
        <div className={`${ubuntu.variable} w-72 text-white text-[30px] font-sans font-normal mt-5 mx-[2%]`} style={{ textShadow: '6px 4px 6px rgba(0, 0, 0, 0.5)' }}>
          Elevate Your Space With Our Service
        </div>
        <Swiper
          loop={latestServices.length > 3}
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 15
            },
            700: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1100: {
              slidesPerView: 3,
              spaceBetween: 30
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
          {latestServices.map((service, index) => (
            <>
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center lg:h-[500px] h-[500px]">
                <div className="w-[330px] h-[340px] bg-white rounded-3xl">
                  <div className="h-[235px] rounded-3xl overflow-hidden">
                    <img
                      src={service.serviceImg || "/images/home/cleaning.jpg"}
                      alt={`${service.serviceTitle1} ${service.serviceTitle2}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex justify-center gap-2 items-center mx-4">
                    <h1 className={title}>{`${service.serviceTitle1} ${service.serviceTitle2}`}</h1>
                    <Link href={`/ourservices/${service.serviceId}`}>
                    <button className="bg-[rgba(0,48,71,1)] rounded-full text-white font-bold w-10 h-10 flex items-center justify-center shadow-lg mt-5 p-2">
                      <ArrowUpRight />
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;


// 'use client';

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/free-mode";
// import "swiper/css/autoplay"
// import { Poppins, Ubuntu } from "next/font/google";
// import { Autoplay, FreeMode, Pagination} from "swiper/modules";
// import { ArrowUpRight } from "lucide-react";
// import '@/components/css/custom-swiper-bullets.css'



// const ubuntu = Ubuntu({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"], // Add the weights you need
//   variable: "--font-ubuntu", // You can define a custom CSS variable for Ubuntu
// });
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   variable: "--font-poppins",
// });

// const Slider = () => {
//   // JSON data representing your services
//   const servicesData = [
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Commercial Cleaning",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Commercial Cleaning",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Commercial Cleaning",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Commercial Cleaning",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Commercial Cleaning",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Commercial Cleaning",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Commercial Cleaning",
//     },
//     {
//       imgSrc: "/images/home/cleaning.jpg",
//       title: "Commercial Cleaning",
//     }
//   ];

//   const title = "text-[rgba(0,48,71,1)]  font-medium text-[18px] mt-5  p-2 flex justify-center items-center text-nowrap";

//   return (
//     <div className="w-full bg-[url('/images/home/services.png')] p-10 bg-cover  bg-no-repeat  ">
      

//       <div className="max-w-[90%] md:max-w-[80%]  lg:max-w-[63%]  pb-12 mx-auto "> 
//         {/* Added relative for positioning pagination */}
        
//         <div className={'${poppins.variable} bg-[rgba(0,48,71,1)] text-white w-32 h-8  rounded-md flex justify-center items-center font-light '}>
//           Our Services
//         </div>
//         <div className={'${ubuntu.variable} w-72 text-white  text-[30px] font-sans font-normal mt-5'}>
//         Elevate Your Space
//         With your Service
//         </div>
//         <Swiper
         
//          loop={true}
//           breakpoints={{
//             340: {
//               slidesPerView: 1,
//               spaceBetween:15
//             },
//             700: {
//               slidesPerView: 2
//             },
//             1100: {
//               slidesPerView: 3,
//               spaceBetween: 30
//             }
//           }}
//           freeMode={true}
//           pagination={{
//             clickable: true,
            
//           }}
//           modules={[FreeMode, Pagination,Autoplay]}
//           className=" "
//           autoplay={true}

//       >
//           {servicesData.map((service, index) => (
//             <SwiperSlide key={index}>
//               <div className="flex justify-center items-center lg:h-[500px]   h-[450px]">
//                 <div className="w-[330px] h-[377px]  bg-white rounded-3xl ">
//                   <div className="h-[293.03px] rounded-3xl overflow-hidden">
//                     <img
//                       src={service.imgSrc}
//                       alt={service.title}
//                       className="h-full w-full object-cover object-center"
//                     />
//                   </div>
//                   <div className="flex justify-center gap- lg:gap-2 items-center ">
//                     <h1 className={title}>{service.title}</h1>
//                     <button className="bg-[rgba(0,48,71,1)] rounded-full text-white font-bold w-10 h-10 flex items-center justify-center shadow-lg mt-5 p-2">
//                       <ArrowUpRight />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default Slider;
