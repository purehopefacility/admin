import { db } from "@/db/DB";
import { desc, eq } from "drizzle-orm";
import { FeedbackTable, HomeSliderImageTable } from "@/db/Schema";
import { NextResponse, NextRequest } from "next/server";
import { AddImage } from "@/firebase";

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
  const SliderData = await request.formData();

  const order = parseInt(SliderData.get("order") as string, 10);
  const desc1 = SliderData.get("desc1") as string;
  const desc2 = SliderData.get("desc2") as string;
  const buttonText = SliderData.get("buttonText") as string;
  const buttonLink = parseInt(SliderData.get("buttonLink") as string, 10);
  const sliderImg = SliderData.get("image") as File;

  const sliderURL = await AddImage(sliderImg, "slider_images");

  try {
    await db.insert(HomeSliderImageTable).values({
      imgUrl: sliderURL as string,
      Order: order,
      SlideDesc1: desc1,
      SlideDesc2: desc2,
      ButtonTxt: buttonText,
      ButtonLink: buttonLink,
    });

    return NextResponse.json(
      { message: "Succesfully Added Slider" },
      { status: 200 },
    );
  } catch (Err) {
    console.error("ERROR: ", Err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
