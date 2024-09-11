"use client";

import Link from "next/link";

export default function ContactUs() {
  return (
    <>
    <div className= "flex w-full h-auto  justify-center ">
      <div className="bg-[#003047] flex lg:flex-row w-[78%] md:w-[60%] rounded-2xl px-10 lg:py-6 py-8 flex-col lg:p-8">
        {/*titlle and description */}
        <div className=" flex flex-col lg:pb-10 pb-2 lg:justify-center lg:items-start md:basis-1/2 lg:p-4 items-center lg:pt-8">
          <h1 className="text-xl md:text-4xl font-bold text-white mb-2">GET A FREE QUOTE</h1>
          <p className=" text-white text-sm lg:text-start text-center" >
          Connect to customer care for more information about 
          your service request.
          </p>
        </div>

        {/* image & phone number */}
        <div className="flex items-center  md:basis-1/2 mt-4 md:mt-0 justify-center">
          {/*phone icon*/}
          <div className="md:w-[50px] md:h-[50px] xl:w-[70px] xl:h-[70px] rounded-full bg-[#F4F4F4] p-2 md:ml-10 w-[30px] h-[30px] md:p-4">
            <img src="/images/home/call image.png" />
          </div>
          {/*phone number*/}
          <div className="items-start md:ml-6 ml-5 ">
            <h1 className="text-white text-base">Contact US</h1>
            <Link href="tel:1300762950" className=" text-lg text-white md:text-2xl font-bold">1300 762 950</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

