import { db } from "@/db/DB";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { GeneralInquiryTable, CustomerTable } from "@/db/Schema";

export async function POST(request: NextRequest) {
  const InquireData = await request.formData();

  //TODO --> PROCESS
  //check wether customer is new or already in the table
  //if new record in customers
  //record the new inquiry wioth respective srevice id (QRY patam) in GeneralInquiry table

  //CHECK
  const customerName = InquireData.get("customerName") as string;
  const mobileNumber = InquireData.get("mobileNumber") as string;
  const email = InquireData.get("email") as string;
  const address = InquireData.get("address") as string;
  const note = InquireData.get("note") as string;
  const time = InquireData.get("datetime") as string | null;
  if (!customerName || !mobileNumber || !time) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  const receivedAt = new Date(time);
  if (isNaN(receivedAt.getTime())) {
    return NextResponse.json(
      { message: "Invalid date format" },
      { status: 400 },
    );
  }
  //CHECKEND

  let CustomerID = null;

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
    await db
      .insert(GeneralInquiryTable)
      .values({
        customerId: CustomerID,
        recievedAt: receivedAt,
        note: note,
        status: "pending",
      })
      .returning({ INID: GeneralInquiryTable.inquiryId });
    //KEEP THE Inquiry variable witn INID of later needed

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (Err) {
    console.error("ERROR: ", Err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
