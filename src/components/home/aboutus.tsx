// import React from 'react';

import { div } from "framer-motion/client";
import { url } from "inspector";

const AboutUs = () => {
  return (
    // <div style={{backgroundImage:'url("images/home/Background lines.png")'}} className="bg-cover bg-bottom">
    <div className="mx-auto sm:px-4 py-10 lg:py-16 bg-cover bg-bottom xl:px-[11%] " style={{backgroundImage:'url("images/home/Background lines.png")'}} >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 bg-bottom " >

      {/* Image Gallery */}
        
        <div className="w-full lg:w-1/2 relative sm:aspect-[8/7] aspect-[8/8]">
          <div className="absolute sm:inset-10 inset-6">
            <div className="relative w-full h-full">
              {/* Library Image */}
              <div className="absolute top-0 left-0 w-[60%] h-[65%] overflow-hidden rounded-lg">
                <img
                  src="images/home/Rectangle 5.png"
                  alt="Library"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Melbourne Skyline Image */}
              <div className="absolute top-[5%] right-0 w-[35%] h-0 pb-[35%] overflow-hidden rounded-full">
                <img
                  src="images/home/Rectangle 10.png"
                  alt="Melbourne Skyline"
                  className="absolute w-full h-full object-cover"
                />
              </div>
              
              {/* Office Desk Image */}
              <div className="absolute bottom-[0%] right-[0%] w-[48%] h-[52%] overflow-hidden rounded-lg">
                <img
                  src="images/home/Rectangle 11.png"
                  alt="Office Desk"
                  className="w-full h-full object-fit"
                />
              </div>
              
              {/* 10+ Years Box */}
     
              <div className="absolute bottom-5 p-10 left-[10%] w-[24%] h-[25%] bg-[#003047] rounded-2xl flex flex-col justify-center items-center shadow-[-10px_20px_18px_rgba(8,47,73,0.5)]">
                <div className="flex flex-col items-center justify-center p-10" >
                <span className="text-white lg:text-3xl text-2xl font-bold">10+</span>
                <span className="text-white text-sm text-center">successful years</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Image Gallery */}
        {/* <div className="absolute"></div>
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]">
          <img
            src="images/home/Rectangle 5.png"
            alt="Library"
            className="absolute w-[50%] h-[60%] top-0 left-0 object-cover rounded-lg"
          />
          <img
            src="images/home/Rectangle 10.png"
            alt="Melbourne Skyline"
            className="absolute w-[45%] h-[45%] top-[5%] right-0 object-cover overflow-hidden rounded-full"
          />
          <img
            src="images/home/Rectangle 11.png"
            alt="Office Desk"
            className="absolute w-[55%] h-[40%] bottom-[5%] right-[5%] object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-[5%] bg-sky-950 rounded-lg flex flex-col justify-center items-center p-4 w-[25%] h-[30%]">
            <span className="text-white text-3xl font-bold">10+</span>
            <span className="text-white text-sm text-center">successful years</span>
          </div>
        </div> */}
        

        {/* Content */}

        <div className="w-full lg:w-1/2 flex flex-col sm:p-10 px-6">
          {/* <div className="bg-sky-950 text-white px-6 py-2 rounded-md w-1/4 items-center mb-4">
            <h2 className="text-lg font-medium">About Us</h2>
          </div> */}
          <div className="flex lg:w-1/3 sm:w-1/2 flex-row">
          <button className=" bg-[#003047] text-white px-8 py-2 mb-5 rounded-lg" >About Us</button>
          </div>
          <div className="flex flex-col">
          <h1 className="text-3xl lg:text-3xl font-medium text-[#003047] mb-6">
            Pure Hope Facility Management Pty Ltd
          </h1>
          <p className="text-[#003047] lg:text-base text-sm mb-6 lg:text-start text-justify">
            Pure Hope Facility Management & Cleaning Services, is a professional commercial and industrial specialist located in Melbourne who provides exclusive and unique cleaning & Facility Management services to commercial and office premises, building, and post-construction industries. Our premium cleaning service provider in Melbourne CDB and almost all metropolitan suburbs in Victoria and being a leading cleaning company that offers a comprehensive range of cleaning solutions to aid our valuable customers to sustain a germ-free clean and tidy environment!
          </p>
          </div>
        </div>
      </div>

    </div>
    // </div>
  );
};

export default AboutUs;