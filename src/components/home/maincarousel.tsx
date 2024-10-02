"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AvatarCircles from "../magicui/avatar-circles";

interface CarouselItem {
  slideId: number;
  image: string;
  title1: string;
  title2: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const avatarUrls: string[] = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
];

// const carouselData: CarouselItem[] = [
//   {
//     slideId: 1,
//     image: "/images/home/1.jpg",
//     title1: "WELCOME TO",
//     title2: "Pure Hope Facility Management",
//     description:
//       "We provide exceptional cleaning and floor care solutions which exceed our clients expectations.",
//     buttonText: "Contact Us",
//     buttonLink: "/contactus",
//   },
//   {
//     slideId: 2,
//     image: "/images/home/2.jpg",
//     title1: "",
//     title2: "Reliable Facility Management",
//     description:
//       "Our team of experts ensures your facility stays spotless and hygienic.",
//     buttonText: "Contact Us",
//     buttonLink: "/contactus",
//   },
//   {
//     slideId: 3,
//     image: "/images/home/3.jpg",
//     title1: "",
//     title2: "Certified and",
//     description: "experienced professionals",
//     buttonText: "Our Services",
//     buttonLink: "/ourservices",
//   },
//   {
//     slideId: 4,
//     image: "/images/home/4.jpg",
//     title1: "",
//     title2: "Transform Your Space With",
//     description: "Our top-tier facility services",
//     buttonText: "Request a Quote",
//     buttonLink: "/requestquote",
//   },
// ];

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [Slides, setSlides] = useState<CarouselItem[]>([]);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/admin/api/slides");
        if (!response.ok) {
          throw new Error("Failed to fetch slides");
        }
        const data = await response.json();
        setSlides(data.slideData);
        //setLoading(false);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
        //setLoading(false);
      }
    };
    fetchSlides();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % Slides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const goToNextSlide = (): void => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % Slides.length);
  };

  const goToPrevSlide = (): void => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + Slides.length) % Slides.length,
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (): void => {
    if (touchStartX.current - touchEndX.current > 75) {
      goToNextSlide();
    }
    if (touchEndX.current - touchStartX.current > 75) {
      goToPrevSlide();
    }
  };

  return (
    <div className="relative w-full sm:h-screen flex flex-col">
      <div
        className="flex-grow relative overflow-hidden h-72"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {Slides.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={item.image}
              alt={`${item.title1} ${item.title2}`}
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-35 flex items-center ">
              <div className=" mx-[12%] ">
                <div className="mt-10 sm:mt-0">
                  <h1 className="mb-0 sm:mb-4">
                    <span
                      className="block text-1xl md:text-4xl text-white font-light"
                      style={{
                        textShadow: "6px 4px 6px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {item.title1}
                    </span>
                    <span
                      className="block text-2xl md:text-5xl text-white font-semibold sm:font-bold  mt-2"
                      style={{
                        textShadow: "6px 4px 6px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {item.title2}
                    </span>
                  </h1>
                  <p
                    className="text-[14px] md:text-3xl text-white mb-4 sm:mb-8"
                    style={{ textShadow: "6px 4px 6px rgba(0, 0, 0, 0.5)" }}
                  >
                    {item.description}
                  </p>
                  {index === currentSlide && (
                    <Link href={item.buttonLink} passHref>
                      <span className="bg-[#219EBC] text-white font-bold py-1 px-3 sm:py-2 sm:px-6 text-xs rounded-md sm:text-base sm:rounded-lg transition duration-300 cursor-pointer inline-block relative z-10 hover:bg-[#003047]">
                        {item.buttonText}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Next and Previous buttons - hidden on mobile */}
        <div className="hidden sm:block">
          {currentSlide !== 0 && (
            <button
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute -bottom-1 left-0 right-0">
        <div className="flex justify-center">
          <div className="relative w-32 h-4">
            {Slides.map((_, index) => (
              <div
                key={index}
                className={`absolute top-0 w-8 h-8 rounded-full transition-all duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  left: `${(index / (Slides.length - 1)) * 100}%`,
                  transform: `translateX(-50%)`,
                }}
              >
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#00374A] rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className="absolute top-[-13px] sm:hidden ">
        <div className="sm:ml-[-5px]">
          <Image
            src="/images/home/17.png"
            alt="Top Right Image"
            width={270}
            height={100}
            className="lg:mr-[1px] mt-0 ml-[-23px] sm:ml-[-15px] sm:top-0 "
          />
          <div className="relative top-9 ml-1 sm:ml-10 mt-[-86px] lg:mt-[-1]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 350 86"
              fill="none"
              className="ml-3 w-[180px]"
            >
              <path
                d="M15 86C6.71572 86 0 79.2843 0 71L0 15C0 6.71573 6.71573 0 15 0L334.594 0C345.896 0 353.138 12.0249 347.853 22.0148L318.225 78.0148C315.626 82.9272 310.524 86 304.966 86L15 86Z"
                fill="#003047"
              />
            </svg>
          </div>
        </div>

        {/* Avatar Circles */}
        <Link href={"#ourcustomers"}>
          <div className="absolute top-8 flex items-center space-x-2 pl-0 sm:absolute bottom-6 left-[30px] ">
            <AvatarCircles numPeople={4} avatarUrls={avatarUrls} className="" />

            <p className="text-white text-[9px] sm:text-xs sm:left-15 ">
              Our Vip Clients
            </p>
          </div>
        </Link>
      </div>
      {/* Avatar large screen*/}
      <div className="absolute top-[-13px] hidden sm:block">
        <div className="sm:ml-[-5px]">
          <Image
            src="/images/home/17.png"
            alt="Top Right Image"
            width={370}
            height={200}
            className="lg:mr-[1px] mt-0 ml-[-23px] sm:ml-[-15px] sm:top-0 "
          />
          <div className="ml-6 sm:ml-10 mt-[-86px] lg:mt-[-1]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="250"
              height="86"
              viewBox="0 0 350 86"
              fill="none"
              className="ml-3"
            >
              <path
                d="M15 86C6.71572 86 0 79.2843 0 71L0 15C0 6.71573 6.71573 0 15 0L334.594 0C345.896 0 353.138 12.0249 347.853 22.0148L318.225 78.0148C315.626 82.9272 310.524 86 304.966 86L15 86Z"
                fill="#003047"
              />
            </svg>
          </div>
        </div>

        {/* Avatar Circles */}
        <Link href={"#ourcustomers"}>
          <div className="absolute flex items-center space-x-2 pl-0 sm:absolute bottom-6 left-[60px]">
            <AvatarCircles numPeople={4} avatarUrls={avatarUrls} />

            <p className="text-white text-xs sm:left-15">Our Vip Clients</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
