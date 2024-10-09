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
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/auth";

interface FBItem {
  fid: number;
  avatar: string;
  name: string;
  feedback: string;
  regAt: string;
  rating: number;
  position: string;
}
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();

  const [FBs, setFbs] = useState<FBItem[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/feedbacks");
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        const data = await response.json();
        setFbs(data.FBdata);
        //setLoading(false);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        //setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const Deleter = async (id: number) => {
    try {
      const response = await fetch(`/admin/api/delete?id=${id}&type=fb`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete feedback");
      }
    } catch (err) {
      console.log("Error occured while deleting feedback", err);
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
                  <Link href="#">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Feedback Manager</Link>
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
          <Card x-chunk="dashboard-06-chunk-0 ">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Customer Feedbacks</CardTitle>
                  <CardDescription>
                    Manage your customer feedbacks and ratings
                  </CardDescription>
                </div>

                <Button
                  size="sm"
                  className="h-8 gap-1 mr-2 "
                  onClick={() => {
                    router.push("/admin/addfeedback");
                  }}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Feedback
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Avatar Image</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Feedback
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Rating
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FBs.map((FB: FBItem, index: number) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex aspect-square w-full items-center justify-center rounded-md border">
                          <Image
                            src={FB.avatar} // Preview uploaded service image
                            alt="feedback Image"
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{FB.name}</TableCell>
                      <TableCell>{FB.position}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {FB.feedback}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {FB.rating}
                      </TableCell>

                      <TableCell>
                        <TableCell className="flex gap-2">
                          <Button
                            className="px-4 py-2 bg-blue-500"
                            onClick={() => {
                              router.push(
                                `/admin/updatefeedback?fid=${FB.fid}`,
                              );
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="px-4 py-2 bg-red-500"
                            onClick={() => {
                              Deleter(FB.fid);
                              setFbs((prevState) => {
                                return prevState.filter(
                                  (item) => item.fid != FB.fid,
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
        </main>
      </div>
    </div>
  );
}
