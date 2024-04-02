import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModels";
import bcrypt from "bcryptjs";
import { transporter } from "../../../../services/email";
import connect from "../../../../services/connectDb";
import Verification from "../../../../models/verificationModels";

connect();

export async function POST(req: NextRequest) {
   try {
      const reqbody = await req.json();
      const { email } = reqbody;

      if (!email) {
         return NextResponse.json(
            { error: "Email id is Required", success: false },
            { status: 401 }
         );
      }

      const user = await User.findOne({ email });

      if (!user) {
         return NextResponse.json(
            { error: "Email id not found", success: false },
            { status: 401 }
         );
      }

      const token = await bcrypt.hash(user._id.toString(), 10);

      let savetoken = await Verification.findOne({ userId: user._id });

      if (!savetoken) {
         savetoken = await Verification.create({
            userId: user._id,
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: new Date(Date.now() + 900000),
         });
      } else if (savetoken.forgotPasswordTokenExpiry > Date.now()) {
         return NextResponse.json(
            {
               error: "Email is Already send to Email id, if you cannot find email check Spam folder, or wait for 15 min to resend email.",
               success: false,
            },
            { status: 403 }
         );
      } else {
         savetoken.forgotPasswordToken = token;
         savetoken.forgotPasswordTokenExpiry = new Date(Date.now() + 900000);
         await savetoken.save();
      }

      const sendMail = await transporter.sendMail({
         from: '"PS Blogs" <blogs@proteinslice.com>',
         to: email,
         subject: "Account Recovery",
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
        <h2>Verify your email to continoue</h2>
        <p>click <a href="${
           process.env.DOMAIN
        }/forgot-password?token=${token}">here</a> to Verify your email or copy and past this code in your browser</p>
        <p>${process.env.DOMAIN}/forgot-password/verify?token=${token}</p>
        <p>note that this email is valied for 15 min only</p>
        <p>If you have not requested account recovery you can safelt ignore this email.</p>
        <p>have a grate day</p>
    
        <h4>
            PS Blogs
        </h4>
    </body>
    </html>`,
      });

      return NextResponse.json(
         {
            message: "Account recovery email has been send successfully",
            success: true,
         },
         { status: 200 }
      );
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
