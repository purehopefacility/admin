import { db } from "@/db/DB";
import { desc, eq } from "drizzle-orm";
import { FeedbackTable } from "@/db/Schema";
import { NextResponse, NextRequest } from "next/server";
import { AddImage, DelImage } from "@/firebase";

const getFeedback = async (fid: number) => {
  return await db
    .select({
      avatar: FeedbackTable.avatar,
      customerName: FeedbackTable.customerName,
      feedback: FeedbackTable.feedback,
      regAt: FeedbackTable.registeredAt,
      rating: FeedbackTable.rating,
      position: FeedbackTable.position,
    })
    .from(FeedbackTable)
    .where(eq(FeedbackTable.feedbackId, fid));
};

export async function GET(
  request: NextRequest,
  { params }: { params: { fid: number } },
) {
  try {
    const fbs = await getFeedback(params.fid);
    return NextResponse.json({ FBData: fbs[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sfeedback:", error);
    return NextResponse.json(
      { message: "Error fetching feedback" },
      { status: 500 },
    );
  }
}
