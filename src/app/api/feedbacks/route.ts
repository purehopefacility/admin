import { db } from "@/db/DB";
import { desc, eq } from "drizzle-orm";
import { CustomerTable } from "@/db/Schema";
import { NextResponse } from "next/server";

const getFeedBacks = async () => {
  return await db
    .select({
      avatar: CustomerTable.avatar,
      name: CustomerTable.customerName,
      feedback: CustomerTable.feedback,
      rating: CustomerTable.rating,
      position: CustomerTable.position,
    })
    .from(CustomerTable);
};

export async function GET() {
  try {
    const feedbacks = await getFeedBacks();
    return NextResponse.json({ data: feedbacks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { message: "Error fetching feedbacks" },
      { status: 500 },
    );
  }
}
export const dynamic = "force-dynamic";
