import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModels";
import connect from "../../../../services/connectDb";
import decodeToken from "../../../../services/decodeToken";
import jwt from "jsonwebtoken";

connect();
export async function GET(req: NextRequest) {
   try {
      const { id, token } = await decodeToken(req, "refreshToken");

      const user = await User.findById(id).select("-password");
      if (!user) {
         return NextResponse.json({ error: "User not Found" }, { status: 404 });
      }

      if (token !== user.refreshToken) {
         return NextResponse.json(
            { error: "refreshToken dosen't match" },
            { status: 400 }
         );
      }

      const accesstoken = jwt.sign(
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

      user.refreshToken = undefined;

      const res = NextResponse.json(
         {
            data: user,
            message: "user fetched successfully",
            success: true,
         },
         { status: 200 }
      );

      res.cookies.set("accessToken", accesstoken, {
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
