import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./Schema";
import postgres from "postgres";

const client = postgres(process.env.DB_URL!);
export const db = drizzle(client, { schema, logger: true });
