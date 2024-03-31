import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModels";
import connect from "../../../../services/connectDb";

connect();
export async function POST(req: NextRequest) {
   try {
      const reqbody = await req.json();
      const { id } = reqbody;

      if (!id) {
         return NextResponse.json(
            { error: "unauthorised Request" },
            { status: 403 }
         );
      }

      const user = await User.findByIdAndUpdate(id, {
         $unset: { refreshToken: 1 },
      });

      if (!user) {
         return NextResponse.json({ error: "User not Found" }, { status: 404 });
      }

      const res = NextResponse.json(
         {
            message: "user Logged out successfully",
            success: true,
         },
         { status: 200 }
      );

      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
