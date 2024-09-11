import { z } from "zod";

export const LoginFormSchema = z.object({
    username:z.string().min(3,{message:'Enter Valid username'}).max(20),
    password:z.string().min(1,{message:'Password is required'}),
})

export const RegisterFromSchema = z.object({
    email:z.string().email({message:'Enter Valid Email'}),
    username:z.string().min(3,{message:'Enter Valid Username'}).max(20),
    password:z.string().min(1,{message:'Password is required'}),
    confirmPassword:z.string().min(1,{message:'Enter your password again'}),
}).refine(data => data.password === data.confirmPassword,{
    path: ['confirmPassword'],
    message:'Passwords are not matching',
})