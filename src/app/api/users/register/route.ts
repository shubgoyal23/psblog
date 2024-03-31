import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModels";
import bcrypt from "bcryptjs";
import { transporter } from "../../../../services/email";
import connect from "../../../../services/connectDb";
import Verification from "../../../../models/verificationModels";

connect();
export async function POST(req: NextRequest, res: NextResponse) {
   try {
      const reqbody = await req.json();
      const { email, password, firstName, lastName } = reqbody;

      if (!email || !password) {
         return NextResponse.json(
            { error: "Email and Password is required" },
            { status: 401 }
         );
      }

      const checkPassword =
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            password
         );
      if (!checkPassword) {
         return NextResponse.json(
            {
               error: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
            },
            { status: 400 }
         );
      }

      const user = await User.findOne({ email });

      if (user) {
         return NextResponse.json(
            { error: "User with Email already exists" },
            { status: 400 }
         );
      }

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const newUser = new User({
         firstName,
         lastName,
         email,
         password: hashPass,
      });

      const savedUser = await newUser.save();

      const token = await bcrypt.hash(savedUser._id.toString(), 10);

      const sendMail = await transporter.sendMail({
         from: '"PS Blogs" <blogs@proteinslice.com>',
         to: email,
         subject: "Email Verification Code",
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
             <h1 class="heading">Hello ${firstName || "User"}</h1>
             <h2>Verify your email to continoue</h2>
             <p>click <a href="${
                process.env.DOMAIN
             }/verifyemail?token=${token}">here</a> to Verify your email or copy and past this code in your browser</p>
             <p>${process.env.DOMAIN}/verifyemail?token=${token}</p>
             <p>note that this email is valied for 15 min only</p>
         
             <h4>
                 PS Blogs
             </h4>
         </body>
         </html>`,
      });

      const saveToken = new Verification({
         userId: savedUser._id,
         verifyToken: token,
         verifyTokenExpiry: Date.now() + 900000,
      });

      await saveToken.save();

      savedUser.password = "";
      return NextResponse.json(
         {
            message: "User created successfully",
            success: true,
            savedUser,
         },
         { status: 200 }
      );
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
