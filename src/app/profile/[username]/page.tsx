"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams(); // Get dynamic route params
  const username = params.username; // [username]

  const [data, setData] = useState<any>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Tooltip state (optional, can remove if not needed)
  const [tooltipText, setTooltipText] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const showTooltip = (text: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltipText(text);
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 10 });
  };

  const hideTooltip = () => {
    setTooltipText(null);
    setTooltipPos(null);
  };

  // Fetch user by username
  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${username}`); // API should return user by username
        setData(res.data.data);
        setProfilePic(res.data.data.profilePic);
        toast.success("Fetched User Successfully!");
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, [username]);

  if (!data) return <p className="text-white">Loading...</p>;

  return (
    <div className="relative flex flex-col min-h-screen items-center justify-start overflow-hidden pt-20">
      {/* Background Video */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/no.mp4" type="video/mp4" />
      </motion.video>

      {/* FIFA Card */}
      <motion.div
        className="relative z-10 flex items-center justify-center object-contain rounded-2xl overflow-hidden shadow-2xl mb-16"
        style={{ width: "18.5cm", height: "12.5cm", transform: "translateY(2rem)" }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src="/images/bronze.png"
          alt="Overlay"
          className="absolute inset-0 h-full w-full object-contain opacity-80"
        />

        {/* Profile Picture */}
        <div className="absolute top-[25%] left-[55%] -translate-x-1/2 flex flex-col items-center">
          {profilePic ? (
            <CldImage
              src={profilePic}
              width="128"
              height="128"
              crop="fill"
              gravity="face"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-black object-cover shadow-xl"
            />
          ) : (
            <img
              src="/images/default-avatar.png"
              alt="Default"
              className="w-32 h-32 rounded-full border-4 border-black object-cover shadow-xl"
            />
          )}
        </div>

        {/* Username */}
        <h2 className="absolute z-20 text-3xl font-extrabold text-yellow-400 drop-shadow-lg top-[calc(60%+1rem)] font-anton uppercase">
          {data.username}
        </h2>

        {/* Position */}
        <h3 className="absolute z-20 text-2xl font-extrabold text-black drop-shadow-lg top-[calc(60%-3rem)] left-[calc(42.5%-4rem)] -translate-y-25 uppercase">
          {data.position}
        </h3>

        {/* Nationality Flag */}
        {data.nationality?.image && (
          <img
            src={data.nationality.image}
            alt={data.nationality.name}
            className="absolute z-20 top-[calc(38%-1rem)] left-[calc(39.5%-4rem)] w-20 h-12 object-contain rounded-sm"
          />
        )}

        {/* Stats */}
        <div className="absolute z-20 top-[calc(57%+5rem)] font-extrabold left-1/2 -translate-x-1/2 flex flex-row items-center text-base gap-6 uppercase">
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
          <div className="flex flex-col items-center text-gray-300">
            <p>WR</p>
            <p>{data.userStats?.["Win Rate"] ?? 0}%</p>
          </div>
          <div className="flex flex-col items-center text-gray-300">
            <p>LIK</p>
            <p>{data.userStats?.Likeability ?? 0}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
