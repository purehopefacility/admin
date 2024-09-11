import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";

import { ServiceCategoryTable } from "@/db/Schema";

export async function POST(request: NextRequest) {
  const NewServiceCTGData = await request.formData();

  const categoryTitle = NewServiceCTGData.get("ctgTitle");
  const categoryOrder = NewServiceCTGData.get("ctgOrder");
  const categoryDesc = NewServiceCTGData.get("ctgDesc");
  if (
    typeof categoryTitle !== "string" ||
    typeof categoryOrder !== "string" ||
    typeof categoryDesc !== "string"
  ) {
    throw new Error("Missing or invalid input");
  }

  // Convert categoryOrder to number if it's necessary
  const categoryOrderNumber = parseInt(categoryOrder, 10);
  if (isNaN(categoryOrderNumber)) {
    throw new Error("Invalid input for category order");
  }
  try {
    await db
      .insert(ServiceCategoryTable)
      .values({
        categoryTitle: categoryTitle,
        categoryOrder: categoryOrderNumber,
        categoryDesc: categoryDesc,
      })
      .returning({ SCID: ServiceCategoryTable.categoryId });

    return NextResponse.json(
      { message: "Successfully Added Category" },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in gettinh services" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";