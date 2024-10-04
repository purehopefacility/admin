"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { div } from "framer-motion/client";
import { useState, useEffect } from "react";

interface RW {
  avatar: string;
  feedback: string;
  name: string;
  position: string;
  rating: number;
}

export default function OurCustomers() {
  const [Reviewdata, setReviewData] = useState<RW[]>([
    {
      avatar:
        "https://www.google.com/imgres?q=avatar%20image&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-psd%2F3d-illustration-person-with-sunglasses_23-2149436188.jpg%3Fsize%3D338%26ext%3Djpg%26ga%3DGA1.1.1819120589.1727654400%26semt%3Dais_hybrid&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Favatar&docid=DjJcL6-DnnZi6M&tbnid=Pns35Dm3xVP0eM&vet=12ahUKEwj65cSTvuyIAxXv1jgGHfAdFQAQM3oECBcQAA..i&w=338&h=338&hcb=2&ved=2ahUKEwj65cSTvuyIAxXv1jgGHfAdFQAQM3oECBcQAA",
      feedback:
        "The quality of cleaning is excellent. They are dependable. A morning appointment is very important to me and they always keep that time frame.",
      name: "Jude Roshen",
      position: "CEO - Five Squared",
      rating: 5,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/feedbacks");
        const feedbacks = await response.json();
        console.log("FEDBACKS  : ", feedbacks.data);
        setReviewData(feedbacks.data);
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
        {Reviewdata ? (
          <Marquee pauseOnHover>
            {Reviewdata.map((review: RW, idx) => (
              <div className="max-w-md xl:max-w-xl bg-white rounded-lg shadow-md p-9 mx-4 ">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.avatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-gray-700 mb-2">{review.feedback}</p>
                    <div className="flex flex-col justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {review.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium">
                          {review.position}
                        </p>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-400 mr-1">
                          {review.rating}
                        </span>
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
            ))}
          </Marquee>
        ) : null}

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
                  morning appointment is very important to me and they always
                  keep that time frame.
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
