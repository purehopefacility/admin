import {
  boolean,
  integer,
  json,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "@auth/core/adapters";
import { randomUUID } from "crypto";

//3 types of images
//service quote images <-- TODO , servce images(DONE) , avatar images (DONE)
export const ServiceCategoryTable = pgTable("services_category", {
  categoryId: serial("category_id").primaryKey(),
  categoryTitle: varchar("category_title").notNull(),
  categoryOrder: integer("category_order").notNull(),
  categoryDesc: varchar("category_desc").notNull(),
});

export const ServiceTable = pgTable("services", {
  serviceId: serial("service_id").primaryKey(),
  serviceOrder: integer("service_order").notNull(),
  ServiceCategory: integer("service_category").references(
    () => ServiceCategoryTable.categoryId,
  ),
  serviceTitle_1: varchar("service_title_1").notNull(),
  serviceTitle_2: varchar("service_title_2").notNull(),
  serviceImg: varchar("service_img"),
  serviceCoverImg: varchar("service_cover_img"),
  serviceDesc: text("service_desc"),
  status: varchar("status"),
});

export const CustomerTable = pgTable("customers", {
  customerId: uuid("customer_id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  customerName: varchar("customer_name").notNull(),
  avatar: varchar("avatar"),
  email: varchar("email").unique(),

  phoneNumber: varchar("phone_number"),
  registeredAt: timestamp("registered_at"),
  rating: integer("rating"),
  address: varchar("address"),
  feedback: varchar("feedback"),
  position: varchar("position"),
});

//Assuming a single quote --> single service
export const ServiceQuoteTable = pgTable("quotations", {
  quoteId: uuid("quote_id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  ServiceId: integer("service_id").references(() => ServiceTable.serviceId),
  customerId: uuid("customer").references(() => CustomerTable.customerId),
  recievedAt: timestamp("recieved_at"),
  status: varchar("status"), // --> wether approved/rejected/pending
  note: text("note"),
  images: json("images"),
});

export const GeneralInquiryTable = pgTable("customer_inquiries", {
  inquiryId: uuid("inquiry_id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  customerId: uuid("customer").references(() => CustomerTable.customerId),
  recievedAt: timestamp("recieved_at"),
  status: varchar("status"),
  note: text("note"),
});

export const NewsLetterMailTable = pgTable("news_letter_mails", {
  mailId: serial("mail_id").primaryKey(),
  mail: varchar("mail"),
});

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  roleType: varchar("role_type"),
  name: text("name"),
  password: varchar("password").notNull(),
  phoneNumber: varchar("phone_number"),

  email: text("email").unique(),
  permission: varchar("permission"),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

//NO NEED --> all images are path
//based stored / storign and retrival will be done by
//ImageService utility file

// export const ServiceQuoteImageTable = pgTable(
//   "quotation_images",
//   {
//     quoteId: uuid("quote_id").references(() => ServiceQuoteTable.quoteId),
//     imagePath: varchar("img_path"),
//   },
//   (table) => {
//     return {
//       pk: primaryKey({ columns: [table.quoteId, table.imagePath] }),
//       pkWithCustomName: primaryKey({
//         name: "custom_name",
//         columns: [table.quoteId, table.imagePath],
//       }),
//     };
//   },
// );
