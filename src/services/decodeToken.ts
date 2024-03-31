import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export default async function decodeToken(request: NextRequest, tokenName: string) {
   try {
      const token = request.cookies.get(tokenName)?.value || "";
      const key =
         tokenName === "accessToken"
            ? process.env.ACCESS_TOKEN_SECRET
            : process.env.REFRESH_TOKEN_SECRET;

      const decodeToken: any = jwt.verify(token, key!);

      return {id: decodeToken._id, token};
   } catch (error: any) {
      throw new Error(error.message);
   }
}
