"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  Upload,
  Users2,
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
import {auth} from "@/auth";
import { signOut } from "next-auth/react";
import JoditEditor from "jodit-react";
interface Category {
  categoryId: string;
  categoryTitle: string;
}
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  initialValue?: string;
}

export default function Dashboard() {
  //const searchParams = useSearchParams();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [order, setOrder] = useState("");
  const [category, setCategory] = useState("");
  const [serviceImage, setServiceImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");

  const handleServiceImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setServiceImage(file); // Set the service image state
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/admin/api/getcategoryall");
      if (response.ok) {
        const data = await response.json();
        setCategories(data.CatgoryData);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle cover image upload
  const handleCoverImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file); // Set the cover image state
    }
  };

  const Updater = async () => {
    const formDataToSend = new FormData();

    formDataToSend.append("serviceTitle_1", title1);
    formDataToSend.append("serviceTitle_2", title2);
    formDataToSend.append("serviceCategory", category);
    formDataToSend.append("serviceOrder", order);
    formDataToSend.append(
      "serviceDesc",
      //draftToHtml(convertToRaw(formData.description.getCurrentContent())),
      content,
    );

    formDataToSend.append("serviceImg", serviceImage as File);
    formDataToSend.append("coverImg", coverImage as File);

    try {
      const response = await fetch(`/admin/api/addservice`, {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        console.log("Service created successfully");

        setTimeout(() => {
          router.push("/admin/home");
        }, 2000); // Navigate back to the service list
      } else {
        console.error("Failed to create service");
      }
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };
  // const Updater = () => {
  //   console.log("Title 1:", title1);
  //   console.log("Title 2:", title2);
  //   console.log("Order:", order);
  //   console.log("Description:", description);
  //   console.log("Category:", category);

  //   // Log the service image (check if an image is uploaded)
  //   if (serviceImage) {
  //     console.log("Service Image:", serviceImage.name); // Logs the file name of the image
  //   } else {
  //     console.log("Service Image: No image uploaded");
  //   }

  //   // Log the cover image (check if an image is uploaded)
  //   if (coverImage) {
  //     console.log("Cover Image:", coverImage.name); // Logs the file name of the image
  //   } else {
  //     console.log("Cover Image: No image uploaded");
  //   }
  // };
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
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
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
                  <Link href="#">Add Service</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div> */}
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
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                Add Service
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
                <Button size="sm" onClick={Updater}>
                  Add Service
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Add</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Service Titles</Label>
                        <Input
                          id="t1"
                          type="text"
                          className="w-full"
                          placeholder="service title 1"
                          value={title1}
                          onChange={(e) => setTitle1(e.target.value)}
                        />
                        <Input
                          id="t2"
                          type="text"
                          className="w-full"
                          placeholder="service title 2"
                          value={title2}
                          onChange={(e) => setTitle2(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-3 mb-10">
                        <Label htmlFor="description">Description</Label>
                        {/* App Error */}
                        {/* <Textarea */}
                        {/*   id="description" */}
                        {/*   value={description} */}
                        {/*   className="min-h-32" */}
                        {/*   onChange={(e) => setDescription(e.target.value)} */}
                        {/* /> */}
                        <ReactQuill value={content} onChange={setContent} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Service Order</Label>
                        <Input
                          id="order"
                          type="text"
                          className="w-full"
                          placeholder="Order Number"
                          value={order}
                          onChange={(e) => setOrder(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={(value) => setCategory(value)}>
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ctg">
                              Select a category
                            </SelectItem>

                            {categories.map((category) => (
                              <SelectItem
                                key={category.categoryId}
                                value={category.categoryId}
                              >
                                {category.categoryTitle}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Service Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                      {/* Service Image Uploader */}
                      <Card className="overflow-hidden">
                        <CardHeader>
                          <CardTitle>Service Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 gap-2">
                              {serviceImage && (
                                <div className="flex aspect-square w-full items-center justify-center rounded-md border">
                                  <Image
                                    src={URL.createObjectURL(serviceImage)} // Preview uploaded service image
                                    alt="Service Image"
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                  />
                                </div>
                              )}

                              <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleServiceImageUpload} // Handle service image upload
                                />
                                <span className="sr-only">
                                  Upload Service Image
                                </span>
                              </label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Cover Image Uploader */}
                      <Card className="overflow-hidden">
                        <CardHeader>
                          <CardTitle>Cover Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 gap-2">
                              {coverImage && (
                                <div className="flex aspect-square w-full items-center justify-center rounded-md border">
                                  <Image
                                    src={URL.createObjectURL(coverImage)} // Preview uploaded cover image
                                    alt="Cover Image"
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                  />
                                </div>
                              )}

                              <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleCoverImageUpload} // Handle cover image upload
                                />
                                <span className="sr-only">
                                  Upload Cover Image
                                </span>
                              </label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Add Service</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
