"use client";

import { useState, useEffect, useRef } from "react";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import '@/components/css/nav.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex justify-center">
        <nav className="flex justify-between items-center bg-white w-screen p-6 h-24 lg:shadow-xl lg:px-[12%]">
          <div className="w-40 sm:w-40 md:w-44 lg:w-44">
            <Link href="/" className="">
              <img src="/images/home/logonav.png" alt="Logo" />
            </Link>
          </div>
          {/* Mobile menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-[#003047]">
              {isOpen ? (
                <div>
                  <X />
                </div>
              ) : (
                <div>
                  <AlignJustify />
                </div>
              )}
            </button>
          </div>
          {/* Normal navbar */}
          <ul
            className={`hidden lg:flex items-center md:gap-3 lg:gap-4 xl:gap-9`}
          >
            <Link href={"/"} className="relative text-sky-950 dot-indicator hover: focus:font-bold">
              <li>Home</li>
            </Link>

            <Link href={"/about-us"} className="relative text-sky-950 dot-indicator hover:font-bold focus:font-bold">
              <li>About Us</li>
            </Link>

            <Link href={"/ourservices"} className="relative text-sky-950 dot-indicator hover:font-bold focus:font-bold">
              <li>Our Services</li>
            </Link>

            <Link href={"/ophpolicy"} className="relative text-sky-950 dot-indicator hover:font-bold focus:font-bold">
              <li>PH Policy</li>
            </Link>

            <Link href={"/Ophpolicy"} className="relative text-sky-950 dot-indicator hover:font-bold focus:font-bold hidden">
              <li>Recents Updates</li>
            </Link>

            <Link href={"/contactus"} className="relative text-sky-950 dot-indicator hover:font-bold focus:font-bold">
              <li>Contact Us</li>
            </Link>
          </ul>
          <div className="hidden lg:block">
            <Link href={"/requestquote"}>
              <button className="relative flex flex-col items-center">
                <img
                  src="/images/home/navbtn.png"
                  className="relative"
                  alt="Button Image"
                />
                <span className="absolute top-3 z-10 text-white">
                  Request Quote
                </span>
              </button>
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      <div className="flex justify-center ">
        <div
          ref={menuRef}
          className={`lg:hidden flex justify-center z-30 absolute w-screen bg-white transform rounded-b-2xl top-20 transition-all duration-300 ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <ul className="flex flex-col items-center gap-4 px-10 py-4 mt-10">
            <Link href={"/"} className="relative text-black dot-indicator hover:font-bold focus:font-bold" onClick={toggleMenu}>
              <li>Home</li>
            </Link>
            <Link href={"/about-us"} className="relative text-black dot-indicator hover:font-bold focus:font-bold" onClick={toggleMenu}>
              <li>About Us</li>
            </Link>
            <Link href={"/ourservices"} className="relative text-black dot-indicator hover:font-bold focus:font-bold" onClick={toggleMenu}>
              <li>Our Services</li>
            </Link>
            <Link href={"/ophpolicy"} className="relative text-black dot-indicator hover:font-bold focus:font-bold" onClick={toggleMenu}>
              <li>PH Policy</li>
            </Link>
            <Link href={"/Ophpolicy"} className="relative text-black dot-indicator hover:font-bold focus:font-bold hidden" onClick={toggleMenu}>
              <li>Recent Updates</li>
            </Link>
            <Link href={"/contactus"} className="relative text-black dot-indicator hover:font-bold focus:font-bold" onClick={toggleMenu}>
              <li>Contact Us</li>
            </Link>
            <Link href={"/requestquote"} onClick={toggleMenu}>
              <button className="relative flex flex-col items-center">
                <img
                  src="/images/home/navbtn.png"
                  className="relative"
                  alt="Button Image"
                />
                <span className="absolute top-3 z-10 text-white">
                  Request Quote
                </span>
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
