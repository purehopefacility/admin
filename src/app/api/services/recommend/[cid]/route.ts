import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";
import { ServiceTable } from "@/db/Schema";
import { eq } from "drizzle-orm";


export async function GET(
  req: NextRequest,
  {params}: {params: {cid: number}}
) {

  try {
    const services = await db
      .select({
        serviceId: ServiceTable.serviceId,
        serviceTitle_1: ServiceTable.serviceTitle_1,
        serviceTitle_2: ServiceTable.serviceTitle_2,
        serviceImg: ServiceTable.serviceImg,
      })
      .from(ServiceTable)
      .where( eq(ServiceTable.ServiceCategory, params.cid));

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
export const dynamic = "force-dynamic";