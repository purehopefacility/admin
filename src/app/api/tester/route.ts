import { NextResponse, NextRequest } from "next/server";
import { AddImage, DelImage } from "@/firebase";

export async function GET() {
  try {
    console.log("GET");
    return NextResponse.json({ data: "feedbacks" }, { status: 200 });
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

  const avatarURL = await DelImage(
    "https://firebasestorage.googleapis.com/v0/b/purehope-web.appspot.com/o/customer_avatars%2FScreenshot%202024-09-18%20at%2013.47.42.png?alt=media&token=bafaafe9-4e37-4e2a-b306-73c35e954aef",
  );

  return NextResponse.json(
    { message: "Succesfully Added Feedbacks" },
    { status: 200 },
  );
}
export const dynamic = "force-dynamic";
