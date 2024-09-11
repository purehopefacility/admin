'use client'
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { div } from "framer-motion/client";
import { useState, useEffect } from "react";

export default function OurCustomers() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("ENDPOINT_URL"); 
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  }
  fetchData();
  }, []);
  
  return (
    <div className="mx-4 overflow-hidden ">
      <div className="flex flex-col my-8">
      <div className="flex justify-center">
        <h1 className="text-[#003047] text-xl font-bold text-center">
          Precious Words from 
          <span className="block sm:inline text-[#219EBC] font-medium sm:ml-2">
            Our Customers
          </span>
        </h1>
      </div>
        
      </div>
      <div className="bg-[#fcfcfc]">
        {/* repeat eka remove karla map karapan wasthuwe */}
      <Marquee pauseOnHover repeat={5}>
        <div className="max-w-md xl:max-w-xl bg-white rounded-lg shadow-md p-9 mx-4 ">
          <div className="flex items-start space-x-4">
            <img
              src="/images/avatar.png"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <p className="text-gray-700 mb-2">
                The quality of cleaning is excellent. They are dependable. A
                morning appointment is very important to me and they always keep
                that time frame.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">Jude Roshen</h3>
                  <p className="text-sm text-gray-600">CEO - Five Squared</p>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">5</span>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Marquee>
      {/* reverse marquee ekak ona nm mekath map karapan wasthuwe */}
      <Marquee pauseOnHover repeat={5} reverse={true}>
        <div className="max-w-md xl:max-w-xl bg-white rounded-lg shadow-md p-9 mx-4 mt-5 hidden">
          <div className="flex items-start space-x-4">
            <img
              src="/images/avatar.png"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <p className="text-gray-700 mb-2">
                The quality of cleaning is excellent. They are dependable. A
                morning appointment is very important to me and they always keep
                that time frame.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">Jude Roshen</h3>
                  <p className="text-sm text-gray-600">CEO - Five Squared</p>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">5</span>
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Marquee>
      </div>
    </div>
  );
}
