CREATE TABLE IF NOT EXISTS "customer_feedbacks" (
	"avatar" varchar,
	"registered_at" timestamp,
	"rating" integer,
	"feedback" varchar,
	"position" varchar
);
--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "avatar";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "rating";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "feedback";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN IF EXISTS "position";

ALTER TABLE "customer_feedbacks" ADD COLUMN "customer_name" varchar;
ALTER TABLE "customer_feedbacks" ALTER COLUMN "registered_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "customer_feedbacks" ADD COLUMN "feedback_id" serial PRIMARY KEY NOT NULL;
