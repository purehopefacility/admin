import { NextResponse } from "next/server";
import { db } from "@/db/DB";
import { eq } from "drizzle-orm";
import { ServiceTable, ServiceQuoteTable, CustomerTable } from "@/db/Schema";
import IMGservice from "@/lib/imageService";
export async function GET() {
  try {
    //here when state is completed, customerID can be used to give feedback
    const qdata = await db
      .select({
        quoteId: ServiceQuoteTable.quoteId,
        customerId: ServiceQuoteTable.customerId,
        serviceId: ServiceQuoteTable.ServiceId,
        serviceTitle_1: ServiceTable.serviceTitle_1,
        serviceTitle_2: ServiceTable.serviceTitle_2,
        customerName: CustomerTable.customerName,
        phoneNumber: CustomerTable.phoneNumber,
        email: CustomerTable.email,
        recievedAt: ServiceQuoteTable.recievedAt,
        status: ServiceQuoteTable.status,
        note: ServiceQuoteTable.note,
        images: ServiceQuoteTable.images,
      })
      .from(ServiceQuoteTable)
      .innerJoin(
        ServiceTable,
        eq(ServiceQuoteTable.ServiceId, ServiceTable.serviceId),
      )
      .innerJoin(
        CustomerTable,
        eq(ServiceQuoteTable.customerId, CustomerTable.customerId),
      );

    const promises = qdata.map(async (quote) => {
      const images = await IMGservice.retrieveImages(
        String(quote.quoteId)
      );
      Object.defineProperty(quote, "images", {
        value: images,
        enumerable: true, // Make it show up in JSON.stringify()
        writable: true, // Allow the property value to be changed
        configurable: true, // Allow the property descriptor to be changed or property to be deleted
      });
      return quote;
    });

    const quotesWithImages = await Promise.all(promises);
    return NextResponse.json({ QuoteData: quotesWithImages }, { status: 200 });
  } catch (e) {
    console.log("error in gettinh quotes" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
