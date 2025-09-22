import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import UserStats from "@/models/userStats";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

await connect();

// Syntax for handling POST request
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, position } = reqBody;
    console.log(reqBody);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      position,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Create corresponding UserStats
    const newStats = new UserStats({
      userId: savedUser._id, // link stats to the new user
    });

    const savedStats = await newStats.save();
    console.log(savedStats);

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: savedUser,
        stats: savedStats,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
