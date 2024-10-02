import { db } from "@/db/DB";
import { desc, eq } from "drizzle-orm";
import { HomeSliderImageTable } from "@/db/Schema";
import { NextResponse, NextRequest } from "next/server";
import { AddImage } from "@/firebase";

const getSlides = async () => {
  return await db
    .select({
      imgUrl: HomeSliderImageTable.imgUrl,
      Order: HomeSliderImageTable.Order,
      SlideDesc1: HomeSliderImageTable.SlideDesc1,
      SlideDesc2: HomeSliderImageTable.SlideDesc2,
      ButtonTxt: HomeSliderImageTable.ButtonTxt,
      ButtonLink: HomeSliderImageTable.ButtonLink,
    })
    .from(HomeSliderImageTable);
};

export async function GET() {
  try {
    const slides = await getSlides();
    return NextResponse.json({ data: slides }, { status: 200 });
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
  const desc1 = SliderData.get("desc1") as string;
  const desc2 = SliderData.get("desc2") as string;
  const buttonText = SliderData.get("buttonText") as string;
  const buttonLink = SliderData.get("buttonLink") as string;
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
