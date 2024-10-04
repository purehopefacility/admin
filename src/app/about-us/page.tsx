import WhyChoose from "./why clients choose";
import Brands2 from "@/components/home/brands2";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutUs() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col content-end">
        <div
          className="flex w-full items-end justify-center h-64 mb-10 relative bg-cover bg-center bg-blue-700 border-2"
          style={{ backgroundImage: "url('/images/AboutUs/aboutusnew.jpg')" }}
        >
          <div className="absolute md:w-3/4 w-[84%] h-1/2 bottom-[-20%] p-2 rounded-t-lg bg-white flex justify-center items-center">
            <h1 className="text-2xl">
              <span className="font-bold text-[#003047]">About</span>{" "}
              <span className="text-[#219EBC]">Us</span>
            </h1>
          </div>
        </div>
      </div>
      <div className=" xl:px-[11%] md:px-10 px-[4%] py-4 lg:pt-16 ">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5">
          {/* Image Gallery */}

          <div className="w-full lg:w-1/2 relative md:aspect-[8/7] aspect-[8/8]">
            <div className="absolute sm:inset-10 inset-6">
              <div className="relative w-full h-full">
                {/* Library Image */}
                <div className="absolute top-0 left-0 w-[60%] lg:h-[65%] h-[60%] overflow-hidden rounded-lg">
                  <img
                    src="images/home/Rectangle 5.png"
                    alt="Library"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Melbourne Skyline Image */}
                <div className="absolute top-[5%] right-0 w-[35%] h-0 pb-[35%] overflow-hidden rounded-full">
                  <img
                    src="images/home/Rectangle 10.png"
                    alt="Melbourne Skyline"
                    className="absolute w-full h-full object-cover"
                  />
                </div>

                {/* Office Desk Image */}
                <div className="absolute bottom-[0%] right-[2%] w-[48%] h-[52%] overflow-hidden rounded-lg">
                  <img
                    src="images/home/Rectangle 11.png"
                    alt="Office Desk"
                    className="w-full h-full object-fit"
                  />
                </div>

                {/* 10+ Years Box */}

                <div className="absolute bottom-5 p-10 left-[10%] lg:w-[24%] lg:h-[25%] w-[30%] h-[30%] bg-sky-950 rounded-lg flex flex-col justify-center items-center shadow-[-10px_20px_18px_rgba(8,47,73,0.5)]">
                  <div className="flex flex-col items-center justify-center p-10">
                    <span className="text-white lg:text-3xl text-2xl font-bold">
                      10+
                    </span>
                    <span className="text-white text-sm text-center">
                      successful years
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          {/* <div className="absolute"></div>
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px]">
          <img
            src="images/home/Rectangle 5.png"
            alt="Library"
            className="absolute w-[50%] h-[60%] top-0 left-0 object-cover rounded-lg"
          />
          <img
            src="images/home/Rectangle 10.png"
            alt="Melbourne Skyline"
            className="absolute w-[45%] h-[45%] top-[5%] right-0 object-cover overflow-hidden rounded-full"
          />
          <img
            src="images/home/Rectangle 11.png"
            alt="Office Desk"
            className="absolute w-[55%] h-[40%] bottom-[5%] right-[5%] object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-[5%] bg-sky-950 rounded-lg flex flex-col justify-center items-center p-4 w-[25%] h-[30%]">
            <span className="text-white text-3xl font-bold">10+</span>
            <span className="text-white text-sm text-center">successful years</span>
          </div>
        </div> */}

          {/* Content */}

          <div className="w-full lg:w-1/2 flex flex-col sm:p-10 px-4 ">
            {/* <div className="bg-sky-950 text-white px-6 py-2 rounded-md w-1/4 items-center mb-4">
            <h2 className="text-lg font-medium">About Us</h2>
          </div> */}
            <div className="flex lg:w-1/3 sm:w-1/2 flex-row">
              <button className=" bg-sky-950 text-white px-8 py-2 mb-5 rounded-lg">
                About Us
              </button>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl lg:text-3xl font-semibold text-[#003047] mb-6">
                Pure Hope Facility Management Pty Ltd
              </h1>
              <p className="text-[#003047] text-sm sm:text-base lg:text-lg lg:text-start text-center">
                Pure Hope Facility Management & Cleaning Services, is a
                professional commercial and industrial specialist located in
                Melbourne who provides exclusive and unique cleaning & Facility
                Management services to commercial and office premises, building,
                and post-construction industries. Our premium cleaning service
                provider in Melbourne CDB and almost all metropolitan suburbs in
                Victoria and being a leading cleaning company that offers a
                comprehensive range of cleaning solutions to aid our valuable
                customers to sustain a germ-free clean and tidy environment!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 3rd section */}
      <div className="flex flex-col 2xl:mx-60 xl:mx-40 md:mx-12 sm:mx-20 mx-10">
        <div className="flex text-wrap justify-center 2xl:mb-[2%] lg:mb-10 mb-2 sm:mx-20 ">
          <p className="text-[#003047] text-center text-sm sm:text-base lg:text-lg">
            With over 10 years of treasured experience, unvarying commitment,
            and through our proven organizational skills and our customers'
            satisfaction, delivering Facility Management & Cleaning services Our
            Staff is well trained and monitored by supervisors regularly to
            ensure the Quality, Standards and Reliability of our Services.
          </p>
        </div>
        <div className="flex text-wrap justify-center 2xl:my-6 lg:my-10 my-2 sm:mx-20 ">
          <p className="text-[#003047] text-center text-sm sm:text-base lg:text-lg">
            At Pure Hope Floor Care Services, we provide professional floor
            restoration, polishing, sealing and coating services. In Nutshell,
            we covered all floor care services. Our staff is well trained and
            monitored by supervisors regularly to ensure the quality standard
            and reliability of our services. On top of that, we have latest
            innovative machinery. With over 10 years of experience and
            unwavering commitment, we deliver top-notch Floor Care Services.
          </p>
        </div>
        <div className="flex text-wrap justify-center 2xl:my-6 lg:my-10 my-2 sm:mx-20 ">
          <p className="text-[#003047] text-center text-sm sm:text-base lg:text-lg">
            Pure Hope Floor care services are recognized by many leading
            companies, enhancing work environments and increasing productivity
            over a period of time, while delivering outstanding finishes. We
            continue to improve and adapt to our clients changing and evolving
            needs. We provide on ourselves on our unrivalled retention rate with
            our clients, through the development of strong relationships based
            on high quality services, communication and accountability.
          </p>
        </div>
      </div>
      {/* our mission card */}
      <div className=" flex flex-col sm:w-[54%] w-[80%] mx-auto border-4 border-[#219EBC] py-8 px-6 rounded-xl mt-10 transform transition-transform duration-300 lg:hover:scale-105 shadow-[0_8px_20px_rgba(8,47,73,0.5)]">
        <div className="flex justify-start mb-6">
          <h1 className=" lg:text-2xl sm:text-2xl text-xl  font-bold text-[#003047]">
            Our <span className="text-[#219EBC] font-normal">Mission</span>
          </h1>
        </div>
        <div>
          <p className="text-[#003047] font-semibold sm:text-base text-sm">
            {" "}
            "To provide exceptional facility management services that ensure
            safe, efficient, and sustainable environments, delivering value and
            peace of mind to our clients through innovative solutions and a
            dedicated, professional team."
          </p>
        </div>
      </div>
      {/* our vision card */}
      <div className=" flex flex-col sm:w-[54%] w-[80%] mx-auto border-4 border-[#219EBC] py-8 px-6 rounded-xl mt-10 transform transition-transform duration-300 lg:hover:scale-105 shadow-[0_8px_20px_rgba(8,47,73,0.5)]">
        <div className="flex justify-end mb-6 ">
          <h1 className=" lg:text-2xl sm:text-2xl text-xl  font-bold text-[#003047]">
            Our <span className="text-[#219EBC] font-normal">Vision</span>
          </h1>
        </div>
        <div className="">
          <p className="text-[#003047] text-right font-semibold sm:text-base text-sm">
            "To be the leading provider of facility management services,
            recognized for our unwavering commitment to excellence, innovation,
            and sustainability. We envision a future where every space we manage
            enhances the well-being and productivity of its occupants, setting
            new standards in quality and care."
          </p>
        </div>
      </div>
      {/* why choose us */}
      <div className="flex flex-col justify-center my-20">
        {/* title */}
        <div className="">
          <h1 className="text-center lg:text-3xl sm:text-2xl text-xl  font-semibold text-[#003047]">
            Why Clients Choose
          </h1>
        </div>
        <div>
          <h1 className="text-center lg:text-2xl sm:text-xl text-lg text-[#219EBC]">
            Pure Hope Facility Management Business
          </h1>
        </div>
      </div>
      <div>
        <WhyChoose />
      </div>
      <div>
        <Brands2 />
      </div>
      <div className="flex items-center justify-center">
        <Footer />
      </div>
    </>
  );
}
