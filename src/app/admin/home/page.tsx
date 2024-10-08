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
  categoryId: number;
  categoryTitle: string;
  categoryOrder: string;
  categoryDesc: string;
}

interface servicetype {
  serviceId: number;
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
  const [updatedServiceId, setUpdatedServiceId] = useState<number | null>(null);
  const [updatedOrder, setUpdatedOrder] = useState<number | null>(null);
  const [inputValues, setInputValues] = useState<{[key: number]: string}>({});

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
// const updateServiceOrder = async () => {
//     if (updatedServiceId === null || updatedOrder === null) return;

//     try {
//       // Find the current service in the services array
//       const currentService = services.find(service => service.serviceId === updatedServiceId);
//       if (!currentService) {
//         throw new Error("Service not found");
//       }

//       const response = await fetch(
//         `/admin/api/update/order?id=${updatedServiceId}&order=${updatedOrder}&ctgid=${currentService.categoryId}&type=svc`,
//         { method: "PUT" }
//       );

//       if (!response.ok) throw new Error("Failed to update service order");

//       // If the update was successful, fetch the updated services
//       const updatedServicesResponse = await fetch("/api/services/all");
//       if (!updatedServicesResponse.ok) throw new Error("Failed to fetch updated services");

//       const updatedServices = await updatedServicesResponse.json();
//       setServices(updatedServices.data);
//     } catch (err) {
//       console.error("Error updating service order:", err);
//       setError("Failed to update service order. Please try again.");
//       setDialogOpen(true);
//     }
//   };

const updateServiceOrder = async () => {
    if (updatedServiceId === null || updatedOrder === null) return;

    try {
      const currentService = services.find(service => service.serviceId === updatedServiceId);
      if (!currentService) {
        throw new Error("Service not found");
      }

      const response = await fetch(
        `/admin/api/update/order?id=${updatedServiceId}&order=${updatedOrder}&ctgid=${currentService.categoryId}&type=svc`,
        { method: "PUT" }
      );

      if (!response.ok) throw new Error("Failed to update service order");


      const updatedServicesResponse = await fetch("/api/services/all");
      if (!updatedServicesResponse.ok) throw new Error("Failed to fetch updated services");

      const updatedServices = await updatedServicesResponse.json();
      setServices(updatedServices.data);

      setInputValues(prev => {
        const newValues = {...prev};
        delete newValues[updatedServiceId];
        return newValues;
      });

      setUpdatedServiceId(null);
      setUpdatedOrder(null);
    } catch (err) {
      console.error("Error updating service order:", err);
      setError("Failed to update service order. Please try again.");
      setDialogOpen(true);
    }
  };


//   const handleOrderChange = (serviceId: number, newOrder: string) => {
//     setUpdatedServiceId(serviceId);
//     setUpdatedOrder(newOrder === "" ? null : Number(newOrder));
//   };
const handleOrderChange = (serviceId: number, newValue: string) => {
    setInputValues(prev => ({...prev, [serviceId]: newValue}));

    const newOrder = newValue === "" ? null : Number(newValue);
    setUpdatedServiceId(serviceId);
    setUpdatedOrder(newOrder);
  };

  const StateUpdater = async (type: string, id: number, state: string) => {
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
      try {
        const response = await fetch(`/admin/api/delete?id=${id}&type=ctg`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete category");
        }
      } catch (err) {
        console.error("Error deleting category:", err);

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
                  href="/admin/fbmanager"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="sr-only">Feedbacks</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Feedback Manager</TooltipContent>
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
                  href="/admin/fbmanager"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="sr-only">Feedback Mananger</span>
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
                        <TableHead>#</TableHead>
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
                      {categories.map((ctg: categorytype, index: number) => (
                        <TableRow key={ctg.categoryId}>
                            <TableCell>{index + 1}</TableCell>
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
                      <TableHead>#</TableHead>
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
                    <TableBody>
                      {services
                        .sort(
                          (a, b) =>
                            Number(a.serviceOrder) - Number(b.serviceOrder),
                        )
                        .map((service: servicetype, index: number) => (
                          <TableRow key={service.serviceId}>
                            <TableCell>{index + 1}</TableCell>
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
                            {/* <Input
                                type="text"
                                value={
                                updatedServiceId === service.serviceId && updatedOrder !== null
                                    ? updatedOrder.toString()
                                    : service.serviceOrder
                                }
                                onChange={(e) => handleOrderChange(service.serviceId, e.target.value)}
                            /> */}
                            <Input
                                type="text"
                                value={inputValues[service.serviceId] ?? service.serviceOrder}
                                onChange={(e) => handleOrderChange(service.serviceId, e.target.value)}
                                onBlur={() => {
                                if (inputValues[service.serviceId] === "") {
                                    setInputValues(prev => {
                                    const newValues = {...prev};
                                    delete newValues[service.serviceId];
                                    return newValues;
                                    });
                                    setUpdatedOrder(null);
                                }
                                }}
                            />
                            </TableCell>
                            <TableCell className="flex gap-2">
                            <Button
                          className="px-4 py-2 bg-green-500"
                          onClick={updateServiceOrder}
                          disabled={updatedServiceId !== service.serviceId || updatedOrder === null}
                        >
                          Update Order
                        </Button>
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
