"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Profile() {
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setData(res.data.data);
        toast.success("Fetched User Successfully!");
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
    className="absolute inset-0 h-full w-full object-cover blur-[0.5] translate-y-15 translate-x-[-10px]"
  >
    <source src="/videos/no.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* 🖼️ Image container with username and position overlay */}
  <div
    className="relative z-10 flex items-center justify-center object-contain"
    style={{ width: "18.5cm", height: "12.5cm" }}
  >
    <img
      src="/images/2.png"
      alt="Overlay"
      className="absolute inset-0 h-full w-full object-contain opacity-80"
    />
    {data && (
      <>
        <h2 className="absolute z-20 text-3xl font-extrabold text-yellow-400 drop-shadow-lg top-[calc(60%+1rem)] font-anton uppercase">
          {data.username}
        </h2>
        <h3 className="absolute z-20 text-2xl font-extrabold text-amber-200 drop-shadow-lg top-[calc(50%-3rem)] left-[calc(45%-4rem)] -translate-y-25 font-anton uppercase">
          {data.position}
        </h3>

        {/* ⚽ User Stats */}
        <div className="absolute z-20 top-[calc(57%+5rem)] font-extrabold left-1/2 -translate-x-1/2 flex flex-row items-center text-base gap-4 font-anton uppercase">
          <div className="flex flex-col items-center text-white">
            <p>G</p>
            <p>{data.userStats?.Goals ?? 0}</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <p>MOM</p>
            <p>{data.userStats?.["Man of the Match"] ?? 0}</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <p>MP</p>
            <p>{data.userStats?.["Matches Played"] ?? 0}</p>
          </div>
          <div className="flex flex-col items-center text-gray-300 blur-[2.5px]">
            <p>WR</p>
            <p>{data.userStats?.["Win Rate"] ?? 0}%</p>
          </div>
          <div className="flex flex-col items-center text-gray-300 blur-[2.5px]">
            <p>LIK</p>
            <p>{data.userStats?.Likeability ?? 0}</p>
          </div>
        </div>
      </>
    )}
  </div>
</div>
  );
}
