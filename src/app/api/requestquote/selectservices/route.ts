import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB"; // Import your database instance
import { ServiceTable } from "@/db/Schema"; // Import the service table schema
import { eq } from "drizzle-orm"; // Assuming you are using drizzle-orm for querying

// Function to get services for a category
const getServicesByCategory = async (categoryId: number) => {
  return await db
    .select({
      serviceId: ServiceTable.serviceId,
      serviceOrder: ServiceTable.serviceOrder,
      serviceTitle1: ServiceTable.serviceTitle_1,
      serviceTitle2: ServiceTable.serviceTitle_2,
    })
    .from(ServiceTable)
    .where(eq(ServiceTable.ServiceCategory, categoryId))
    .orderBy(ServiceTable.serviceOrder); // Optionally order by serviceOrder
};

// API route handler
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = parseInt(searchParams.get("categoryId") || "0");

  // Check if categoryId is provided and valid
  if (!categoryId) {
    return NextResponse.json(
      { message: "categoryId is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch services based on categoryId
    const services = await getServicesByCategory(categoryId);

    // Check if services are found
    if (services.length === 0) {
      return NextResponse.json(
        { message: "No services found for this category" },
        { status: 404 }
      );
    }

    // Return the fetched services
    return NextResponse.json({ data: services }, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { message: "Error fetching services" },
      { status: 500 }
    );
  }
}
