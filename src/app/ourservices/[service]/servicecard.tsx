import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

interface ServiceCardProp {
  imgPath: string;
  title: string;
  alt: string;
  href: number;
}

export default function ServiceCard({ imgPath, title, alt, href }: ServiceCardProp) {
  return (
    <Link href={`${href}`} >
      <div className=" max-w-sm overflow-hidden rounded-lg transform transition-transform duration-300 lg:hover:scale-105">
        <img className="w-full h-64 object-cover rounded-lg" src={`${imgPath}`} alt={alt} />
        <div className="px-6 py-2 flex flex-row items-center justify-between gap-2">
          <div className="flex">
            <h1 className="text-lg font-medium text-[#003047]" >{title}</h1>
          </div>
          <div className="flex">
            <button className="bg-[#003047] text-white flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#219EBC]">
              <ArrowUpRightIcon className="w-5 h-5 flex" />
            </button>
          </div>
        </div>
      </div>
    </Link>

  )
}