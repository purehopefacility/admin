import type { Metadata } from "next";
import "./globals.css";
import dotenv from "dotenv";
dotenv.config();
import { Poppins } from "next/font/google";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Purehope",
  description: "Pure Hope Facility Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans  items-center justify-center`}
      >
        {/*   <NavBar />*/}
        {children}
        {/*
        <div className="flex items-center justify-center">
            <Footer/>
        </div>
        */}
      </body>
      <GoogleAnalytics gaId="G-XVQLXY2R9K" />
    </html>
  );
}
