import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

await connect();

export async function GET(request: NextRequest) {
  try {
    // Fetch all users, excluding sensitive fields like password, email, etc.
    const users = await User.find({})
      .select("-password -email -__v") // Exclude fields you don’t want exposed
      .lean();

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    // Optional: Sort users based on stats (e.g., Goals, Win Rate, etc.)
    // Example: Sort by "Goals" descending
    const sortedUsers = users.sort((a: any, b: any) => {
      const goalsA = a.userStats?.Goals || 0;
      const goalsB = b.userStats?.Goals || 0;
      return goalsB - goalsA; // higher goals first
    });

    return NextResponse.json({
      message: "Users fetched successfully",
      data: sortedUsers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
