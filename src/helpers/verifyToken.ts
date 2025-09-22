import jwt from "jsonwebtoken"; //verify token if not then logout at lib
import { NextResponse } from "next/server";

export function verifyToken(req: any) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) throw new Error("No token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (err: any) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
