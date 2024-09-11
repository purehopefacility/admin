'use client'

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {LoginFormSchema} from "@/schema/formSchema";
import {useTransition} from "react";
import {login} from "../../../../actions/login";

type LoginFormInputs = z.infer<typeof LoginFormSchema>;

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues:{
            username: "",
            password: "",
        }
    });

    const onSubmit = (data: LoginFormInputs) => {
        console.log("Login Data:", data);
        startTransition(() => {
            login(data)
                .then(data => console.debug("Login:",data))
        })

    };

    return (
        <div className="flex justify-center items-center h-screen bg-white">
        <div className=" bg-[#003047] p-6 rounded shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="text-white flex justify-center text-3xl">Admin Login</div>
            <div className="flex flex-col">
                <label className="text-white ">Username</label>
                <input
                    type="text"
                    disabled={isPending}
                    {...register("username")}
                    className="rounded-sm h-8 p-2"
                />
                {errors.username && (
                    <p className="text-red-500">{errors.username.message}</p>
                )}
            </div>

            <div className="flex flex-col">
                <label className="text-white ">Password</label>
                <input
                    type="password"
                    disabled={isPending}
                    {...register("password")}
                    className="rounded-sm h-8 p-2"
                />
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}
            </div>
            <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Login
            </button>
            </div>
        </form>
        </div>
        </div>
    );
};

export default LoginForm;