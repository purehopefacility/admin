import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";
import { eq } from "drizzle-orm";

import { ServiceCategoryTable, ServiceTable } from "@/db/Schema";
export async function DELETE(request: NextRequest) {
  //Mention the specific type to record
  //EXP --> service(svc)/serviceCategory(ctg) Id , type of the record svc || ctg
  //TODO: pass this via body for better
  const ID = request.nextUrl.searchParams.get("id");
  const rectype = request.nextUrl.searchParams.get("type");

  //CHECK
  // Check for null values and validate that ID and state are strings
  if (typeof ID !== "string") {
    throw new Error("ID and state must be provided and must be strings.");
  }
  //CHECKEND
  try {
    if (rectype == "ctg") {
      await db
        .delete(ServiceCategoryTable)
        .where(eq(ServiceCategoryTable.categoryId, parseInt(ID, 10)));
    } else {
      await db
        .delete(ServiceTable)
        .where(eq(ServiceTable.serviceId, parseInt(ID, 10)));
    }
    return NextResponse.json(
      { message: "Successfully Deleted the Record in " + String(rectype) },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in updating feedback" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}