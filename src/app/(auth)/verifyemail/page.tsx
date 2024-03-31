"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function App() {
   const router = useRouter();
   const [token, setToken] = useState("");

   const onSubmit = async () => {
      const verifyemail = axios.post("/api/users/verifyemail", { token });

      toast.promise(
         verifyemail,
         {
            loading: "Loading",
            success: () => `Email Verify Successfull`,
            error: (error) => `${error.response.data.error}`,
         },
         {
            style: {
               minWidth: "250px",
            },
            success: {
               duration: 2000,
            },
         }
      );
      verifyemail
         .then((res) => {
            router.push("/");
         })
         .catch((error) => {
            console.log(error);
         });
   };

   useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
   }, []);

   return (
      <>
         <div className="bg-black/20 h-screen items-center justify-center flex">
            <button onClick={onSubmit}>Verify Email</button>
         </div>
      </>
   );
}
