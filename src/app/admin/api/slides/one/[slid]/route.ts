import { db } from "@/db/DB";
import { desc, eq } from "drizzle-orm";
import { HomeSliderImageTable } from "@/db/Schema";
import { NextResponse, NextRequest } from "next/server";
import { AddImage, DelImage } from "@/firebase";

const getSlides = async (slideId: number) => {
  return await db
    .select({
      image: HomeSliderImageTable.imgUrl,
      Order: HomeSliderImageTable.Order,
      title1: HomeSliderImageTable.Title1,
      title2: HomeSliderImageTable.Title2,
      description: HomeSliderImageTable.SlideDesc,
      buttonText: HomeSliderImageTable.ButtonTxt,
      buttonLink: HomeSliderImageTable.ButtonLink,
    })
    .from(HomeSliderImageTable)
    .where(eq(HomeSliderImageTable.SlideId, slideId));
};

export async function GET(
  request: NextRequest,
  { params }: { params: { slid: number } },
) {
  try {
    const slides = await getSlides(params.slid);
    return NextResponse.json({ slideData: slides[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching slides:", error);
    return NextResponse.json(
      { message: "Error fetching slides" },
      { status: 500 },
    );
  }
}
