"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Upload, Loader2 } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

interface SlideItem {
  Order: number;
  image: string;
  title1: string;
  title2: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}
export default function Dashboard() {
  const router = useRouter();
  const [sliderData, setSliderData] = useState<SlideItem>();
  const [loading, setLoading] = useState<boolean>(false);
  const [sliderImg, setSliderImg] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState<string>("");
  const [title1, setTitle1] = useState<string>("");
  const [title2, setTitle2] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [btntxt, setBtnTxt] = useState<string>("");
  const [btnurl, setBtnUrl] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [slideId, setSlideId] = useState<string | null>(null);

  const handleSliderImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSliderImg(file); // Set the service image state
    }
  };

  const fetchSlideDetails = async (slideId: number | null) => {
    if (!slideId) return;
    try {
      const response = await fetch(`/admin/api/slides/one/${slideId}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setSliderData(data.slideData);
        setTitle1(data.slideData.title1);
        setTitle2(data.slideData.title2);
        setDesc(data.slideData.description);
        setBtnTxt(data.slideData.buttonText);
        setBtnUrl(data.slideData.buttonLink);
        setOrder(data.slideData.Order.toString());
        setPrevImg(data.slideData.image);
      } else {
        console.error("Failed to fetch service details");
      }
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSlideId(searchParams.get("slid"));
    if (searchParams.get("slid")) {
      fetchSlideDetails(parseInt(searchParams.get("slid") as string, 10));
    }
  }, []);

  const SlideUpdater = async () => {
    setLoading(true);
    const formDataToSend = new FormData();

    formDataToSend.append("slideId", slideId as string);
    formDataToSend.append("title1", title1);
    formDataToSend.append("title2", title2);
    formDataToSend.append("desc", desc);
    formDataToSend.append("buttonText", btntxt);
    formDataToSend.append("buttonLink", btnurl);
    formDataToSend.append("image", sliderImg as File);
    formDataToSend.append("order", order);
    formDataToSend.append("prevImg", prevImg);

    try {
      const response = await fetch("/admin/api/slides", {
        method: "PUT",
        body: formDataToSend,
      });
      if (response.ok) {
        console.log("Service updated successfully");
        setTimeout(() => {
          router.push("/admin/slidemanager");
        }, 2000);
      } else {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.message || "Failed to update service";
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating service:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="mt-2 ml-8 mb-8">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/home">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/slidemanager">Slider Manager</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Edit Slider</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* ... (rest of the JSX remains the same) ... */}
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => {
                router.push(`/admin/slidemanager`);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Edit Slider
            </h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push(`/admin/home`);
                }}
              >
                Discard
              </Button>

              <Button onClick={SlideUpdater} disabled={loading} className="">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Slide....
                  </>
                ) : (
                  "Update Slide"
                )}
              </Button>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex w-full">
              <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                <CardHeader>
                  <CardTitle></CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name" className="flex flex-col gap-2">
                        <p> {"Primary Text for the Slider"}</p>
                        <p>
                          {" "}
                          {
                            "(Note: Keep this empty if you need only 2 lines for Topic and Description)"
                          }{" "}
                        </p>
                      </Label>
                      <Input
                        id="t1"
                        type="text"
                        className="w-full"
                        placeholder="primary text"
                        value={title1}
                        onChange={(e) => setTitle1(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">
                        {"Secondary Text for the Slider"}
                      </Label>
                      <Input
                        id="t1"
                        type="text"
                        className="w-full"
                        placeholder="secondary text"
                        value={title2}
                        onChange={(e) => setTitle2(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">
                        {"Description for the Slider"}
                      </Label>
                      <Input
                        id="t1"
                        type="text"
                        className="w-full"
                        placeholder="description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="description">
                        {"Text to appear on Button"}
                      </Label>
                      <Input
                        id="t1"
                        type="text"
                        className="w-full"
                        placeholder="button text"
                        value={btntxt}
                        onChange={(e) => setBtnTxt(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">
                        {"Url to redirect when button clicked"}
                      </Label>
                      <Input
                        id="t1"
                        type="text"
                        className="w-full"
                        placeholder="url "
                        value={btnurl}
                        onChange={(e) => setBtnUrl(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">{"Slide Order"}</Label>
                      <Input
                        id="t1"
                        type="number"
                        className="w-full"
                        placeholder="order"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              {/* Service Image Uploader */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>new slide Image Here</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 gap-2">
                      {sliderImg && (
                        <div className="flex aspect-square w-full items-center justify-center rounded-md border">
                          <Image
                            src={URL.createObjectURL(sliderImg)} // Preview uploaded service image
                            alt="Service Image"
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                        </div>
                      )}
                      {!sliderImg && (
                        <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleSliderImageUpload} // Handle service image upload
                          />
                          <span className="sr-only">Upload Slide Image</span>
                        </label>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Current Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex aspect-square w-full items-center justify-center rounded-md border">
                        <Image
                          src={prevImg} // Preview uploaded service image
                          alt="Service Image"
                          width={150}
                          height={150}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                router.push(`/admin/home`);
              }}
            >
              Discard
            </Button>

            <Button onClick={SlideUpdater} disabled={loading} className="">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Slide....
                </>
              ) : (
                "Update Slide"
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
