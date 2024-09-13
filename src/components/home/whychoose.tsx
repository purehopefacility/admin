"use client";
import React, { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Type for Accordion props
type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use correct typing for contentRef
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="border-t border-sky-400 overflow-hidden mx-8">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
        )}
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
        }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="px-6 pb-4">{children}</div>
      </div>
    </div>
  );
};

export default function WhyChoose() {
  return (
    <div className="w-full pt-16 2xl:px-[7%] xl:px-[6%] sm:px6">
      <div className="flex xl:flex-row xl:h-full flex-col">
        <div className="flex flex-col xl:w-1/2 flex-1 overflow-y-auto mt-4 justify-start lg:ml-8">
          <div className="flex bg-[#003047] w-[140px] h-[34px] rounded-md items-center justify-center ml-6 sm:w-[180px] sm:h-[42px] sm:mx-16 md:w-[200px] md:h-[52px] lg:h-[62px] lg:w-[230px] 2xl:w-[180px] 2xl:h-[45px]">
            <h1 className="text-white text-xs font- sm:text-base lg:text-lg 2xl:text-sm">
              Why choose 
            </h1>
          </div>
          <div className="flex sm:mx-16 mx-6">
            <h1 className="text-[#003047] text-3xl my-4 sm:text-3xl sm:font-medium md:text-3xl lg:text-3xl 2xl:text-3xl">
              Why Choose <br />Pure Hope Facility Management Pty Ltd
            </h1>
          </div>
          <div className="flex mx-6 sm:mx-16">
            <p className="text-[#003047] text-sm md:text-lg lg:text-xl 2xl:text-base text-justify lg:text-left">
              With over 10 years of treasured experience, unvarying commitment, and through our proven organisational skills and our customers' satisfaction, delivering Facility Management & Cleaning services. Our staff is well-trained and monitored by supervisors regularly to ensure the quality, standards, and reliability of our services.
            </p>
          </div>
          <div className="my-10">
            <div className="max-w-2xl sm:ml-8 bg-white rounded-lg">
              <Accordion title="Pure Hope Cleaning Services">
                <ul className="list-[circle] xl:ml-5">
                  <li>Pure Hope Cleaning Services</li>
                  <li>Commercial Cleaning</li>
                  <li>Council & Community Service Cleaning</li>
                  <li>School Cleaning</li>
                  <li>Early Childhood Education Cleaning</li>
                  <li>Aged Care Cleaning</li>
                  <li>Medical / Healthcare Cleaning</li>
                  <li>Industrial Cleaning</li>
                  <li>Warehouse and Factory Cleaning</li>
                  <li>Builders Cleaning</li>
                  <li>Retail Cleaning</li>
                  <li>Restaurant & Kitchen Cleaning</li>
                  <li>GYM Cleaning</li>
                  <li>Cinema & Theater Cleaning</li>
                  <li>End of lease cleaning</li>
                  <li>One-off cleaning</li>
                  <li>Window Cleaning</li>
                  <li>Anti-Viral & Sanitation</li>
                </ul>
              </Accordion>

              <Accordion title="Pure Hope Floor Care Services">
                <ul className="list-[circle] xl:ml-5">
                  <li>Pressure Wash Cleaning</li>
                  <li>Carpet Steam Cleaning</li>
                  <li>Upholstery Cleaning</li>
                  <li>Timber Floor Sanding and Polishing</li>
                  <li>Vinyl Strip & Sealing</li>
                  <li>Tile & Grout Cleaning</li>
                  <li>Mable Restoration</li>
                  <li>Benchtop Restoration</li>
                  <li>Terrazzo Grinding & Polishing</li>
                  <li>Natural Stone Restoration & Sealing</li>
                  <li>Epoxy Coating</li>
                  <li>Concrete Grinding and Polishing</li>
                  <li>Exposed Aggregate Sealing</li>
                  <li>Anti Slip Treatmen</li>
                  <li>24/7 Flood Water Damage & Restoration</li>
                </ul>
              </Accordion>

              <Accordion title="Other Services">
                <ul className="list-[circle] xl:ml-5">
                <li>Supply of Consumables</li>
                          <li>Facility Maintenance</li>
                          <li>Graffiti Removal Services</li>
                          <li>Canopy Cleaning Services</li>
                          <li>Shower & Bathroom Mould Removing</li>
                          <li>Shower Restoration & Re-Sealing</li>
                          <li>Tile Re-Grouting</li>
                          <li>Silicone Replacement</li>
                          <li>Balcony Old Grout Removal & Re-Grouting Service</li>
                          <li>Anti-Graffiti Treatment Service</li>
                          <li>Occupational Health & Safety (OHS) Policy</li>
                          <li>Quality Assurance Policy</li>
                          <li>Environmental Policy</li>
                </ul>
              </Accordion>
            </div>
          </div>
        </div>
        
        {/* Image layout */}
        <div className="w-full xl:w-1/2 relative aspect-[8/8]">
          <div className="absolute inset-10 xl:mx-auto overflow-y-hidden lg:w-auto">
            <div className="relative xl:h-auto xl:w-auto h-full xl:aspect-[4/4]">
              <div className="absolute top-0 left-[10%] w-[80%] h-[60%] overflow-hidden rounded-lg">
                <img
                  src="images/home/last4.jpeg"
                  alt="Library"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              
              {/* Office Desk Image */}
              <div className="absolute bottom-[2%] left-[45%] w-[50%] h-[50%] overflow-hidden rounded-lg">
                <img
                  src="images/home/choose us 2.png"
                  alt="Office Desk"
                  className="w-full h-full object-fit"
                />
              </div>
              <div className="absolute bottom-[9%] p-10 left-[15%] w-[24%] h-[24%] bg-[#003047] rounded-xl flex flex-col justify-center items-center shadow-[-10px_20px_18px_rgba(8,47,73,0.5)]">
                <div className="flex flex-col items-center justify-center p-10">
                  <span className="text-white lg:text-3xl text-2xl font-bold">10+</span>
                  <span className="text-white text-sm text-center">successful years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
