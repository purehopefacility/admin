import { NextResponse } from "next/server";
import { db } from "@/db/DB";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const max_customer_sdata = await db.execute(
      sql`SELECT s.*, sc.category_title, sc.category_id
      FROM services s
      INNER JOIN services_category sc ON s.service_category = sc.category_id
      WHERE s.service_id = ANY (
          SELECT service_id
          FROM (
              SELECT service_id
              FROM quotations
              GROUP BY service_id
              ORDER BY COUNT(DISTINCT customer) DESC
          ) AS subquery
      ) AND s.status = 'active';`,
    );
    // const promises = max_customer_sdata.map(async (service) => {
    //   service.images = await IMGservice.retrieveImages(
    //     "Services",
    //     String(service.service_id),
    //   );
    //   return service;
    // });

    // const servicesWithImages = await Promise.all(promises);

    //TODO--> attach respective images
    return NextResponse.json(
      { ServiceData: max_customer_sdata },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in gettinh services" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
