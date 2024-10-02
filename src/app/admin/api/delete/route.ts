import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";
import { eq } from "drizzle-orm";
import { DelImage, DelImageSet } from "@/firebase";

import {
  ServiceCategoryTable,
  ServiceTable,
  ServiceQuoteTable,
  GeneralInquiryTable,
  HomeSliderImageTable,
} from "@/db/Schema";
export async function DELETE(request: NextRequest) {
  //Mention the specific type to record
  //EXP --> service(svc)/serviceCategory(ctg) Id , type of the record svc || ctg
  //TODO: pass this via body for better
  const ID = request.nextUrl.searchParams.get("id");
  const rectype = request.nextUrl.searchParams.get("type");

  //CHECK
  // Check for null values and validate that ID and state are strings
  if (typeof ID !== "string") {
    throw new Error("ID and state must be provided and must be strings.");
  }
  //CHECKEND
  try {
    if (rectype == "ctg") {
      await db
        .delete(ServiceCategoryTable)
        .where(eq(ServiceCategoryTable.categoryId, parseInt(ID, 10)));
    } else if (rectype == "svc") {
      const SvcimgSet: any = await db
        .select({
          simage: ServiceTable.serviceImg,
          cimage: ServiceTable.serviceCoverImg,
        })
        .from(ServiceTable)
        .where(eq(ServiceTable.serviceId, parseInt(ID, 10)));

      await DelImage(SvcimgSet[0].images);
      await DelImage(SvcimgSet[0].cimage);
      await db
        .delete(ServiceTable)
        .where(eq(ServiceTable.serviceId, parseInt(ID, 10)));
    } else if (rectype == "quote") {
      const imgSet: any = await db
        .select({
          images: ServiceQuoteTable.images,
        })
        .from(ServiceQuoteTable)
        .where(eq(ServiceQuoteTable.quoteId, ID as string));

      await DelImageSet(imgSet[0].images);
      await db
        .delete(ServiceQuoteTable)
        .where(eq(ServiceQuoteTable.quoteId, ID as string));
    } else if (rectype == "inquiry") {
      await db
        .delete(GeneralInquiryTable)
        .where(eq(GeneralInquiryTable.inquiryId, ID as string));
    } else if (rectype == "slide") {
      const SlideImg: any = await db
        .select({
          slideimage: HomeSliderImageTable.imgUrl,
        })
        .from(HomeSliderImageTable)
        .where(eq(HomeSliderImageTable.SlideId, parseInt(ID, 10)));

      await DelImage(SlideImg[0].slideimage);
      await db
        .delete(HomeSliderImageTable)
        .where(eq(HomeSliderImageTable.SlideId, parseInt(ID, 10)));
    } else {
      console.log("Invalid Record Type");
    }
    return NextResponse.json(
      { message: "Successfully Deleted the Record in " + String(rectype) },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in updating feedback" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
