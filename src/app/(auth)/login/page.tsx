"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
};

export default function App() {
   const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();

   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const requestLogin = axios.post("/api/users/login", data);

      toast.promise(
         requestLogin,
         {
            loading: "Loading",
            success: (data) => `Logged in Success`,
            error: (error) => `${error.response.data.error}`,
         },
         {
            style: {
               minWidth: "250px",
            },
            success: {
               duration: 2500,
            },
         }
      );

      requestLogin
         .then((res) => {
            if (!res.data.user.isVerfied) {
               toast("Email is not Verified", {
                  icon: "📩",
               });
            }
            router.push("/");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <>
         <div className="bg-black/20 items-center justify-center flex">
            <div className="p-4 w-full max-w-md h-full md:h-auto mt-20">
               <div className="bg-white rounded-lg shadow">
                  <div className="p-5">
                     <h3 className="text-2xl mb-0.5 font-medium" />
                     <p className="mb-4 text-sm font-normal text-gray-800" />
                     <div className="text-center">
                        <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                           Login to your account
                        </p>
                     </div>
                     <div className="mt-7 flex flex-col gap-2">
                        <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                           <img
                              src="https://www.svgrepo.com/show/512317/github-142.svg"
                              alt="GitHub"
                              className="h-[18px] w-[18px] "
                           />
                           Continue with GitHub
                        </button>
                        <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                           <img
                              src="https://www.svgrepo.com/show/475656/google-color.svg"
                              alt="Google"
                              className="h-[18px] w-[18px] "
                           />
                           Continue with Google
                        </button>
                        <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                           <img
                              src="https://www.svgrepo.com/show/448234/linkedin.svg"
                              alt="Google"
                              className="h-[18px] w-[18px] "
                           />
                           Continue with LinkedIn
                        </button>
                     </div>
                     <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                        <div className="h-px w-full bg-slate-200" />
                        OR
                        <div className="h-px w-full bg-slate-200" />
                     </div>
                     <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email" className="sr-only">
                           Email address
                        </label>
                        <input
                           type="email"
                           required={true}
                           className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                           placeholder="Email Address"
                           {...register("email", { required: true })}
                        />
                        {errors.email && (
                           <span className="text-sm text-red-500">
                              This field is required
                           </span>
                        )}

                        <label htmlFor="password" className="sr-only">
                           Password
                        </label>
                        <input
                           type="password"
                           className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                           placeholder="Password"
                           {...register("password", { required: true })}
                        />
                        {errors.password && (
                           <span className="text-sm text-red-500">
                              This field is required
                           </span>
                        )}

                        <p className="mb-3 mt-2 text-sm text-gray-500">
                           <Link
                              href="/forgot-password"
                              className="text-blue-800 hover:text-blue-600"
                           >
                              Reset your password?
                           </Link>
                        </p>
                        <button
                           type="submit"
                           className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                        >
                           Continue
                        </button>
                     </form>
                     <div className="mt-6 text-center text-sm text-slate-600">
                        Don't have an account?
                        <Link
                           href="/signup"
                           className="font-medium text-[#4285f4]"
                        >
                           Sign up
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
