import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";
import { eq, and } from "drizzle-orm";
import { ServiceTable, ServiceCategoryTable } from "@/db/Schema";

export async function GET(request: NextRequest, { params }: { params: { sid: number } }) {
  try {
    const sdata = await db
      .select({
        serviceId: ServiceTable.serviceId,
        serviceOrder: ServiceTable.serviceOrder,
        ServiceCategory: ServiceCategoryTable.categoryTitle,
        ServiceCategoryOrder: ServiceCategoryTable.categoryOrder,
        ServiceCategoryId: ServiceCategoryTable.categoryId,
        serviceTitle_1: ServiceTable.serviceTitle_1,
        serviceTitle_2: ServiceTable.serviceTitle_2,
        serviceDesc: ServiceTable.serviceDesc,
        status: ServiceTable.status,
        serviceImages: ServiceTable.serviceImg,
      })
      .from(ServiceTable)
      .innerJoin(
        ServiceCategoryTable,
        eq(ServiceTable.ServiceCategory, ServiceCategoryTable.categoryId),
      )
      .where(
        
          eq(ServiceTable.serviceId, params.sid),
          // eq(ServiceTable.status, "active"),
        
      );
    console.log(params.sid)
    return NextResponse.json(sdata[0]);
  } catch (e) {
    console.log("error in gettinh services" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
