import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/DB";
import { eq, and, gte, gt, lt, lte, not } from "drizzle-orm";
import { sql } from "drizzle-orm/sql";
import { ServiceCategoryTable, ServiceTable } from "@/db/Schema";

export async function PUT(request: NextRequest) {
  const ID = request.nextUrl.searchParams.get("id");
  const ctgid = request.nextUrl.searchParams.get("ctgid");
  const newOrder = request.nextUrl.searchParams.get("order");
  const type = request.nextUrl.searchParams.get("type");

  const idNum = parseInt(ID || "", 10);
  const ctgidNum = parseInt(ctgid || "", 10);
  const newOrderNum = parseInt(newOrder || "", 10);

  if (isNaN(idNum) || isNaN(newOrderNum) || (type === "svc" && isNaN(ctgidNum))) {
    throw new Error("Invalid parameters. ID, order, and ctgid must be valid numbers.");
  }

  try {
    if (type == "svc") {
      // Get the current order of the service
      const currentService = await db
        .select({ currentOrder: ServiceTable.serviceOrder })
        .from(ServiceTable)
        .where(eq(ServiceTable.serviceId, idNum))
        .limit(1);

      if (!currentService.length) {
        throw new Error("Service not found");
      }

      const currentOrder = currentService[0].currentOrder;

      // Update orders of other services
      if (newOrderNum < currentOrder) {
        // Moving service to a lower order (e.g., from 3 to 1)
        await db
          .update(ServiceTable)
          .set({
            serviceOrder: sql`${ServiceTable.serviceOrder} + 1`
          })
          .where(
            and(
              eq(ServiceTable.ServiceCategory, ctgidNum),
              gte(ServiceTable.serviceOrder, newOrderNum),
              lt(ServiceTable.serviceOrder, currentOrder),
              not(eq(ServiceTable.serviceId, idNum))
            )
          );
      } else if (newOrderNum > currentOrder) {
        // Moving service to a higher order (e.g., from 1 to 3)
        await db
          .update(ServiceTable)
          .set({
            serviceOrder: sql`${ServiceTable.serviceOrder} - 1`
          })
          .where(
            and(
              eq(ServiceTable.ServiceCategory, ctgidNum),
              gt(ServiceTable.serviceOrder, currentOrder),
              lte(ServiceTable.serviceOrder, newOrderNum),
              not(eq(ServiceTable.serviceId, idNum))
            )
          );
      }

      // Update the order of the target service
      await db
        .update(ServiceTable)
        .set({ serviceOrder: newOrderNum })
        .where(eq(ServiceTable.serviceId, idNum));
    } else {
      // Handle category reordering (if needed)
    }

    return NextResponse.json(
      { message: "Successfully Updated Service/Category Order" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error in updating order:", e);
    return NextResponse.json({ message: String(e) }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";














// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/db/DB";
// import { eq, gt, lt, and } from "drizzle-orm";

// import { ServiceCategoryTable, ServiceTable } from "@/db/Schema";

// export async function PUT(request: NextRequest) {
//   //TODO: pass this via body for better
//   //types can be : ctg(category) || svc (service)
//   const ID = request.nextUrl.searchParams.get("id");
//   const ctgid = request.nextUrl.searchParams.get("ctgid");
//   const order = request.nextUrl.searchParams.get("order");
//   const type = request.nextUrl.searchParams.get("type");

//   //CHECK
//   const idNum = parseInt(ID || "", 10);
//   const ctgidNum = parseInt(ctgid || "", 10);
//   const orderNum = parseInt(order || "", 10);

//   if (isNaN(idNum) || isNaN(orderNum) || (type === "svc" && isNaN(ctgidNum))) {
//     throw new Error(
//       "Invalid parameters. ID, order, and ctgid must be valid numbers.",
//     );
//   }
//   //CHECKEND
//   try {
//     if (type == "svc") {
//       //UPDT --> service order
//       await db
//         .update(ServiceTable)
//         .set({ serviceOrder: orderNum })
//         .where(
//           and(
//             gt(ServiceTable.serviceId, idNum),
//             lt(ServiceTable.ServiceCategory, ctgidNum),
//           ),
//         );
//     } else {
//       //UPDT --> category order
//       await db
//         .update(ServiceCategoryTable)
//         .set({ categoryOrder: orderNum })
//         .where(eq(ServiceCategoryTable.categoryId, idNum));
//     }

//     return NextResponse.json(
//       { message: "Successfully Updated Service/Category Order" },
//       { status: 200 },
//     );
//   } catch (e) {
//     console.log("error in updating feedback" + e);
//     return NextResponse.json({ message: e }, { status: 500 });
//   }
// }
// export const dynamic = "force-dynamic";
