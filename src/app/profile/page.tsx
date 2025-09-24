"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CldImage } from "next-cloudinary";

export default function Profile() {
  const [data, setData] = useState<any>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Tooltip state
  const [tooltipText, setTooltipText] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const showTooltip = (text: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltipText(text);
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 10 });
  };

  const hideTooltip = () => {
    setTooltipText(null);
    setTooltipPos(null);
  };

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setData(res.data.data);
        setProfilePic(res.data.data.profilePic);
        toast.success("Fetched User Successfully!");
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Handle Cloudinary upload + backend update
  const handleUpload = async () => {
    if (!image) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      const imageUrl = data.secure_url;
      if (!imageUrl) throw new Error("Upload failed");

      setProfilePic(imageUrl);
      await axios.put("/api/users/me", { profilePic: imageUrl });
      toast.success("Profile picture updated!");
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  if (!data) return null;

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
        Your browser does not support the video tag.
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
        <motion.div
          className="absolute top-[25%] left-[55%] -translate-x-1/2 flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer"
              onClick={() => document.getElementById("upload-input")?.click()}
            >
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
            </motion.div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="upload-input"
            />

            {image && (
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="mt-2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-md"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            )}
          </div>
        </motion.div>

        {/* Username */}
        <motion.h2
          className="absolute z-20 text-3xl font-extrabold text-yellow-400 drop-shadow-lg top-[calc(60%+1rem)] font-anton uppercase"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {data.username}
        </motion.h2>

        {/* Position */}
        <motion.h3
          className="absolute z-20 text-2xl font-extrabold text-black drop-shadow-lg top-[calc(60%-3rem)] left-[calc(42.5%-4rem)] -translate-y-25 uppercase cursor-pointer"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onMouseEnter={(e) => showTooltip("This is your position", e)}
          onMouseLeave={hideTooltip}
        >
          {data.position}
        </motion.h3>

        {/* Nationality Flag */}
        {data.nationality?.image && (
          <motion.img
            src={data.nationality.image}
            alt={data.nationality.name}
            className="absolute z-20 top-[calc(38%-1rem)] left-[calc(39.5%-4rem)] w-20 h-12 object-contain rounded-sm cursor-pointer"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            onMouseEnter={(e) => showTooltip("Nationality here", e)}
            onMouseLeave={hideTooltip}
          />
        )}

        {/* Stats */}
        <motion.div
          className="absolute z-20 top-[calc(57%+5rem)] font-extrabold left-1/2 -translate-x-1/2 flex flex-row items-center text-base gap-6 uppercase"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { label: "G", value: data.userStats?.Goals ?? 0, tooltip: "Total Goals" },
            { label: "MOM", value: data.userStats?.["Man of the Match"] ?? 0, tooltip: "Man of the Match Awards" },
            { label: "MP", value: data.userStats?.["Matches Played"] ?? 0, tooltip: "Matches Played" },
            { label: "WR", value: `${data.userStats?.["Win Rate"] ?? 0}%`, tooltip: "Win Rate" },
            { label: "LIK", value: `${data.userStats?.["Likeability"] ?? 0}%`, tooltip: "Likeability Score", blur: false },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className={`flex flex-col items-center cursor-pointer ${stat.blur ? "text-gray-300 blur-sm" : "text-gray-300"}`}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200 }}
              onMouseEnter={(e) => showTooltip(stat.tooltip, e)}
              onMouseLeave={hideTooltip}
            >
              <p>{stat.label}</p>
              <p className="text-black">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltipText && tooltipPos && (
          <motion.div
            className="fixed bg-black text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-50"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: "translateX(-50%)",
            }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0 }}
          >
            {tooltipText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
