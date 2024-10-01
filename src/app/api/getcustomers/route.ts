import { NextResponse } from "next/server";
import { db } from "@/db/DB";

import { CustomerTable } from "@/db/Schema";

//this is usefull to 2 places
//1) navbar icon set
//2) ADMIN --> add feedback
export async function GET() {
  try {
    const cdata = await db
      .select({
        avatar: CustomerTable.avatar,
        name: CustomerTable.customerName,
        customerID: CustomerTable.customerId,
        phoneNo: CustomerTable.phoneNumber,
      })
      .from(CustomerTable);

    return NextResponse.json(
      { CustomerData: cdata ? cdata : [] },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in gettinh customers" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
