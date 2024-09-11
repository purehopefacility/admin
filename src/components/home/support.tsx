import React from 'react'

export default function Support() {
  return (
    <div className='h-full w-full bg-center bg-cover bg-no-repeat bg-[url(/images/home/support3.jpg)] mt-20 mb-20'>
    <div className='flex flex-col h-full justify-center px-4 sm:px-[12%] my-[10%] sm:items-start items-center'>
        <div className='flex mb-6 sm:mb-10 mt-6 sm:mt-10'>
            <h1 className='text-white text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-5xl font-semibold text-center sm:text-left' style={{ textShadow: '6px 4px 6px rgba(0, 0, 0, 0.5)' }}>We Support All</h1>
        </div>
        <div className='mt-2 sm:mt-[-20px]'>
            <p className='text-white flex flex-wrap items-center justify-center sm:justify-start text-xs sm:text-sm md:text-base lg:text-lg font-semibold gap-1' style={{ textShadow: '6px 4px 6px rgba(0, 0, 0, 0.5)' }}>
                PARTNER WITH : 
                <img src="/images/home/support1.jpg" alt="" className='mx-1 sm:mx-2 inline-block h-4 sm:h-6 w-auto'/>
                REGISTERED DIS PROVIDER
            </p>
        </div>
        <div className='w-full flex justify-center sm:justify-start mt-3'>
            <img src="/images/home/support2.png" alt="" className='w-auto h-16 sm:h-20 md:h-24 lg:h-28'/>
        </div>
    </div>
</div>
)
  
}
