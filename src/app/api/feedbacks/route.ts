import { db } from "@/db/DB";
import { desc, eq } from "drizzle-orm";
import { FeedbackTable } from "@/db/Schema";
import { NextResponse, NextRequest } from "next/server";

const getFeedBacks = async () => {
  return await db
    .select({
      avatar: FeedbackTable.avatar,
      name: FeedbackTable.customerName,
      feedback: FeedbackTable.feedback,
      regAt: FeedbackTable.registeredAt,
      rating: FeedbackTable.rating,
      position: FeedbackTable.position,
    })
    .from(FeedbackTable);
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

export async function POST(request: NextRequest) {
  const QuoteData = await request.formData();

  const customerName = QuoteData.get("customerName") as string;
  const position = QuoteData.get("position") as string;
  const feedback = QuoteData.get("feedback") as string;
  const rating = parseInt(QuoteData.get("rating") as string, 10);
  const avatar = QuoteData.get("avatar") as File;

  //HERE IMAGE WILL BE UPLOADED TO FIREBASE CLOUD BUCKET AND GETS THE STINF URL
  const avatarURL = "sample url";
  try {
    await db.insert(FeedbackTable).values({
      avatar: avatarURL,
      customerName: customerName,
      rating: rating,
      feedback: feedback,
      position: position,
    });

    return NextResponse.json(
      { message: "Succesfully Added Feedbacks" },
      { status: 200 },
    );
  } catch (Err) {
    console.error("ERROR: ", Err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
