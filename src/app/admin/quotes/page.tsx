"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  PlusCircle,
  Users2,
  MessageCircle,
  Images,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const [quotations, setQuotations] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const quotes_response = await fetch("/admin/api/getquotes");
        if (!quotes_response.ok) {
          throw new Error("failed to fetch services");
        }

        const quotes = await quotes_response.json();
        const sortedQuotations = quotes.QuoteData.sort((a: any, b: any) => {
            return new Date(b.recievedAt).getTime() - new Date(a.recievedAt).getTime();
          });
        // setQuotations(quotes.QuoteData);
        setQuotations(sortedQuotations);

        console.log("Quotes:" + JSON.stringify(quotes.QuoteData));

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch services");
        setLoading(false);
      }
    };
    fetchServices();
  }, []);
  
  const StateUpdater = async (type: string, id: string, state: string) => {
    try {
      if (type == "quote") {
        const svc_response = await fetch(
          `/admin/api/update/status?id=${id}&type=quote&state=${state}`,
          {
            method: "PUT",
          },
        );
        if (!svc_response.ok) {
          throw new Error("failed to update srvice");
        }
      }
    } catch (err) {
      console.log("Error occured un updating state if quote", err);
    }
  };

  const Deleter = async (id: string) => {
    try {
      const response = await fetch(`/admin/api/delete?id=${id}&type=quote`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete quotation");
      }
    } catch (err) {
      console.log("Error occured while deleting quote", err);
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
                  <span className="sr-only">Feedback Manager</span>
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
                  <Link href="/admin/home">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Quotations</BreadcrumbPage>
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
          <Tabs defaultValue="pending">
            <div className="flex items-center">
              <TabsList>
                {/*THere are 4 states here okay */}
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="pending">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Quotations</CardTitle>
                  <CardDescription>
                    All available service quoations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Quotation ID</TableHead>
                        <TableHead>customer</TableHead>
                        <TableHead className="hidden md:table-cell">
                          service
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Note
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          email
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          mobile
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          date
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotations
                        .filter((quote) => quote.status == "pending")
                        .map((quote, index:number) => (
                          <TableRow >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">
                              {quote.quoteId}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              {quote.customerName}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {`${quote.serviceTitle_1} - ${quote.serviceTitle_2}`}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.note}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.email}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.phoneNumber}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.recievedAt}
                            </TableCell>

                            <TableCell>
                              <TableCell className="flex gap-2">
                                <Button
                                  className="px-4 py-2 bg-green-500"
                                  onClick={() => {
                                    StateUpdater(
                                      "quote",
                                      quote.quoteId,
                                      "approved",
                                    );
                                    setQuotations((prevState) => {
                                      return prevState.map((item) => {
                                        if (item.quoteId === quote.quoteId) {
                                          return {
                                            ...item,
                                            status: "approved",
                                          };
                                        }
                                        return item;
                                      });
                                    });
                                  }}
                                >
                                  {quote.status == "approved"
                                    ? "Approved"
                                    : "Approve"}
                                </Button>
                                <Button
                                  className="px-4 py-2 bg-red-500"
                                  onClick={() => {
                                    StateUpdater(
                                      "quote",
                                      quote.quoteId,
                                      "rejected",
                                    );
                                    setQuotations((prevState) => {
                                      return prevState.map((item) => {
                                        if (item.quoteId === quote.quoteId) {
                                          return {
                                            ...item,
                                            status: "rejected",
                                          };
                                        }
                                        return item;
                                      });
                                    });
                                  }}
                                >
                                  {quote.status == "rejected"
                                    ? "Rejected"
                                    : "Reject"}
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">View</Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Quote Details</DialogTitle>
                                      <DialogDescription>
                                        View note and images for quotes{" "}
                                        {quote.quoteId}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <label className="text-right font-medium">
                                          Note:
                                        </label>
                                        <p className="col-span-3">
                                          {quote.note}
                                        </p>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <label className="text-right font-medium">
                                          Images:
                                        </label>
                                        <div className="col-span-3 flex flex-wrap gap-2">
                                          {quote.images &&
                                            quote.images.map(
                                              (
                                                image: string,
                                                index: number,
                                              ) => (
                                                <img
                                                  key={index}
                                                  src={image}
                                                  alt={`Quote image ${index + 1}`}
                                                  className="w-24 h-24 object-cover rounded"
                                                />
                                              ),
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="approved">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Quotations</CardTitle>
                  <CardDescription>
                    {
                      "All available approved service quoations (Note! Once set to completed, Images will be Removed) "
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                      <TableHead>#</TableHead>
                        <TableHead>Quotation ID</TableHead>
                        <TableHead>customer</TableHead>
                        <TableHead className="hidden md:table-cell">
                          service
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Note
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          email
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          mobile
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          date
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotations
                        .filter((quote) => quote.status == "approved")
                        .map((quote, index: number) => (
                          <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">
                              {quote.quoteId}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              {quote.customerName}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {`${quote.serviceTitle_1} - ${quote.serviceTitle_2}`}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.note}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.email}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.phoneNumber}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.recievedAt}
                            </TableCell>

                            <TableCell>
                              <TableCell className="flex gap-2">
                                <Button
                                  className="px-4 py-2 bg-green-500"
                                  onClick={() => {
                                    StateUpdater(
                                      "quote",
                                      quote.quoteId,
                                      "completed",
                                    );
                                    setQuotations((prevState) => {
                                      return prevState.map((item) => {
                                        if (item.quoteId === quote.quoteId) {
                                          return {
                                            ...item,
                                            status: "completed",
                                          };
                                        }
                                        return item;
                                      });
                                    });
                                  }}
                                >
                                  {quote.status == "completed"
                                    ? "Completed"
                                    : "Complete"}
                                </Button>
                                <Button
                                  className="px-4 py-2 bg-red-500"
                                  onClick={() => {
                                    StateUpdater(
                                      "quote",
                                      quote.quoteId,
                                      "rejected",
                                    );
                                    setQuotations((prevState) => {
                                      return prevState.map((item) => {
                                        if (item.quoteId === quote.quoteId) {
                                          return {
                                            ...item,
                                            status: "rejected",
                                          };
                                        }
                                        return item;
                                      });
                                    });
                                  }}
                                >
                                  {quote.status == "rejected"
                                    ? "Rejected"
                                    : "Reject"}
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">View</Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Quote Details</DialogTitle>
                                      <DialogDescription>
                                        View note and images for quotes{" "}
                                        {quote.quoteId}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <label className="text-right font-medium">
                                          Note:
                                        </label>
                                        <p className="col-span-3">
                                          {quote.note}
                                        </p>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <label className="text-right font-medium">
                                          Images:
                                        </label>
                                        <div className="col-span-3 flex flex-wrap gap-2">
                                          {quote.images &&
                                            quote.images.map(
                                              (
                                                image: string,
                                                index: number,
                                              ) => (
                                                <img
                                                  key={index}
                                                  src={image}
                                                  alt={`Quote image ${index + 1}`}
                                                  className="w-24 h-24 object-cover rounded"
                                                />
                                              ),
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="completed">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Quotations</CardTitle>
                  <CardDescription>
                    {
                      "All available completed service quoations (Note: Images have been removed once completed)"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                         <TableHead>#</TableHead>
                        <TableHead>Quotation ID</TableHead>
                        <TableHead>customer</TableHead>
                        <TableHead className="hidden md:table-cell">
                          service
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Note
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          email
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          mobile
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          date
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotations
                        .filter((quote) => quote.status == "completed")
                        .map((quote, index: number) => (
                          <TableRow>
                             <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">
                              {quote.quoteId}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              {quote.customerName}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {`${quote.serviceTitle_1} - ${quote.serviceTitle_2}`}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.note}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.email}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.phoneNumber}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.recievedAt}
                            </TableCell>

                            <TableCell>
                              <TableCell className="flex gap-2">
                                <Button
                                  className="px-4 py-2 bg-red-500"
                                  onClick={() => {
                                    Deleter(quote.quoteId);
                                    setQuotations((prevState) => {
                                      return prevState.filter(
                                        (item) => item.quoteId != quote.quoteId,
                                      );
                                    });
                                  }}
                                >
                                  {"Delete"}
                                </Button>
                                {/*
                                <Button
                                  className="px-4 py-2 bg-green-500"
                                  onClick={() => {
                                    StateUpdater(
                                      "quote",
                                      quote.quoteId,
                                      "approved",
                                    );
                                  }}
                                >
                                  {quote.status == "approved"
                                    ? "Approved"
                                    : "Approve"}
                                </Button>
                                <Button
                                  className="px-4 py-2 bg-red-500"
                                  onClick={() => {
                                    StateUpdater(
                                      "quote",
                                      quote.quoteId,
                                      "rejected",
                                    );
                                  }}
                                >
                                  {quote.status == "rejected"
                                    ? "Rejected"
                                    : "Reject"}
                                </Button>
                                */}
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">View</Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Quote Details</DialogTitle>
                                      <DialogDescription>
                                        View note and images for quotes{" "}
                                        {quote.quoteId}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <label className="text-right font-medium">
                                          Note:
                                        </label>
                                        <p className="col-span-3">
                                          {quote.note}
                                        </p>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <label className="text-right font-medium">
                                          Images:
                                        </label>
                                        <div className="col-span-3 flex flex-wrap gap-2">
                                          {"None after completion"}
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="rejected">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Quotations</CardTitle>
                  <CardDescription>
                    {
                      " All available Rejected service quoations (Note: Images have been removed once Rejected)"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                      <TableHead>#</TableHead>
                        <TableHead>Quotation ID</TableHead>
                        <TableHead>customer</TableHead>
                        <TableHead className="hidden md:table-cell">
                          service
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Note
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          email
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          mobile
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          date
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotations
                        .filter((quote) => quote.status == "rejected")
                        .map((quote, index: number) => (
                          <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">
                              {quote.quoteId}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              {quote.customerName}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {`${quote.serviceTitle_1} - ${quote.serviceTitle_2}`}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.note}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.email}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.phoneNumber}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {quote.recievedAt}
                            </TableCell>

                            <TableCell>
                              <TableCell className="flex gap-2">
                                <Button
                                  className="px-4 py-2 bg-red-500"
                                  onClick={() => {
                                    Deleter(quote.quoteId);
                                    setQuotations((prevState) => {
                                      return prevState.filter(
                                        (item) => item.quoteId != quote.quoteId,
                                      );
                                    });
                                  }}
                                >
                                  {"Delete"}
                                </Button>
                                {/*
                                <Button
                                  className="px-4 py-2 bg-red-500"
                                  onClick={() => {
                                    StateUpdater(
                                      "quote",
                                      quote.quoteId,
                                      "approved",
                                    );
                                  }}
                                >
                                  {quote.status == "approved"
                                    ? "Rejection Recalled"
                                    : "Reapprove"}
                                </Button>
                                */}
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">View</Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Quote Details</DialogTitle>
                                      <DialogDescription>
                                        View note and images for quotes{" "}
                                        {quote.quoteId}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <label className="text-right font-medium">
                                          Note:
                                        </label>
                                        <p className="col-span-3">
                                          {quote.note}
                                        </p>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <label className="text-right font-medium">
                                          Images:
                                        </label>
                                        <div className="col-span-3 flex flex-wrap gap-2">
                                          {quote.images &&
                                            quote.images.map(
                                              (
                                                image: string,
                                                index: number,
                                              ) => (
                                                <img
                                                  key={index}
                                                  src={image}
                                                  alt={`Quote image ${index + 1}`}
                                                  className="w-24 h-24 object-cover rounded"
                                                />
                                              ),
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
