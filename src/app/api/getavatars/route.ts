import { NextResponse } from "next/server";
import { db } from "@/db/DB";

import { FeedbackTable } from "@/db/Schema";

const avatarLimit: number = 3;

function avatarMaker(items: any[]) {
  const sortedItems = items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return sortedItems.slice(0, avatarLimit);
}

export async function GET() {
  try {
    const avdata = await db
      .select({
        avatar: FeedbackTable.avatar,
        date: FeedbackTable.registeredAt,
      })
      .from(FeedbackTable);

    const AvatarData = {
      count: avdata.length - avatarLimit,
      data: avatarMaker(avdata),
    };

    return NextResponse.json(
      { AVData: avdata ? AvatarData : [] },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in gettinh customer avatars" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
