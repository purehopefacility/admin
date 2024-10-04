import AboutUs from "@/components/home/aboutus";
import Brands from "@/components/home/brands";
import Brands2 from "@/components/home/brands2";
import ContactUs from "@/components/home/contactus";
import IgGallery from "@/components/home/iggallery";
import MainCarousel from "@/components/home/maincarousel";
import OurCustomers from "@/components/home/ourcustomers";
import OurLocation from "@/components/home/ourlocation";
import OurService from "@/components/home/ourservice";
import WhyChoose from "@/components/home/whychoose";
import Sustainability from "@/components/home/environment";
import Sustain from "@/components/home/sustain";
import Support from "@/components/home/support";
import Recon from "@/components/home/recon";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col  items-center">
        <section id="mainCarousel" className="flex w-full">
          <MainCarousel />
        </section>
        <section id="aboutus" className="flex w-full">
          <AboutUs />
        </section>
        <section id="ourservice" className="flex w-full">
          <OurService />
        </section>
        <section id="whychoose" className="flex w-full">
          <WhyChoose />
        </section>
        <section id="sustain" className="flex w-full">
          <Sustain />
        </section>
        <section id="contactus" className="flex w-full">
          <ContactUs />
        </section>
        <section id="support" className="flex w-full">
          <Support />
        </section>
        <section id="brands" className="flex w-full">
          <Brands />
        </section>
        <section id="ourcustomers" className="flex w-full">
          <OurCustomers />
        </section>
        <section id="recon" className="flex w-full">
          <Recon />
        </section>
        <section id="brand2" className="flex w-full">
          <Brands2 />
        </section>
        <section id="iggallery" className="flex w-full ">
          <IgGallery />
        </section>
        <section id="ourlocation" className="flex w-full justify-center">
          <OurLocation />
        </section>
      </main>
    </div>
  );
}
