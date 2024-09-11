'use client'
import { motion } from 'framer-motion'

const Brands2 = () => {
  const logos = [
    { src: '/images/home/About Us Page-03.jpg', alt: 'logo1' },
    { src: '/images/home/About Us Page-04.jpg', alt: 'logo2' },
    { src: '/images/home/About Us Page-05.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-06.jpg', alt: 'logo2' },
    { src: '/images/home/About Us Page-07.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-08.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-09.jpg', alt: 'logo2' },
    { src: '/images/home/About Us Page-10.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-11.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-12.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-13.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-14.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-15.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-16.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-17.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-18.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-19.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-20.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-21.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-22.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-23.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-24.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-25.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-26.jpg', alt: 'logo3' }, 
    { src: '/images/home/About Us Page-27.jpg', alt: 'logo3' },
    { src: '/images/home/About Us Page-28.jpg', alt: 'logo3' },
    
  ];

  return (
    <div className="w-full my-8 overflow-hidden ">
        <div className='justify-center items-center flex m-10 gap-5'>
        <span className='text-xl  font-bold text-[#003047]'>Supply of <span className='text-xl  font-medium text-[#219EBC]'>  Consumables</span></span>
        </div>
        {/*Animatoin Container*/}
      <motion.div  className="flex items-center "
      animate= {{x: [0, -4035],
      transition: {x: {repeat: Infinity,repeatType: "loop",duration: 80,ease: "linear",repeatDelay:0, },},
             }}>
        {/*Images mapping*/}
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-[200px] h-[140px] mx-4 border-[1px] border-gray-300 rounded-md">
            <img src={logo.src} alt={logo.alt} className="object-contain w-full h-full " />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Brands2