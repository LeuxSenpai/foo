"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Profile</h1>
        <h2 className="mb-6 text-center">
  {data === "nothing" ? (
    <span className="rounded bg-gray-200 px-4 py-2 text-gray-700">nothing</span>
  ) : (
    <Link
      href={`/profile/${data}`}
      className="rounded bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
    >
      {data}
    </Link>
  )}
</h2>


        <div className="flex flex-col gap-4">
          <button
            onClick={getUserDetails}
            className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-green-600"
          >
            Get User Details
          </button>

          <button
            onClick={logout}
            className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
