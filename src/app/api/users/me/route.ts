import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

await connect();

export async function PUT(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const { profilePic } = await request.json();

    if (!profilePic) {
      return NextResponse.json({ error: "Profile picture URL is required" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated",
      data: updatedUser,
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      const response = NextResponse.json(
        { error: "Token expired, please log in again" },
        { status: 401 }
      );
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      return response;
    }

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      const response = NextResponse.json(
        { error: "Token expired, please log in again" },
        { status: 401 }
      );
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      return response;
    }

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
