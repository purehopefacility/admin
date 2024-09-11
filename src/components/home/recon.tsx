import React from "react";

export default function Recon() {
  return (
    <div className="h-full w-full bg-center bg-cover bg-norepeat bg-[url(/images/home/flags.png)] mt-20 mb-10">
      <div className="flex flex-col h-full justify-center sm:pl-[12%] my-[10%] sm:items-start items-center">
        <div className="flex mb-10">
          <h1 className="text-white 2xl:text-5xl xl:text-4xl md:text-3xl text-3xl font-semibold" style={{ textShadow: '6px 4px 6px rgba(0, 0, 0, 0.5)' }}>
            Reconciliation
          </h1>
        </div>
        <div className="flex lg:max-w-[30%] md:max-w-[40%] sm:max-w-[40%] max-w-[80%]">
          <p className="text-white xl:text-base lg:text-sm text-sm sm:text-left text-justify" style={{ textShadow: '6px 4px 6px rgba(0, 0, 0, 0.5)' }}>
            At Pure Hope Facility Management, we recognize the importance of
            reconciliation in Australia and are committed to supporting this
            vital process. We believe that fostering respectful relationships
            and acknowledging the rich cultural heritage of Aboriginal and
            Torres Strait Islander peoples are essential to building a united
            and inclusive community. We are collaborating with Reconciliation
            Australia to develop a Reconciliation Action Plan. Our aim is to
            take meaningful and sustainable steps toward advancing
            reconciliation.
          </p>
        </div>
      </div>
    </div>
  );
}
