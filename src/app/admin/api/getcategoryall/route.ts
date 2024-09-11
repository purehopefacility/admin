import { NextResponse } from "next/server";
import { db } from "@/db/DB";

import { ServiceCategoryTable } from "@/db/Schema";

export async function GET() {
  try {
    const sdata = await db
      .select({
        categoryId: ServiceCategoryTable.categoryId,
        categoryOrder: ServiceCategoryTable.categoryOrder,
        categoryTitle: ServiceCategoryTable.categoryTitle,
        categoryDesc: ServiceCategoryTable.categoryDesc,
      })
      .from(ServiceCategoryTable);

    return NextResponse.json({ CatgoryData: sdata }, { status: 200 });
  } catch (e) {
    console.log("error in gettinh services" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
