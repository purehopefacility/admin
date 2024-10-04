import { AtSign, MapPin, Smartphone } from "lucide-react";
import ContactForm from "./contactform";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandTiktok,
  IconBrandThreads,
  IconBrandX,
} from "@tabler/icons-react";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactUs() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col">
        {/* Header Section */}
        <div
          className="flex w-full items-end justify-center h-64 relative bg-cover bg-center bg-blue-700"
          style={{ backgroundImage: "url('/images/contactus/contactus.png')" }}
        >
          <div className="relative md:w-3/4 w-[84%] h-1/2 p-2 bottom-[-20%] rounded-t-lg bg-white flex justify-center items-center">
            <div className="mb-5 text-[#219EBC] font-bold text-xl sm:text-2xl">
              <span className="text-[#003047]">Contact</span>
              <span className="font-medium"> Us</span>
            </div>
          </div>
        </div>

        {/* Contact Info and Form Section */}
        <div className="flex flex-col justify-center p-8 sm:p-12 md:p-16 pt-20">
          <div className="flex flex-col sm:flex-row gap-9 flex-wrap justify-center pb-16">
            {/* Contact Info */}
            <div className="flex flex-col gap-4 w-full sm:w-auto">
              {/* Address Info */}
              <a href="https://maps.app.goo.gl/KCmzaAgV1R8nX51XA">
                <div className="flex items-center gap-4 sm:gap-7 w-full h-auto bg-[rgba(0,48,71,1)] p-4 rounded-lg">
                  <MapPin size={24} className="text-white" />
                  <p className="text-sm text-white w-[220px]">
                    Suite 346 , Level 2/66 Victor Cres, Narre Warren VIC 3805,
                    Australia
                  </p>
                </div>
              </a>

              {/* Phone Info */}
              <a href="tel:1300762950">
                <div className="flex items-center gap-4 sm:gap-7 w-full h-auto bg-[rgba(0,48,71,1)] p-4 rounded-lg">
                  <Smartphone size={24} className="text-white" />
                  <p className="text-sm text-white">1300 762 950</p>
                </div>
              </a>

              {/* Email Info */}
              <a href="mailto:info@purehopefm.com.ou">
                <div className="flex items-center gap-4 sm:gap-7 w-full h-auto bg-[rgba(0,48,71,1)] p-4 rounded-lg">
                  <AtSign size={24} className="text-white" />
                  <p className="text-sm text-white">info@purehopefm.com.ou</p>
                </div>
              </a>

              {/* Social Icons (Placeholders) */}
              <div className="grid grid-cols-7 gap-2">
                <div className="bg-[rgba(0,48,71,1)] h-12 rounded-lg flex justify-center items-center">
                  <a href="https://web.facebook.com/profile.php?id=61561873951981">
                    <IconBrandFacebook size={24} className="text-white" />
                  </a>
                </div>
                <div className="bg-[rgba(0,48,71,1)] h-12 rounded-lg flex justify-center items-center">
                  <a href="https://www.instagram.com/_purehopefacility_/">
                    <IconBrandInstagram size={24} className="text-white" />
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

              {/* Google Map */}
              <div className="mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.0131429708686!2d145.31116937589525!3d-38.02347307192378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d040263d59259bf%3A0x4dd3c2ce3182b040!2sPure%20Hope%20Facility%20Management%20Pty%20Ltd!5e0!3m2!1sen!2slk!4v1725635176730!5m2!1sen!2slk"
                  loading="lazy"
                  className="outline outline-4 outline-[rgba(0,48,71,1)] rounded-lg w-full sm:w-[375px] h-[180px]"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="w-full sm:w-auto mt-8 sm:mt-0">
              <div className="mb-5 text-lg sm:text-lg ">Contact Form</div>
              <ContactForm />
            </div>
            <div className="flex items-center justify-center">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
