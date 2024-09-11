import { db } from "@/db/DB";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ServiceQuoteTable, CustomerTable } from "@/db/Schema";

import IMGservice from "@/lib/imageService";

export async function POST(request: NextRequest) {
  const QuoteData = await request.formData();
  const quoteimageFiles = QuoteData.getAll("quoteimages") as File[];
  //const avatarIMG = QuoteData.get("avatar") as File | null;

  //CHECK
  const serviceIdStr = QuoteData.get("serviceId") as string | null;
  const customerName = QuoteData.get("customerName") as string;
  const mobileNumber = QuoteData.get("mobileNumber") as string;
  const email = QuoteData.get("email") as string;
  const address = QuoteData.get("address") as string;
  const note = QuoteData.get("note") as string;
  const datetime = QuoteData.get("datetime") as string;

  if (!customerName || !mobileNumber || !serviceIdStr || !datetime) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  const serviceId = parseInt(serviceIdStr, 10);
  if (isNaN(serviceId)) {
    return NextResponse.json(
      { message: "Invalid service ID" },
      { status: 400 },
    );
  }

  const receivedAt = new Date(datetime);
  if (isNaN(receivedAt.getTime())) {
    return NextResponse.json(
      { message: "Invalid date format" },
      { status: 400 },
    );
  }

  let CustomerID: string | undefined;
  //CHECKEND

  //TODO --> PROCESS
  //check wether customer is new or already in the table
  //if new record in customers
  //record the new quote wioth respective srevice id (QRY patam) in quotetable
  //place the images with renaming in customer directory and store paths in QuoteImagetable under quote id
  //EXP -> service id, and formData
  //let CustomerID: number | undefined = undefined;

  try {
    const customer = await db
      .select({
        customerId: CustomerTable.customerId,
      })
      .from(CustomerTable)
      .where(
        and(
          eq(CustomerTable.customerName, customerName),
          eq(CustomerTable.phoneNumber, mobileNumber),
        ),
      );
    console.log("Found Customer:" + JSON.stringify(customer));
    if (customer.length == 0) {
      const customer = await db
        .insert(CustomerTable)
        .values({
          customerName: customerName,
          email: email,
          phoneNumber: mobileNumber,
          registeredAt: receivedAt,
          address: address,
        })
        .returning({ CID: CustomerTable.customerId });
      //await IMGservice.saveImages([avatarIMG], "customers", customer[0].CID);
      //either load customerID here
      console.log("CREATED CUSTOMER" + JSON.stringify(customer));
      CustomerID = customer[0].CID;
    } else {
      //or load CustomerID herr
      console.log("found the customer");
      CustomerID = customer[0].customerId;
    }
  } catch (Err) {
    console.log("Error finding customer" + Err);
  }

  try {
    const Quote = await db
      .insert(ServiceQuoteTable)
      .values({
        ServiceId: serviceId,
        customerId: CustomerID,
        recievedAt: receivedAt,
        status: "pending",
        note: note,
      })
      .returning({ QID: ServiceQuoteTable.quoteId });
    const IMGS = await IMGservice.saveImages(
      quoteimageFiles,
      "Quotations",
      Quote[0].QID,
    );
    await db
      .update(ServiceQuoteTable)
      .set({ images: IMGS })
      .where(eq(ServiceQuoteTable.quoteId, Quote[0].QID));
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (Err) {
    console.error("ERROR: ", Err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}