import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';


await connect();

export async function GET(request: NextRequest) { //api created to fetch all users
  try {
    const userId = getDataFromToken(request);

    // Fetch user including userStats
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "user found",
      data: user, // userStats is included automatically
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
