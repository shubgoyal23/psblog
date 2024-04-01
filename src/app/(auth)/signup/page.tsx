"use client";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
      const registeruser = axios.post("/api/users/register", data);

      toast.promise(
         registeruser,
         {
            loading: "Loading",
            success: (res) =>
               `Hello ${res.data.savedUser.firstName || "User"}! Your Account is Created successfully! Please proceed to log in to continue. Also check you Email to verify your Account`,
            error: (error) => `${error.response.data.error}`,
         },
         {
            style: {
               minWidth: "250px",
            },
            success: {
               duration: 5000,
            },
         }
      );

      registeruser
         .then((res) => {
            router.push("/login");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <>
         <div className="items-center justify-center flex">
            <div className="p-4 w-full max-w-md h-full md:h-auto mt-20">
               <div className="dark:bg-white/20 bg-white rounded-lg shadow">
                  <div className="p-5">
                     <h3 className="text-2xl mb-0.5 font-medium" />
                     <p className="mb-4 text-sm font-normal text-gray-800 dark:text-gray-200" />
                     <div className="text-center">
                        <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900 dark:text-gray-100">
                           Create an Account
                        </p>
                     </div>
                     <div className="mt-7 flex flex-col gap-2">
                        <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-white/10 p-2 text-sm font-medium text-gray-800 dark:text-gray-300 outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                           <img
                              src="https://www.svgrepo.com/show/512317/github-142.svg"
                              alt="GitHub"
                              className="h-[18px] w-[18px] "
                           />
                           Continue with GitHub
                        </button>
                        <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-white/10 p-2 text-sm font-medium text-gray-800 dark:text-gray-300 outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                           <img
                              src="https://www.svgrepo.com/show/475656/google-color.svg"
                              alt="Google"
                              className="h-[18px] w-[18px] "
                           />
                           Continue with Google
                        </button>
                        <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-white/10 p-2 text-sm font-medium text-gray-800 dark:text-gray-300 outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
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
                        <div className="flex gap-2">
                           <div className="flex-1">
                              <label htmlFor="firstName" className="sr-only">
                                 First Name
                              </label>
                              <input
                                 type="text"
                                 className="block mt-2 w-full rounded-lg border dark:bg-black/20 border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                 placeholder="First Name"
                                 {...register("firstName", { required: true })}
                              />
                              {errors.firstName && (
                                 <span className="text-sm text-red-500">
                                    This field is required
                                 </span>
                              )}
                           </div>
                           <div className="flex-1">
                              <label htmlFor="lastName" className="sr-only">
                                 Last Name
                              </label>
                              <input
                                 type="text"
                                 className="block mt-2 w-full rounded-lg border dark:bg-black/20 border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                 placeholder="Last Name"
                                 {...register("lastName", { required: true })}
                              />
                              {errors.lastName && (
                                 <span className="text-sm text-red-500">
                                    This field is required
                                 </span>
                              )}
                           </div>
                        </div>
                        <label htmlFor="email" className="sr-only">
                           Email address
                        </label>
                        <input
                           type="email"
                           required={true}
                           className="block mt-2 w-full rounded-lg border dark:bg-black/20 border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
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
                           className="mt-2 block w-full rounded-lg border dark:bg-black/20 border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                           placeholder="Password"
                           {...register("password", { required: true })}
                        />
                        {errors.password && (
                           <span className="text-sm text-red-500">
                              This field is required
                           </span>
                        )}

                        <button
                           type="submit"
                           className="inline-flex mt-2 w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                        >
                           Create Account
                        </button>
                     </form>
                     <div className="mt-6 text-center text-sm text-slate-600 dark:text-gray-400">
                        Already have an account? {" "}
                        <Link
                           href="/login"
                           className="font-medium text-[#4285f4]"
                        >
                           Login
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
