import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModels";
import { transporter } from "../../../../services/email";
import connect from "../../../../services/connectDb";
import Verification from "../../../../models/verificationModels";

connect();
export async function POST(req: NextRequest) {
   try {
      const reqbody = await req.json();
      const { token } = reqbody;

      if (!token) {
         return NextResponse.json(
            { error: "token is required" },
            { status: 401 }
         );
      }

      const findToken = await Verification.findOne({
         verifyToken: token,
         verifyTokenExpiry: { $gt: Date.now() },
      });
      if (!findToken) {
         return NextResponse.json(
            { error: "Token is Expired" },
            { status: 400 }
         );
      }

      const user = await User.findById(findToken.userId);

      user.isVerfied = true;
      await user.save();

      await Verification.findByIdAndDelete(findToken._id);

      const sendMail = await transporter.sendMail({
         from: '"PS Blogs" <blogs@proteinslice.com>',
         to: user.email,
         subject: "Email verified SussessFully",
         html: `<!DOCTYPE html>
         <html lang="en">
         <head>
            
             <style>
                 .heading{
                     color: rgb(8, 141, 8);
                     text-align: center;
                 }
             </style>
         </head>
         <body>
             <h1 class="heading">Hello ${user.firstName || "User"}</h1>
             <h2>Your Email is Verified Successfully</h2>
             <p>click <a href="${
                process.env.DOMAIN
             }/blogs">here</a> to Start reading blogs</p>
             <h4>
                 PS Blogs
             </h4>
         </body>
         </html>`,
      });

      return NextResponse.json(
         {
            message: "Email Verified successfully",
            success: true,
         },
         { status: 200 }
      );
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
