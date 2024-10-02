"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  PlusCircle,
  ShoppingCart,
  Users2,
  MessageCircle,
  Images,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InquiryType {
  inquireId: string;
  customerId: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  recievedAt: string;
  status: string;
  note: string;
}

export default function InquiriesDashboard() {
  const [inquiries, setInquiries] = useState<InquiryType[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch("/admin/api/getinquiries");
        if (!response.ok) {
          throw new Error("Failed to fetch inquiries");
        }
        const data = await response.json();
        setInquiries(data.InquireData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const StateUpdater = async (id: string, state: string) => {
    try {
      const inq_response = await fetch(
        `/admin/api/update/status?id=${id}&type=inquiry&state=${state}`,
        {
          method: "PUT",
        },
      );
      if (!inq_response.ok) {
        throw new Error("failed to update state of invoice");
      }
    } catch (err) {
      console.error("error occured while updating state of inquiry", err);
    }
  };

  const Deleter = async (id: string) => {
    try {
      const response = await fetch(`/admin/api/delete?id=${id}&type=inquiry`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete quotation");
      }
    } catch (err) {
      console.error("Error deleting inquiry:", err);
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
                  <span className="sr-only">Customer Quotes</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customer Quotes</TooltipContent>
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
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          */}
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="unread">
            <div className="flex items-center">
              <TabsList>
                {/*THere are 4 states here okay */}
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="unread">
              <Card>
                <CardHeader>
                  <CardTitle>Inquiries List</CardTitle>
                  <CardDescription>
                    Manage customer inquiries here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer Name</TableHead>

                        <TableHead className="hidden md:table-cell">
                          Email
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Phone
                        </TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Received At
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiries
                        .filter((inq) => inq.status == "pending")
                        .map((inquiry) => (
                          <TableRow key={inquiry.inquireId}>
                            <TableCell className="font-medium">
                              {inquiry.customerName}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              {inquiry.email}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {inquiry.phoneNumber}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {inquiry.note}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(inquiry.recievedAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  className="px-4 py-2 bg-blue-500"
                                  onClick={() => {
                                    StateUpdater(inquiry.inquireId, "read");
                                    setInquiries((prevState) => {
                                      return prevState.map((item) => {
                                        if (
                                          item.inquireId === inquiry.inquireId
                                        ) {
                                          return {
                                            ...item,
                                            status: "read",
                                          };
                                        }
                                        return item;
                                      });
                                    });
                                  }}
                                >
                                  {inquiry.status == "read"
                                    ? "Marked Read"
                                    : "mark as Read"}
                                </Button>
                                <Button
                                  className="px-4 py-2 bg-red-500"
                                  onClick={() => {
                                    Deleter(inquiry.inquireId);
                                    setInquiries((prevState) => {
                                      return prevState.filter(
                                        (item) =>
                                          item.inquireId != inquiry.inquireId,
                                      );
                                    });
                                  }}
                                >
                                  {"Delete"}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{inquiries.length}</strong> inquiries
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="read">
              <Card>
                <CardHeader>
                  <CardTitle>Inquiries List</CardTitle>
                  <CardDescription>
                    Manage customer inquiries here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer Name</TableHead>

                        <TableHead className="hidden md:table-cell">
                          Email
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Phone
                        </TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Received At
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiries
                        .filter((inq) => inq.status == "read")
                        .map((inquiry) => (
                          <TableRow key={inquiry.inquireId}>
                            <TableCell className="font-medium">
                              {inquiry.customerName}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              {inquiry.email}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {inquiry.phoneNumber}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {inquiry.note}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(inquiry.recievedAt).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                className="px-4 py-2 bg-red-500"
                                onClick={() => {
                                  Deleter(inquiry.inquireId);
                                  setInquiries((prevState) => {
                                    return prevState.filter(
                                      (item) =>
                                        item.inquireId != inquiry.inquireId,
                                    );
                                  });
                                }}
                              >
                                {"Delete"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{inquiries.length}</strong> inquiries
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
