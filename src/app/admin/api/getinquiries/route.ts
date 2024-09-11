import { NextResponse } from "next/server";
import { db } from "@/db/DB";
import { eq } from "drizzle-orm";
import { GeneralInquiryTable, CustomerTable } from "@/db/Schema";

export async function GET() {
  try {
    //here when state is completed, customerID can be used to give feedback
    const INdata = await db
      .select({
        inquireId: GeneralInquiryTable.inquiryId,
        customerId: GeneralInquiryTable.customerId,
        customerName: CustomerTable.customerName,
        phoneNumber: CustomerTable.phoneNumber,
        email: CustomerTable.email,
        recievedAt: GeneralInquiryTable.recievedAt,
        status: GeneralInquiryTable.status,
        note: GeneralInquiryTable.note,
      })
      .from(GeneralInquiryTable)

      .innerJoin(
        CustomerTable,
        eq(GeneralInquiryTable.customerId, CustomerTable.customerId),
      );
    return NextResponse.json({ InquireData: INdata }, { status: 200 });
  } catch (e) {
    console.log("error in gettinh inquiries" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";