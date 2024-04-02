import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/userModels";
import bcrypt from "bcryptjs";
import { transporter } from "../../../../../services/email";
import connect from "../../../../../services/connectDb";
import Verification from "../../../../../models/verificationModels";

connect();

export async function POST(req: NextRequest) {
   try {
      const reqbody = await req.json();
      const { password, token } = reqbody;

      if (!password || !token) {
         return NextResponse.json(
            { error: "password and token is required", success: false },
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

      const findToken = await Verification.findOneAndDelete({
         forgotPasswordToken: token,
      });

      if (!findToken) {
         return NextResponse.json(
            { error: "user not found", success: false },
            { status: 401 }
         );
      }

      const hashPass = await bcrypt.hash(password, 10);

      const user = await User.findByIdAndUpdate(findToken.userId, {
         $set: {
            password: hashPass,
         },
      });

      return NextResponse.json(
         {
            message: "Account recovery successfully",
            success: true,
         },
         { status: 200 }
      );
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
