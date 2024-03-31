import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModels";
import connect from "../../../../services/connectDb";
import decodeToken from "../../../../services/decodeToken";

connect();
export async function GET(req: NextRequest) {
   try {
      const {id} = await decodeToken(req, "accessToken");

      const user = await User.findById(id).select("-password -refreshToken");
      if (!user) {
         return NextResponse.json({ error: "User not Found" }, { status: 404 });
      }

      const res = NextResponse.json(
         {
            data: user,
            message: "user fetched successfully",
            success: true,
         },
         { status: 200 }
      );

      return res;
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
