import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import connect from "@/services/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(req: NextRequest) {
   try {
      const reqbody = await req.json();
      const { email, password } = reqbody;

      if (!email || !password) {
         return NextResponse.json(
            { error: "Email and Password is required" },
            { status: 401 }
         );
      }

      const user = await User.findOne({
         email,
      });

      if (!user) {
         return NextResponse.json({ error: "User not Found" }, { status: 404 });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
         return NextResponse.json(
            { error: "Incorrect Password" },
            { status: 401 }
         );
      }

      const token = jwt.sign(
         { _id: user._id },
         process.env.ACCESS_TOKEN_SECRET!,
         { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      );
      const refreshToken = jwt.sign(
         { _id: user._id },
         process.env.REFRESH_TOKEN_SECRET!,
         { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      );

      user.refreshToken = refreshToken;
      await user.save();

      user.password = undefined;
      user.refreshToken = undefined;

      const res = NextResponse.json(
         {
            user: user,
            message: "user Loggedin successfully",
            success: true,
         },
         { status: 200 }
      );
      res.cookies.set("accessToken", token, {
         httpOnly: true,
         secure: true,
         expires: new Date(Date.now() + 86400000),
      });
      res.cookies.set("refreshToken", refreshToken, {
         httpOnly: true,
         secure: true,
         expires: new Date(Date.now() + 864000000),
      });

      return res;
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
