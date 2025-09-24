import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';

await connect();

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params;
    const userId = getDataFromToken(request);
    const updateData = await request.json();

    // Verify the user is updating their own profile
    const currentUser = await User.findById(userId);
    if (!currentUser || currentUser.username !== username) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    // Allowed fields to update
    const allowedFields = ['profilePic', 'position', 'nationality', 'name', 'bio'];
    const updateFields: any = {};

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        updateFields[key] = updateData[key];
      }
    });

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
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

export async function DELETE(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params;
    const userId = getDataFromToken(request);

    // Verify the user is deleting their own profile
    const currentUser = await User.findById(userId);
    if (!currentUser || currentUser.username !== username) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Clear the token cookie
    const response = NextResponse.json({
      message: "User deleted successfully",
    });
    
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
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