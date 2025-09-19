"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = React.useState<any>(null);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // 📌 Fetch user details automatically on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setData(res.data.data);
      } catch (error: any) {
        console.log(error);
        toast.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover blur-md translate-y-15 translate-x-[-10px]"
      >
        <source src="/videos/grokper.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🖼️ Image container with username overlay */}
      <div
        className="relative z-10 flex items-center justify-center object-contain "
        style={{ width: "18.5cm", height: "12.5cm" }}
      >
        <img
          src="/images/2.png"
          alt="Overlay"
          className="absolute inset-0 h-full w-full object-contain"
        />

        {/* 👤 Username in center of 1.png */}
        {data && (
          <h2 className="absolute z-20 text-3xl font-extrabold text-white drop-shadow-lg">
            {data.username}
          </h2>
        )}
      </div>

      {/* 📌 Profile text (Top-Left) */}
      <h1 className="absolute top-6 left-6 z-20 text-2xl font-bold text-white">
        Profile
      </h1>

      {/* 🔘 Logout Button (Top-Right) */}
      <button
        onClick={logout}
        className="absolute top-6 right-6 z-20 rounded-lg bg-red-500/80 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
