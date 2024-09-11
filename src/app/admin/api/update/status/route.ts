import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";
import { eq } from "drizzle-orm";

import {
  GeneralInquiryTable,
  ServiceQuoteTable,
  ServiceTable,
} from "@/db/Schema";

export async function PUT(request: NextRequest) {
  //EXP --> quote/inquiry Id , type Quote(quote) or generalInquiry(inquiry) or service(svc), state complete, rejected, approved etc
  //TODO: pass this via body for better
  const ID = request.nextUrl.searchParams.get("id");
  const rectype = request.nextUrl.searchParams.get("type");
  const state = request.nextUrl.searchParams.get("state");
  //CHECK
  // Check for null values and validate that ID and state are strings
  if (typeof ID !== "string" || typeof state !== "string") {
    throw new Error("ID and state must be provided and must be strings.");
  }
  //CHECKEND
  try {
    if (rectype == "inquiry") {
      await db
        .update(GeneralInquiryTable)
        .set({ status: state })
        .where(eq(GeneralInquiryTable.inquiryId, ID));
    } else if (rectype == "quote") {
      await db
        .update(ServiceQuoteTable)
        .set({ status: state })
        .where(eq(ServiceQuoteTable.quoteId, ID));
    } else {
      await db
        .update(ServiceTable)
        .set({ status: state })
        .where(eq(ServiceTable.serviceId, parseInt(ID)));
    }
    return NextResponse.json(
      { message: "Successfully Updated State" },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in updating feedback" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";