"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  PlusCircle,
  MessageCircle,
  Upload,
  Users2,
  Images,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Textarea } from "@/components/ui/textarea";

import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";
interface Category {
  categoryId: string;
  categoryTitle: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [sliderImg, setSliderImg] = useState<File | null>(null);
  const [desc1, setDesc1] = useState<string>("");
  const [desc2, setDesc2] = useState<string>("");
  const [btntxt, setBtnTxt] = useState<string>("");
  const [btnurl, setBtnUrl] = useState<string>("");
  const [order, setOrder] = useState<string>("");

  const handleSliderImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSliderImg(file); // Set the service image state
    }
  };

  const SliderAdder = async () => {
    setLoading(true);
    const formDataToSend = new FormData();

    formDataToSend.append("desc1", desc1);
    formDataToSend.append("desc2", desc2);
    formDataToSend.append("buttonText", btntxt);
    formDataToSend.append("buttonLink", btnurl);
    formDataToSend.append("image", sliderImg as File);
    formDataToSend.append("order", order);

    try {
      const response = await fetch(`/admin/api/slides`, {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        console.log("Slider added successfully");
      } else {
        console.error("Failed to add Slider");
      }
    } catch (error) {
      console.error("Error adding Slide:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/home"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Admin Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Admin Home</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/quotes"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customer Quotations</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customer Quoations</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/inquiries"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">Inquiries</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Inquiries</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/addfeedback"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="sr-only">Feedbacks</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Feedbacks</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/addslide"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Images className="h-5 w-5" />
                  <span className="sr-only">Slider Images</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Slider Images</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="/admin/home"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Admin Home</span>
                </Link>
                <Link
                  href="/admin/quotes"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customer Quotations</span>
                </Link>
                <Link
                  href="/admin/inquiries"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">Inquiries</span>
                </Link>
                <Link
                  href="/admin/addfeedback"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="sr-only">Feedbacks</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
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
                  <Link href="#">Add Slider Images</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/*
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          */}
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => {
                  router.push(`/admin/home`);
                }}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Add Home Page slider images
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

                <Button onClick={SliderAdder} disabled={loading} className="">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding slider....
                    </>
                  ) : (
                    "Add Slide"
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
                        <Label htmlFor="name">
                          {"Primary Text for the Slider"}
                        </Label>
                        <Input
                          id="t1"
                          type="text"
                          className="w-full"
                          placeholder="primary text"
                          value={desc1}
                          onChange={(e) => setDesc1(e.target.value)}
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
                          value={desc2}
                          onChange={(e) => setDesc2(e.target.value)}
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
                    <CardTitle>Slide Image Here</CardTitle>
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

              <Button onClick={SliderAdder} disabled={loading} className="">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Feedback....
                  </>
                ) : (
                  "Add Feedback"
                )}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
