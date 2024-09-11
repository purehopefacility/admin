import type {NextAuthConfig} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {LoginFormSchema} from "@/schema/formSchema";
import {getUserByUsername} from "@/db/queries/select";
import {comparePassword} from "@/utils/passwordutils";
debug: process.env.NODE_ENV === 'development'
export default {
    providers:[
        Credentials({
            async authorize(credentials){
                const validatedFields = LoginFormSchema.safeParse(credentials);

                if(validatedFields.success){
                    const {username,password} = validatedFields.data;
                    const user = await getUserByUsername(username);

                    if(!user || !user.password) return null
                    const passwordMatch = await comparePassword(password, user.password)

                    if (passwordMatch) return user
                }
                return null
            }
        })
    ]
} satisfies NextAuthConfig