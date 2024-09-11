import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";
import { eq } from "drizzle-orm";

import { CustomerTable } from "@/db/Schema";

export async function POST(request: NextRequest) {
  const feedbackData = await request.formData();
  //CHECK
  const feedback = feedbackData.get("feedback");
  const customerId = feedbackData.get("cid");

  if (typeof feedback !== "string" || typeof customerId !== "string") {
    throw new Error("Invalid feedback or customer ID");
  }
  //CHECKEND
  try {
    await db
      .update(CustomerTable)
      .set({ feedback: feedback })
      .where(eq(CustomerTable.customerId, customerId));
    return NextResponse.json(
      { message: "Successfully Added Feedback" },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in updating feedback" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";