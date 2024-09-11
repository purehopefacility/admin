import Link from 'next/link';

export default function OPH() {
    return (
        <div className="flex flex-col content-end">
            <div className="flex w-full items-end justify-center h-64 mb-10 relative bg-cover bg-center bg-blue-700" style={{ backgroundImage: "url('/images/home/policy background.png')" }}>
                <div className="absolute md:w-3/4 w-[84%] h-1/2 bottom-[-20%] p-2 rounded-t-lg bg-white flex justify-center items-center">
                    <h1 className="text-[#219EBC] text-2xl"><span className="font-bold text-[#003047]">OPH </span> Policy</h1>
                </div>
            </div>
            {/* card section */}
            <div className="flex justify-center">
                {/* grid layout */}
                <div className="grid lg:grid-cols-3 gap-4 p-10 grid-cols-1">
                    {/* first image */}
                    <Link href="/ophpolicy/OHSpolicy" >
                        <div className="flex flex-col max-w-xs transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                            <div className="flex">
                                <img src="images/home/OPH policy.png" alt="OHS Policy" className="max-w-full" />
                            </div>
                            <div className="flex pt-2 pl-2">
                                <h2 className="text-wrap truncate overflow-hidden text-ellipsis font-semibold">
                                    Occupational Health & Safety (OHS) Policy
                                </h2>
                            </div>
                        </div>
                    </Link>
                    {/* second image */}
                    <Link href="/ophpolicy/QApolicy">
                        <div className="flex flex-col max-w-xs transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                            <div>
                                <img src="images/home/OPH policy2.png" alt="Quality Assurance Policy" className="max-w-full" />
                            </div>
                            <div className="flex pt-2 pl-2">
                                <h2 className="font-semibold">Quality Assurance Policy</h2>
                            </div>
                        </div>
                    </Link>
                    {/* third image */}
                    <Link href="/ophpolicy/EVpolicy" >
                        <div className="flex flex-col max-w-xs transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                            <div className="flex">
                                <img src="images/home/OPH policy3.png" alt="Environmental Policy" className="max-w-full" />
                            </div>
                            <div className="flex pt-2 pl-2">
                                <h2 className="font-semibold">Environmental Policy</h2>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex w-full justify-center mb-10 ">
                <img src="images/home/certificate.png" alt="" />
            </div>
        </div>
    );
}
