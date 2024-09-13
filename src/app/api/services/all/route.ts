import { db } from "@/db/DB";
import { desc, eq } from "drizzle-orm";
import { ServiceTable, ServiceCategoryTable } from "@/db/Schema";
import { NextResponse } from "next/server";

const getActiveServices = async () => {
  return await db
    .select({
      serviceId: ServiceTable.serviceId,
      serviceOrder: ServiceTable.serviceOrder,
      categoryName: ServiceCategoryTable.categoryTitle,
      serviceTitle1: ServiceTable.serviceTitle_1,
      serviceTitle2: ServiceTable.serviceTitle_2,
      serviceImg: ServiceTable.serviceImg,
      serviceDesc: ServiceTable.serviceDesc,
      serviceState: ServiceTable.status,
    })
    .from(ServiceTable)
    .innerJoin(
      ServiceCategoryTable,
      eq(ServiceTable.ServiceCategory, ServiceCategoryTable.categoryId),
    )
    .where(eq(ServiceTable.status, "active"))
    .orderBy(desc(ServiceTable.serviceOrder));
};

// interface ActiveServiceWithCategory {
//   serviceId: number;
//   serviceOrder: number;
//   categoryName: string;
//   serviceTitle1: string;
//   serviceTitle2: string;
//   serviceImg: string | null;
//   serviceDesc: string | null;
// }

export async function GET() {
  try {
    const activeServices = await getActiveServices();
    return NextResponse.json({ data: activeServices }, { status: 200 });
  } catch (error) {
    console.error("Error fetching active services:", error);
    return NextResponse.json(
      { message: "Error fetching active services" },
      { status: 500 },
    );
  }
}
export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import { db } from "@/db/DB";
// import { eq } from "drizzle-orm";
// import { ServiceTable, ServiceCategoryTable } from "@/db/Schema";
// import IMGservice from "@/lib/imageService";
//
// export async function GET() {
//   try {
//     const sdata = await db
//       .select({
//         serviceId: ServiceTable.serviceId,
//         serviceOrder: ServiceTable.serviceOrder,
//         ServiceCategory: ServiceCategoryTable.categoryTitle,
//         ServiceCategoryOrder: ServiceCategoryTable.categoryOrder,
//         ServiceCategoryId: ServiceCategoryTable.categoryId,
//         serviceTitle_1: ServiceTable.serviceTitle_1,
//         serviceTitle_2: ServiceTable.serviceTitle_2,
//         serviceDesc: ServiceTable.serviceDesc,
//         status: ServiceTable.status,
//         serviceImages: ServiceTable.serviceImg,
//       })
//       .from(ServiceTable)
//       .innerJoin(
//         ServiceCategoryTable,
//         eq(ServiceTable.ServiceCategory, ServiceCategoryTable.categoryId),
//       )
//       .where(eq(ServiceTable.status, "active"));
//     const promises = sdata.map(async (service) => {
//       const images = await IMGservice.retrieveImages(
//         "Services",
//         String(service.serviceId),
//       );
//       Object.defineProperty(service, "images", {
//         value: images,
//         enumerable: true, // Make it show up in JSON.stringify()
//         writable: true, // Allow the property value to be changed
//         configurable: true, // Allow the property descriptor to be changed or property to be deleted
//       });
//       return service;
//     });
//
//     const servicesWithImages = await Promise.all(promises);
//
//     return NextResponse.json(
//       { ServiceData: servicesWithImages },
//       { status: 200 },
//     );
//   } catch (e) {
//     console.log("error in gettinh services" + e);
//     return NextResponse.json({ message: e }, { status: 500 });
//   }
// }
