import NextAuth from "next-auth"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/db/DB";
import authConfig from "@/auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter:DrizzleAdapter(db),
    session:{
        strategy:'jwt',
        maxAge:432000
    },
    ...authConfig
})