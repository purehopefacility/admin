CREATE TABLE IF NOT EXISTS "slide_images" (
	"image_id" serial PRIMARY KEY NOT NULL,
	"image_url" varchar NOT NULL,
	"image_order" integer NOT NULL,
	"image_desc_1" varchar,
	"image_desc_2" varchar,
	"button_txt" varchar,
	"button_link" varchar
);
