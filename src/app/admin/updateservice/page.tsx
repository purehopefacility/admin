"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import { signOut } from "next-auth/react";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
interface Category {
  categoryId: string;
  categoryTitle: string;
}

interface ServiceDetails {
  serviceId: number;
  serviceTitle_1: string;
  serviceTitle_2: string;
  serviceDesc: string;
  serviceCategory: string;
  serviceOrder: string;
  serviceImg: string;
  coverImg: string;
}

export default function Dashboard() {
  const [sid, setSid] = useState<string | null>(null);
  const [sname, setSname] = useState<string | null>(null);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [order, setOrder] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [serviceImage, setServiceImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [serviceDetails, setServiceDetails] = useState<ServiceDetails | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSid(searchParams.get("sid"));
    setSname(searchParams.get("service"));
    fetchCategories();
    if (searchParams.get("sid")) {
      fetchServiceDetails(searchParams.get("sid"));
    }
  }, []);

  const fetchServiceDetails = async (serviceId: string | null) => {
    if (!serviceId) return;
    try {
      const response = await fetch(`/api/services/one/${serviceId}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServiceDetails(data);
        console.log("oneservice" + JSON.stringify(data));
        // Update state variables with fetched data
        setCategory(String(data.ServiceCategoryId));
        setTitle1(data.serviceTitle_1);
        setTitle2(data.serviceTitle_2);
        setOrder(data.serviceOrder);
        setDescription(data.serviceDesc);
        // setCategory(data.serviceCategory);
      } else {
        console.error("Failed to fetch service details");
      }
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/admin/api/getcategoryall");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCategories(data.CatgoryData);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleServiceImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setServiceImage(file);
    }
  };

  const handleCoverImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const Updater = async () => {
    const formDataToSend = new FormData();

    formDataToSend.append("serviceId", String(sid));
    formDataToSend.append("serviceTitle_1", title1);
    formDataToSend.append("serviceTitle_2", title2);
    formDataToSend.append("serviceCategory", category);
    formDataToSend.append("serviceOrder", order);
    formDataToSend.append("serviceDesc", description);

    if (serviceImage) {
      formDataToSend.append("serviceImg", serviceImage);
    }
    if (coverImage) {
      formDataToSend.append("coverImg", coverImage);
    }

    try {
      const response = await fetch("/admin/api/update/service", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        console.log("Service updated successfully");
        setTimeout(() => {
          router.push("/admin/home");
        }, 2000);
      } else {
        const errorResponse = await response.json();
        const errorMessage =
          errorResponse.message || "Failed to update service";
        setError(errorMessage);
        setShowErrorDialog(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating service:", error.message);
        setError(error.message || "An unknown error occurred");
        setShowErrorDialog(true);
      } else {
        console.error("Unknown error:", error);
        setError("An unknown error occurred");
        setShowErrorDialog(true);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* ... (rest of the JSX remains the same) ... */}
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft
                className="h-4 w-4"
                onClick={() => {
                  router.push("/admin/home");
                }}
              />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {`Edit Service - ${sname}`}
            </h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push("/admin/home");
                }}
              >
                Discard
              </Button>
              <Button size="sm" onClick={Updater}>
                Update Service
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Edit</CardTitle>
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
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <ReactQuill
                        value={description}
                        onChange={setDescription}
                      />
                    </div>
                    <div className="grid gap-3 mt-8">
                      <Label htmlFor="description">Service New Order</Label>
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

                      <Select
                        value={category}
                        onValueChange={(value) => setCategory(value)}
                      >
                        <SelectTrigger
                          id="category"
                          aria-label="Select category"
                        >
                          <SelectValue placeholder="Select category">
                            {categories.find(
                              (cat) => cat.categoryId === Number(category),
                            )?.categoryTitle || "Select category"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem
                              key={cat.categoryId}
                              value={String(cat.categoryId)}
                            >
                              {cat.categoryTitle}
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
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Service Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>Service Image</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 gap-2">
                            {(serviceImage || serviceDetails?.serviceImg) && (
                              <div className="flex aspect-square w-full items-center justify-center rounded-md border">
                                <Image
                                  src={
                                    serviceImage
                                      ? URL.createObjectURL(serviceImage)
                                      : serviceDetails?.serviceImg || ""
                                  }
                                  alt="Service Image"
                                  width={100}
                                  height={100}
                                  className="object-cover"
                                />
                              </div>
                            )}

                            {!(serviceImage || serviceDetails?.serviceImg) ? (
                              <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleServiceImageUpload}
                                />
                                <span className="sr-only">
                                  Upload Service Image
                                </span>
                              </label>
                            ) : null}
                          </div>
                        </div>
                        {/* service image new code */}
                        {/* <div className="grid gap-2">
                        <div className="grid grid-cols-3 gap-2">
                            {(serviceImage || serviceDetails?.serviceImg) && (
                            <div className="flex aspect-square w-full items-center justify-center rounded-md border">
                                <Image
                                src={serviceImage ? URL.createObjectURL(serviceImage) : serviceDetails?.serviceImg || ""}
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
                                onChange={handleServiceImageUpload}
                            />
                            <span className="sr-only">Upload Service Image</span>
                            </label>
                        </div>
                        </div> */}
                      </CardContent>
                    </Card>
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>Cover Image</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 gap-2">
                            {(coverImage || serviceDetails?.coverImg) && (
                              <div className="flex aspect-square w-full items-center justify-center rounded-md border">
                                <Image
                                  src={
                                    coverImage
                                      ? URL.createObjectURL(coverImage)
                                      : serviceDetails?.coverImg || ""
                                  }
                                  alt="Cover Image"
                                  width={100}
                                  height={100}
                                  className="object-cover"
                                />
                              </div>
                            )}
                            {!(coverImage || serviceDetails?.coverImg) ? (
                              <label className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleCoverImageUpload}
                                />
                                <span className="sr-only">
                                  Upload Cover Image
                                </span>
                              </label>
                            ) : null}
                          </div>
                        </div>
                        {/* coverimage new code  */}
                        {/* <div className="grid gap-2">
                            <div className="grid grid-cols-3 gap-2">
                                {(coverImage || serviceDetails?.serviceCoverImg) && (
                                <div className="flex aspect-square w-full items-center justify-center rounded-md border">
                                    <Image
                                    src={coverImage ? URL.createObjectURL(coverImage) : serviceDetails?.serviceCoverImg || ""}
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
                                    onChange={handleCoverImageUpload}
                                />
                                <span className="sr-only">Upload Cover Image</span>
                                </label>
                            </div>
                            </div> */}
                      </CardContent>
                    </Card>
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
                router.push("/admin/home");
              }}
            >
              Discard
            </Button>
            <Button size="sm" onClick={Updater}>
              Update Service
            </Button>
          </div>
        </div>
      </main>
      {showErrorDialog && (
        <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>
                {error
                  ? error
                  : "An error occurred while updating the service."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowErrorDialog(false)}>
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
