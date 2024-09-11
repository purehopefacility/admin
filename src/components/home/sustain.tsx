
import React from 'react';

export default function Sustain() {
  return (
    <div className="h-full w-full bg-center bg-cover bg-norepeat bg-[url(/images/home/Environment.png)] mt-10 mb-20">
      <div className="flex flex-col h-full justify-center sm:pl-[12%] my-[8%] sm:items-start items-center ">
        <div className="flex mb-10">
          <h1 className="text-white 2xl:text-5xl xl:text-5xl md:text-4xl text-3xl font-semibold " style={{ textShadow: '6px 4px 6px rgba(0, 0, 0, 0.5)' }}>
            Sustainability
          </h1>
        </div>
        <div className="flex lg:max-w-[30%] md:max-w-[40%] sm:max-w-[40%] max-w-[80%]">
          <p className="text-white xl:text-base lg:text-sm text-sm sm:text-left text-justify" style={{ textShadow: '6px 4px 6px rgba(0, 0, 0, 0.5)' }}>
            At Pure Hope Facility Management, we are dedicated to fostering a
            sustainable future in partnership with the global community. Our
            commitment to eco-friendly practices is integral to our facility
            management services, driving us to implement solutions that not only
            enhance operational efficiency but also protect our planet.
            Together, we can create sustainable, thriving environments. Explore
            how our eco-friendly facility management solutions can help you make
            a positive impact on the world.
          </p>
        </div>
      </div>
    </div>
  );
}

