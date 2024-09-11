import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";
import { eq } from "drizzle-orm";

import sanitizeHtml from "sanitize-html";
import { ServiceTable } from "@/db/Schema";

import IMGservice from "@/lib/imageService";

export async function POST(request: NextRequest) {
  const NewServiceData = await request.formData();
  const serviceIMG = NewServiceData.get("serviceImg") as File;
  const coverIMG = NewServiceData.get("coverImg") as File;
  //todo --> suggest the order in client side based on all services in state

  //CHECK
  const serviceOrder = NewServiceData.get("serviceOrder");
  const serviceCategory = NewServiceData.get("serviceCategory");
  const serviceTitle_1 = NewServiceData.get("serviceTitle_1");
  const serviceTitle_2 = NewServiceData.get("serviceTitle_2");
  const serviceDesc = NewServiceData.get("serviceDesc");
  // Validate that the necessary fields are not null and are of the correct type
  if (
    typeof serviceOrder !== "string" ||
    typeof serviceCategory !== "string" ||
    typeof serviceTitle_1 !== "string" ||
    typeof serviceTitle_2 !== "string" ||
    typeof serviceDesc !== "string"
  ) {
    throw new Error("All fields must be provided and must be strings");
  }
  //HTML SANITIZER FOR RICH TEXT EDITOR IF USED
  // --> SUBIT THE FOLLOWINF cleanServiceDesc to serviceDesc below
  const cleanServiceDesc = sanitizeHtml(serviceDesc, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "span",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      span: ["style"],
      img: ["src", "alt"],
    },
    allowedStyles: {
      "*": {
        // Match HEX and RGB
        color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(/],
        "text-align": [/^left$/, /^right$/, /^center$/],
        // Match any number with px, em, or %
        "font-size": [/^\d+(?:px|em|%)$/],
      },
      p: {
        "font-size": [/^\d+rem$/],
      },
    },
  });

  console.log(cleanServiceDesc);

  try {
    const service = await db
      .insert(ServiceTable)
      .values({
        serviceOrder: parseInt(serviceOrder, 10),
        ServiceCategory: parseInt(serviceCategory, 10),
        serviceTitle_1: serviceTitle_1,
        serviceTitle_2: serviceTitle_2,
        serviceDesc: serviceDesc,
        status: "active",
      })
      .returning({ SID: ServiceTable.serviceId });

    const serviceIMGS = await IMGservice.saveImage(
      serviceIMG,
      "Services",
      String(service[0].SID),
    );
    const coverIMGS = await IMGservice.saveImage(
      coverIMG,
      "Services",
      String(service[0].SID),
    );
    //let finalImg = JSON.stringify({ cover: coverIMGS, serviceIMG: IMGS });
    await db
      .update(ServiceTable)
      .set({ serviceImg: serviceIMGS, serviceCoverImg: coverIMGS })
      .where(eq(ServiceTable.serviceId, service[0].SID));
    //TODO--> attach respective images
    return NextResponse.json(
      { message: "Data Succesfully Added" },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in gettinh services" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
