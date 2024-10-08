import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";
import { ServiceCategoryTable } from "@/db/Schema";
import { desc } from "drizzle-orm";

// Function to get all service categories
const getServiceCategories = async () => {
  return await db
    .select({
      categoryId: ServiceCategoryTable.categoryId,
      categoryTitle: ServiceCategoryTable.categoryTitle,
      categoryOrder: ServiceCategoryTable.categoryOrder,
      categoryDesc: ServiceCategoryTable.categoryDesc,
    })
    .from(ServiceCategoryTable)
    .orderBy(desc(ServiceCategoryTable.categoryOrder)); // Order by categoryOrder (descending)
};

// API route handler
export async function GET(req: NextRequest) {
  try {
    const categories = await getServiceCategories();
    return NextResponse.json({ data: categories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching service categories:", error);
    return NextResponse.json(
      { message: "Error fetching service categories" },
      { status: 500 }
    );
  }
}

// Optionally force dynamic route generation
export const dynamic = "force-dynamic";
