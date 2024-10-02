import { db } from "@/db/DB";
import { desc, eq } from "drizzle-orm";
import { HomeSliderImageTable } from "@/db/Schema";
import { NextResponse, NextRequest } from "next/server";
import { AddImage } from "@/firebase";

const getSlides = async () => {
  return await db
    .select({
      slideId: HomeSliderImageTable.SlideId,
      image: HomeSliderImageTable.imgUrl,
      Order: HomeSliderImageTable.Order,
      title1: HomeSliderImageTable.Title1,
      title2: HomeSliderImageTable.Title2,
      description: HomeSliderImageTable.SlideDesc,
      buttonText: HomeSliderImageTable.ButtonTxt,
      buttonLink: HomeSliderImageTable.ButtonLink,
    })
    .from(HomeSliderImageTable);
};

export async function GET() {
  try {
    const slides = await getSlides();
    return NextResponse.json({ slideData: slides }, { status: 200 });
  } catch (error) {
    console.error("Error fetching slides:", error);
    return NextResponse.json(
      { message: "Error fetching slides" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const slides = await getSlides();
    return NextResponse.json({ slideData: slides }, { status: 200 });
  } catch (error) {
    console.error("Error fetching slides:", error);
    return NextResponse.json(
      { message: "Error fetching slides" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const SliderData = await request.formData();

  const order = parseInt(SliderData.get("order") as string, 10);
  const title1 = SliderData.get("title1") as string;
  const title2 = SliderData.get("title2") as string;
  const desc = SliderData.get("desc") as string;
  const buttonText = SliderData.get("buttonText") as string;
  const buttonLink = SliderData.get("buttonLink") as string;
  const sliderImg = SliderData.get("image") as File;

  const sliderURL = await AddImage(sliderImg, "slider_images");

  try {
    await db.insert(HomeSliderImageTable).values({
      imgUrl: sliderURL as string,
      Order: order,
      Title1: title1,
      Title2: title2,
      SlideDesc: desc,
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
