"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  MessageCircle,
  Images,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/auth";

interface categorytype {
  categoryId: string;
  categoryTitle: string;
  categoryOrder: string;
  categoryDesc: string;
}

interface servicetype {
  serviceId: string;
  serviceTitle1: string;
  categoryId: string;
  serviceTitle2: string;
  serviceState: string;
  categoryName: string;
  serviceOrder: string;
}

export default function Dashboard() {
  const [services, setServices] = useState<servicetype[]>([]);
  const [categories, setCategories] = useState<categorytype[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const svc_response = await fetch("/api/services/all");
        if (!svc_response.ok) {
          throw new Error("failed to fetch services");
        }
        const ctg_response = await fetch("/admin/api/getcategoryall");
        if (!ctg_response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const services = await svc_response.json();
        const categories = await ctg_response.json();
        setServices(services.data);
        setCategories(categories.CatgoryData);
        console.log("SERVICE:" + JSON.stringify(services.data));
        console.log("CTG" + JSON.stringify(categories.CatgoryData));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchServices();
  }, [loading]);

  const updateServiceOrder = async (serviceId: string, newOrder: number) => {
    const previousServices = [...services];
    const updatedServices = services.map((service) => {
      if (service.serviceId === serviceId) {
        return { ...service, serviceOrder: String(newOrder) };
      }
      if (
        Number(service.serviceOrder) >= newOrder &&
        service.serviceId !== serviceId
      ) {
        return {
          ...service,
          serviceOrder: String(Number(service.serviceOrder) + 1),
        };
      }
      return service;
    });

    setServices(
      updatedServices.sort(
        (a, b) => Number(a.serviceOrder) - Number(b.serviceOrder),
      ),
    );

    try {
      const currentService = services.find(
        (svc) => svc.serviceId === serviceId,
      );
      if (!currentService) throw new Error("Service not found");

      const response = await fetch(
        `/api/services/update/order?id=${serviceId}&order=${newOrder}&ctgid=${currentService.categoryId}&type=svc`,
        { method: "PUT" },
      );

      if (!response.ok) throw new Error("Failed to update service order");
    } catch (err) {
      console.error("Error updating service order:", err);
      setServices(previousServices);
      setError("Failed to update service order. Please try again.");
      setDialogOpen(true);
    }
  };

  const StateUpdater = async (type: string, id: string, state: string) => {
    if (type === "svc") {
      // setServices((prevServices: servicetype[]) =>
      //   prevServices.map((service: servicetype) =>
      //     service.serviceId === id
      //       ? { ...service, serviceState: newState }
      //       : service,
      //   ),
      // );

      try {
        const response = await fetch(
          `/admin/api/update/status?id=${id}&type=svc&state=${state}`,
          {
            method: "PUT",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to update service status");
        }
      } catch (err) {
        console.error("Error updating service status:", err);

        // Revert the optimistic update if the request fails
        // setServices((prevServices) =>
        //   prevServices.map((service) =>
        //     service.serviceId === id
        //       ? { ...service, serviceState: state }
        //       : service,
        //   ),
        // );

        setError("Error updating service status. Please try again.");
        setDialogOpen(true);
      }
    }
  };

  const Deleter = async (type: string, id: number) => {
    if (type === "svc") {
      try {
        const response = await fetch(`/admin/api/delete?id=${id}&type=svc`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete service");
        }
      } catch (err) {
        console.error("Error deleting service:", err);

        setError("Error deleting service. Please try again.");
        setDialogOpen(true);
      }
    } else if (type === "ctg") {
      const prevCategories = [...categories];
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.categoryId !== id),
      );

      try {
        const response = await fetch(`/admin/api/delete?id=${id}&type=ctg`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete category");
        }
      } catch (err) {
        console.error("Error deleting category:", err);
        setCategories(prevCategories);

        setError("Error deleting category. Please try again.");
        setDialogOpen(true);
      }
    }
  };

  //   const Deleter = async (type: string, id: string) => {
  //     try {
  //       if (type == "svc") {
  //         const response = await fetch(`/admin/api/delete?id=${id}&type=svc`, {
  //           method: "DELETE",
  //         });
  //         if (!response.ok) {
  //           throw new Error("Failed to delete service");
  //         }
  //       } else {
  //         const response = await fetch(`/admin/api/delete?id=${id}&type=ctg`, {
  //           method: "DELETE",
  //         });
  //         if (!response.ok) {
  //           throw new Error("Failed to delete category");
  //         }
  //       }

  //       setLoading(!loading);
  //     } catch (err) {
  //       setLoading(!loading);
  //     }
  //   };

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
                  href="/admin/slidemanager"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Images className="h-5 w-5" />
                  <span className="sr-only">Slide Manager</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Slide Manager</TooltipContent>
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
                  href="/admin/slidemanager"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Images className="h-5 w-5" />
                  <span className="sr-only">Slide Manager</span>
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
                  <Link href="#">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/*
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
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
          <Tabs defaultValue="services">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="categories">Service Categories</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => {
                    router.push("/admin/addservice");
                  }}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Service
                  </span>
                </Button>
                <Button
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => {
                    router.push("/admin/addcategory");
                  }}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Service Catgory
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="categories">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Service Categories</CardTitle>
                  <CardDescription>
                    Manage your service Categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Title
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Order
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Description
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((ctg: categorytype) => (
                        <TableRow>
                          <TableCell className="font-medium">
                            {ctg.categoryId}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Active</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {ctg.categoryTitle}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {ctg.categoryOrder}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {ctg.categoryDesc}
                          </TableCell>

                          <TableCell>
                            <TableCell className="flex gap-2">
                              <Button
                                className="px-4 py-2 bg-red-500"
                                onClick={() => {
                                  Deleter("ctg", ctg.categoryId);
                                  setCategories((prevState) => {
                                    return prevState.filter(
                                      (item) =>
                                        item.categoryId != ctg.categoryId,
                                    );
                                  });
                                }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  {/* <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div> */}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="services">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Services List</CardTitle>
                  <CardDescription>Manage your services here</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Category
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Order
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    {/* <TableBody>
                      {services.map((service: servicetype) => (
                        <TableRow>
                          <TableCell className="font-medium">
                            {`${service.serviceTitle1} - ${service.serviceTitle2}`}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {service.serviceState}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {service.categoryName}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {service.serviceOrder}
                          </TableCell>

                          <TableCell className="flex gap-2">
                            <Button
                              className="px-4 py-2 bg-blue-500"
                              onClick={() => {
                                router.push(
                                  `/admin/updateservice?sid=${service.serviceId}&service=${service.serviceTitle1 + " " + service.serviceTitle2}`,
                                );
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className="px-4 py-2 bg-orange-500"
                              onClick={() => {
                                StateUpdater(
                                  "svc",
                                  service.serviceId,
                                  service.serviceState == "active"
                                    ? "suspended"
                                    : "active",
                                );
                              }}
                            >
                              {service.serviceState == "active"
                                ? "suspend"
                                : "activate"}
                            </Button>
                            <Button
                              className="px-4 py-2 bg-red-500"
                              onClick={() => {
                                Deleter("svc", service.serviceId);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody> */}
                    <TableBody>
                      {services
                        .sort(
                          (a, b) =>
                            Number(a.serviceOrder) - Number(b.serviceOrder),
                        )
                        .map((service: servicetype) => (
                          <TableRow key={service.serviceId}>
                            <TableCell className="font-medium">
                              {`${service.serviceTitle1} - ${service.serviceTitle2}`}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {service.serviceState}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {service.categoryName}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Input
                                type="number"
                                min="1"
                                value={service.serviceOrder}
                                onChange={(e) => {
                                  const newOrder = parseInt(e.target.value);
                                  if (!isNaN(newOrder) && newOrder > 0) {
                                    updateServiceOrder(
                                      service.serviceId,
                                      newOrder,
                                    );
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell className="flex gap-2">
                              <Button
                                className="px-4 py-2 bg-blue-500"
                                onClick={() => {
                                  router.push(
                                    `/admin/updateservice?sid=${service.serviceId}&service=${service.serviceTitle1} ${service.serviceTitle2}`,
                                  );
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                className="px-4 py-2 bg-orange-500"
                                onClick={() => {
                                  StateUpdater(
                                    "svc",
                                    service.serviceId,
                                    service.serviceState === "active"
                                      ? "suspended"
                                      : "active",
                                  );
                                  setServices((prevState) => {
                                    return prevState.map((svc) => {
                                      if (svc.serviceId === service.serviceId) {
                                        return {
                                          ...svc,
                                          serviceState:
                                            service.serviceState === "active"
                                              ? "suspended"
                                              : "active",
                                        };
                                      }
                                      return svc;
                                    });
                                  });
                                }}
                              >
                                {service.serviceState === "active"
                                  ? "Suspend"
                                  : "Activate"}
                              </Button>
                              <Button
                                className="px-4 py-2 bg-red-500"
                                onClick={() => {
                                  Deleter("svc", service.serviceId);
                                  setServices((prevState) => {
                                    return prevState.filter(
                                      (item) =>
                                        item.serviceId != service.serviceId,
                                    );
                                  });
                                }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  {/* <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div> */}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
