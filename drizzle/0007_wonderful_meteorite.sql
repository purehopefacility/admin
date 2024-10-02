ALTER TABLE "slide_images" RENAME COLUMN "image_order" TO "slide_order";--> statement-breakpoint
ALTER TABLE "slide_images" RENAME COLUMN "image_desc_1" TO "slide_title_1";--> statement-breakpoint
ALTER TABLE "slide_images" RENAME COLUMN "image_desc_2" TO "slide_title_2";--> statement-breakpoint
ALTER TABLE "slide_images" ADD COLUMN "slide_desc" varchar;