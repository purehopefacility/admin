import { db } from "@/db/DB";
import { desc, eq } from "drizzle-orm";
import { ServiceTable, ServiceCategoryTable } from "@/db/Schema";
import { NextResponse } from "next/server";

const getActiveServices = async () => {
  return await db
    .select({
      serviceId: ServiceTable.serviceId,
      serviceOrder: ServiceTable.serviceOrder,
      categoryName: ServiceCategoryTable.categoryTitle,
      serviceTitle1: ServiceTable.serviceTitle_1,
      serviceTitle2: ServiceTable.serviceTitle_2,
      serviceImg: ServiceTable.serviceImg,
      serviceDesc: ServiceTable.serviceDesc,
      serviceState: ServiceTable.status,
    })
    .from(ServiceTable)
    .innerJoin(
      ServiceCategoryTable,
      eq(ServiceTable.ServiceCategory, ServiceCategoryTable.categoryId),
    )
    .where(eq(ServiceTable.status, "active"))
    .orderBy(desc(ServiceTable.serviceOrder));
};

export async function GET() {
  try {
    const activeServices = await getActiveServices();
    return NextResponse.json({ data: activeServices }, { status: 200 });
  } catch (error) {
    console.error("Error fetching active services:", error);
    return NextResponse.json(
      { message: "Error fetching active services" },
      { status: 500 },
    );
  }
}
export const dynamic = "force-dynamic";