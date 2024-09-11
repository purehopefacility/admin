CREATE TABLE IF NOT EXISTS "customers" (
	"customer_id" uuid PRIMARY KEY NOT NULL,
	"customer_name" varchar NOT NULL,
	"email" varchar,
	"phone_number" varchar,
	"registered_at" timestamp,
	"address" varchar,
	"feedback" varchar,
	CONSTRAINT "customers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer_inquiries" (
	"inquiry_id" uuid PRIMARY KEY NOT NULL,
	"customer" uuid,
	"recieved_at" timestamp,
	"status" varchar,
	"note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news_letter_mails" (
	"mail_id" serial PRIMARY KEY NOT NULL,
	"mail" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services_category" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"category_title" varchar NOT NULL,
	"category_order" integer NOT NULL,
	"category_desc" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quotations" (
	"quote_id" uuid PRIMARY KEY NOT NULL,
	"service_id" integer,
	"customer" uuid,
	"recieved_at" timestamp,
	"status" varchar,
	"note" text,
	"images" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services" (
	"service_id" serial PRIMARY KEY NOT NULL,
	"service_order" integer NOT NULL,
	"service_category" integer,
	"service_title_1" varchar NOT NULL,
	"service_title_2" varchar NOT NULL,
	"service_img" varchar,
	"service_cover_img" varchar,
	"service_desc" text,
	"status" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"credentialID" text NOT NULL,
	"userId" uuid NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"role_type" varchar,
	"name" text,
	"password" varchar NOT NULL,
	"phone_number" varchar,
	"email" text,
	"permission" varchar,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer_inquiries" ADD CONSTRAINT "customer_inquiries_customer_customers_customer_id_fk" FOREIGN KEY ("customer") REFERENCES "public"."customers"("customer_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quotations" ADD CONSTRAINT "quotations_service_id_services_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("service_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quotations" ADD CONSTRAINT "quotations_customer_customers_customer_id_fk" FOREIGN KEY ("customer") REFERENCES "public"."customers"("customer_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "services" ADD CONSTRAINT "services_service_category_services_category_category_id_fk" FOREIGN KEY ("service_category") REFERENCES "public"."services_category"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
