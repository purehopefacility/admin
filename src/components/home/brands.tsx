'use client'
import { motion } from 'framer-motion'


const Brands = () => {
  const logos = [
    { src: '/images/home/tullem.png', alt: 'logo1' },
    { src: '/images/home/my dsp.png', alt: 'logo2' },
    { src: '/images/home/oakl.png', alt: 'logo3' },
  ];
  
  return (
    // Add all new brands
   <div className="flex justify-center w-full  ">
    <div className=" mx-10 my-8 overflow-hidden md:w-1/2 lg:w-1/3">
        {/*Animatoin Container*/}
      <motion.div  className="flex items-center gap-4 sm:gap-4"
      animate= {{x: [0, -535],
      transition: {x: {repeat: Infinity,repeatType: "loop",duration: 20,ease: "linear",repeatDelay:0, },},
             }}>
        {/*Images mapping*/}
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-[100px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[120px] lg:h-[150px] mx-4 ">
            <img src={logo.src} alt={logo.alt} className="object-contain w-full h-full" />
          </div>
        ))}
      </motion.div>
    </div>
  </div>
  );
}

export default Brands