import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";

import { NewsLetterMailTable } from "@/db/Schema";

export async function POST(request: NextRequest) {
  const NewsMailData = await request.formData();
  const mail = NewsMailData.get("mail");
  console.log("cjsad");
  // Validate that the mail field is not null and is a string
  if (typeof mail !== "string" || mail.trim() === "") {
    return NextResponse.json(
      { message: "Invalid or missing email address" },
      { status: 400 },
    );
  }
  try {
    await db.insert(NewsLetterMailTable).values({
      mail: mail,
    });

    return NextResponse.json(
      { message: "Succedfully Added mail to newsletter" },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in gettinh services" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
