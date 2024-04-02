"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

type Inputs = {
   email: string;
};

export default function App() {
   const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const verifyemail = axios.post("/api/users/resetpassword", data);

      toast.promise(
         verifyemail,
         {
            loading: "Loading",
            success: () =>
               `An account recovery email has been send to the email address (${data.email}). Kindly review your inbox to facilitate further proceedings.`,
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
      verifyemail
         .then((res) => {
            router.push("/login");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   return (
      <>
         <div className="items-center justify-center flex mt-10">
            <div className="p-4 w-full max-w-md h-full md:h-auto mt-20">
               <div className="dark:bg-white/20 bg-white rounded-lg shadow">
                  <div className="p-5">
                     <h3 className="text-2xl mb-0.5 font-medium" />
                     <p className="mb-4 text-sm font-normal text-gray-800 dark:text-gray-200" />
                     <div className="text-center">
                        <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900 dark:text-gray-100">
                           Recover Your Account
                        </p>
                     </div>

                     <form
                        className="w-full mt-10"
                        onSubmit={handleSubmit(onSubmit)}
                     >
                        <label htmlFor="email" className="sr-only">
                           Email address
                        </label>
                        <input
                           type="email"
                           required={true}
                           className="block w-full rounded-lg border dark:bg-black/20 border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                           placeholder="Email Address"
                           {...register("email", {
                              required: true,
                              pattern: {
                                 value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                 message: "Invalid email address",
                              },
                           })}
                        />
                        {errors.email && (
                           <span className="text-sm text-red-500">
                              {errors.email.message}
                           </span>
                        )}

                        <button
                           type="submit"
                           className="inline-flex w-full mt-6 items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                        >
                           Send Recovery Email
                        </button>
                     </form>
                     <div className="mt-6 text-center text-sm text-slate-600 dark:text-gray-400">
                        Go Back To{" "}
                        <Link
                           href="/login"
                           className="font-medium text-[#4285f4]"
                        >
                           Login Page
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
