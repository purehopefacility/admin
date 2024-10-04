import { db } from "@/db/DB";
import { desc, eq } from "drizzle-orm";
import { FeedbackTable } from "@/db/Schema";
import { NextResponse, NextRequest } from "next/server";
import { AddImage, DelImage } from "@/firebase";

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

export async function PUT(request: NextRequest) {
  try {
    const FBData = await request.formData();

    const Prevavatar = FBData.get("prevAvatar") as string;
    const customerName = FBData.get("customerName") as string;
    const rating = FBData.get("rating") as string;
    const feedback = FBData.get("feedback") as string;
    const position = FBData.get("position") as string;
    const fid = FBData.get("fid") as string;

    const Avatar = FBData.get("avatar") as File;

    let newavtURL = "";

    if (Avatar && Avatar.size > 0) {
      await DelImage(Prevavatar);
      newavtURL = await AddImage(Avatar, "customer_avatars");
    }

    await db
      .update(FeedbackTable)
      .set({
        avatar: Avatar.size > 0 ? (newavtURL as string) : Prevavatar,
        customerName: customerName,
        rating: parseInt(rating, 10),
        feedback: feedback,
        position: position,
      })
      .where(eq(FeedbackTable.feedbackId, parseInt(fid, 10)));
    return NextResponse.json(
      { message: "Update feedback success" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { message: "Error fetching feedbacksß" },
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

  const avatarURL = await AddImage(avatar, "customer_avatars");

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
