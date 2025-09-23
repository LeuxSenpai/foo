import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import UserStats from "@/models/userStats";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import countries from "country-flag-emoji-json"; // ✅ import country data

await connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password, position, nationality } = reqBody;

    // Input validation
    if (!username || !email || !password || !position || !nationality) {
      return NextResponse.json(
        { error: "Username, email, password, position, and nationality are required" },
        { status: 400 }
      );
    }

    // Lookup full country info by name
    const countryInfo = countries.find(
      (c) => c.name.toLowerCase() === nationality.toLowerCase()
    );

    if (!countryInfo) {
      return NextResponse.json(
        { error: "Invalid country name" },
        { status: 422 } // Unprocessable Entity
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Construct nationality object automatically
    const nationalityData = {
      code: countryInfo.code,
      name: countryInfo.name,
      emoji: countryInfo.emoji,
      image: countryInfo.image || null,
    };

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      position,
      nationality: nationalityData,
    });

    const savedUser = await newUser.save();

    // Create user stats
    const newStats = new UserStats({ userId: savedUser._id });
    const savedStats = await newStats.save();

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
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
