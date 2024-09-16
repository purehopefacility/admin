"use client";
import Link from "next/link";
import { Linkedin, Facebook, Instagram, MapPin, Phone, AtSign, Youtube, Twitch, LucideTwitter, WashingMachine } from "lucide-react";

import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa';
import { SlSocialSteam } from 'react-icons/sl'; // Threads icon from Simple Line Icons
import { IconBrandLinkedin, IconBrandFacebook, IconBrandInstagram, IconBrandThreads, IconBrandTwitter, IconBrandYoutube, IconBrandTiktok, IconBrandX } from "@tabler/icons-react";

import { FormEvent, useState } from "react";
import SuccessDialog from "./util/successDialog";
import { useRouter } from "next/navigation";

interface NewsletterResponse {
  message: string;
}

interface SuccessDialogpop{
  title: string;
  message: string;
  btn: string;
}


export default function Footer() {

  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<SuccessDialogpop | undefined>();
  const [issub, setsub] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('mail', email);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: formData,
      });

      const result: NewsletterResponse = await response.json();

      if (response.ok) {
        setMessage({title: "SUBSCRIBED !", message: "you subscribe our newsletters", btn:"Ok"});
        setsub(true);
        setEmail('');
      } else {
        setMessage({title: "Error!", message: "An error occurred.", btn:"cancel"});
        setsub(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({title: "Error!", message: "An error occurred. Please try again.", btn:"cancel"});
      setsub(true);
    }
  };

  const handleDialogClose = () => {
    setsub(false);
    // Redirect to another page after closing the dialog
    router.push('/');
  };


  return (
    <footer className="  md:m-2 w-full xl:mx-[10%] xl:mb-4 overflow-hidden">
      {/*blue color aria*/}
      <div className="bg-[#003047] text-white p-10 md:py-10 rounded-3xl w-full sm:w-full">
        {/*top section*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-around md:mb-10">
          {/*logo & description*/}
          <div className="space-y-4">
            <img src="/images/home/footer.png" className="md:w-[181px]" />
            <p className="md:w-[500px] font-light text-sm">
            Pure Hope Facility Management is a professional commercial, industrial cleaning and floorcare services specialist located in Metropolitan Melbourne who provides exclusive and unique facility management services to commercial, industrial and retail premises.
            </p>
          </div>
          {/*from here*/}
          <div className="mt-2 md:mt-14">
            <h3 className=" font-normal flex  mb-4">
              Subscribe To Our Newsletter
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row gap-1">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-grow p-2 bg-[#219ebc4d] placeholder:text-white rounded h-12 sm:h-14 md:h-14 border-2 border-[#219ebc]"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-white text-[#003047]  py-2 md:px-6 rounded font-bold text-[8px] md:text-[15px]"
              >
                SUBSCRIBE
              </button>
            </form>
            <SuccessDialog isOpen={issub} onClose={handleDialogClose} title={message?.title ?? ""} des={message?.message ?? ""} btntitle={message?.btn ?? ""} />
          </div>
        </div>

        {/*bottom section*/}
        <div className="grid sm:grid-cols-2  lg:grid-cols-5 md:gap-6 mt-8 lg:flex lg:justify-between">
          {/*contacts*/}
          <div className="flex flex-col gap-4 ">
            <h3 className="font-bold">CONTACT</h3>
            <a href="https://maps.app.goo.gl/KCmzaAgV1R8nX51XA">
            <div className="flex flex-row gap-2">
              <MapPin size={20}  className=""/>
              <p className=" text-sm w-56">Suite 346 , Level 2/66 Victor Cres, Narre Warren VIC 3805, Australia</p>
            </div>
            </a>
            <a href="tel:1300762950">
            <div className="flex flex-row gap-2">
              <Phone size={20} className=""/>
              <p className="text-sm">1300 762 950</p>
            </div>
            </a>
            <a href="mailto:info@purehopefm.com.ou">
            <div className="flex flex-row gap-2">
              <AtSign size={20} className=""/>
              <p className="text-sm">info@purehopefm.com.au</p>
            </div>
            </a>
            <div className="flex gap-x-2 " >
            <div className="bg-[rgba(0,48,71,1)] h-12 rounded-lg flex justify-center items-center">
              <a href="https://web.facebook.com/profile.php?id=61561873951981">
                <IconBrandFacebook size={25} className="text-white" />
              </a>
            </div>
            <div className="bg-[rgba(0,48,71,1)] h-12 rounded-lg flex justify-center items-center">
              <a href="https://www.instagram.com/_purehopefacility_/">
                <IconBrandInstagram size={25} className="text-white" />
              </a>
            </div>
            <div className="bg-[rgba(0,48,71,1)] h-12 rounded-lg flex justify-center items-center">
              <a href="https://www.threads.net/@_purehopefacility_/">
                <IconBrandThreads size={24} className="text-white" />
              </a>
            </div>
            <div className="bg-[rgba(0,48,71,1)] h-12 rounded-lg flex justify-center items-center">
              <a href="https://x.com/purehopefm">
                <IconBrandX size={24} className="text-white" />
              </a>
            </div>
            <div className="bg-[rgba(0,48,71,1)] h-12 rounded-lg flex justify-center items-center">
              <a href="https://www.linkedin.com/in/pure-hope-facility-management-90678831a/">
                <IconBrandLinkedin size={24} className="text-white" />
              </a>
            </div>
            <div className="bg-[rgba(0,48,71,1)] h-12 rounded-lg flex justify-center items-center">
              <a href="https://www.youtube.com/@purehopefm">
                <IconBrandYoutube size={24} className="text-white" />
              </a>
            </div>
            <div className="bg-[rgba(0,48,71,1)] h-12 rounded-lg flex justify-center items-center">
              <a href="https://www.tiktok.com/@purehopefm">
                <IconBrandTiktok size={24} className="text-white" />
              </a>
            </div>
            </div>
            </div>
          {/*links*/}
          <div className="space-y-2  mt-7 sm:mt-0 ">
            <h3 className="font-bold ">OUR LINKS</h3>
            <ul className="space-y-1 ">
              <li className="text-sm">
                <Link href="/" >Home</Link>
              </li>
              <li className="text-sm">
                <Link href="/about-us" >About Us</Link>
              </li>
              <li className="text-sm">
                <Link href="/ourservices" >Services</Link>
              </li>
              <li className="text-sm hidden">
                <Link href="/recent-updates" >Recent Updates</Link>
              </li>
              <li className="text-sm">
                <Link href="/requestquote" >Request A Quote</Link>
              </li>
            </ul>
          </div>
          {/*social media*/}
          {/* <div className="space-y-2  mt-7 sm:mt-0 ">
            <h3 className="font-bold ">SOCIAL LINKS</h3>
            
          </div> */}
          {/*services*/}
          <div className="space-y-2 mt-7 lg:mt-0">
            <h3 className="font-bold ">OUR SERVICES</h3>
            <ul className="space-y-1 ">
              <li className="text-sm">Pure Hope Cleaning Services</li>
              <li className="text-sm">Pure Hope Floor Care Services</li>
              <li className="text-sm">Other Services</li>
            </ul>
          </div>
          {/*help center*/}
          <div className="space-y-2 mt-7 lg:mt-0 ">
            <h3 className="font-bold ">HELP CENTER</h3>
            <ul className="md:space-y-2">
              <li className="text-sm">
                <Link href="/ophpolicy">Pure Hope Policy</Link>
              </li>
              <li className="text-sm">
                <Link href="/ophpolicy">Service Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* footer bottom */}
      <div className="pt-2 px-10 md:px-20 md:pt-6 ">
        <div className="flex flex-row justify-between items-center">
          <p className="text-[6px] sm:text-[10px] md:text-[15px] text-black">
            &copy; 2024 All Rights Reserved. Pure Hope
          </p>
          <div className="space-x-4 text-[6px] sm:text-[10px] md:text-[15px]">
            <Link href="">Terms & Policy</Link>
            <Link href="">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
