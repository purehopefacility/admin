"use server"

import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";
import {LoginFormSchema} from "@/schema/formSchema";
import {z} from "zod";

export const login = async (values:z.infer<typeof LoginFormSchema>) => {
    const validatedFields = LoginFormSchema.safeParse(values)

    if(!validatedFields.success){
        return {error:'Invalid Fields'}
    }
    const {username,password} = validatedFields.data;
    try {
        await signIn('credentials',{
            username,
            password,
            redirectTo:DEFAULT_LOGIN_REDIRECT
        });
        return {success:"Welcome"}
    } catch (error) {
        if (error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                    return {error:'Invalid Credential'}
                default:
                    return {error: 'Something went wrong'}
            }
        }

        throw error

    }
}