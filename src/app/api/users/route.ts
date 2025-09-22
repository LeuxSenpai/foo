import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';

await connect();

export async function GET(request: NextRequest) {
  try {
    // Fetch all users, selecting only username and position (exclude password)
    const users = await User.find().select('username position -_id').sort({ position: 1 });

    return NextResponse.json({
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}