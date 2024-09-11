import {db} from "@/db/DB";
import {eq} from "drizzle-orm";
import {users} from "@/db/Schema";

export async function getUserByUsername(username:string) {
    return db.query.users.findFirst({
        where:eq(users.name,username)
    })
}