import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";
import { eq, gt, lt, and } from "drizzle-orm";

import { ServiceCategoryTable, ServiceTable } from "@/db/Schema";

export async function PUT(request: NextRequest) {
  //TODO: pass this via body for better
  //types can be : ctg(category) || svc (service)
  const ID = request.nextUrl.searchParams.get("id");
  const ctgid = request.nextUrl.searchParams.get("ctgid");
  const order = request.nextUrl.searchParams.get("order");
  const type = request.nextUrl.searchParams.get("type");

  //CHECK
  const idNum = parseInt(ID || "", 10);
  const ctgidNum = parseInt(ctgid || "", 10);
  const orderNum = parseInt(order || "", 10);

  if (isNaN(idNum) || isNaN(orderNum) || (type === "svc" && isNaN(ctgidNum))) {
    throw new Error(
      "Invalid parameters. ID, order, and ctgid must be valid numbers.",
    );
  }
  //CHECKEND
  try {
    if (type == "svc") {
      //UPDT --> service order
      await db
        .update(ServiceTable)
        .set({ serviceOrder: orderNum })
        .where(
          and(
            gt(ServiceTable.serviceId, idNum),
            lt(ServiceTable.ServiceCategory, ctgidNum),
          ),
        );
    } else {
      //UPDT --> category order
      await db
        .update(ServiceCategoryTable)
        .set({ categoryOrder: orderNum })
        .where(eq(ServiceCategoryTable.categoryId, idNum));
    }

    return NextResponse.json(
      { message: "Successfully Updated Service/Category Order" },
      { status: 200 },
    );
  } catch (e) {
    console.log("error in updating feedback" + e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
