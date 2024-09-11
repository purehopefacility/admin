import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/Schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
});
