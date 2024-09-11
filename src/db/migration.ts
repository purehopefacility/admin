import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationCient = postgres(process.env.DB_URL as string, { max: 1 });

async function main() {
  await migrate(drizzle(migrationCient), {
    migrationsFolder: "./drizzle/",
  });

  await migrationCient.end();
}

main();
