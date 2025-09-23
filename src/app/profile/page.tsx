"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

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

      {/* 🖼️ Image container with username and stats */}
      <motion.div
        className="relative z-10 flex items-center justify-center object-contain rounded-2xl overflow-hidden shadow-2xl"
        style={{ width: "18.5cm", height: "12.5cm" }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Overlay */}
        <img
          src="/images/bronze.png"
          alt="Overlay"
          className="absolute inset-0 h-full w-full object-contain opacity-80"
        />

        {data && (
          <>
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
              className="absolute z-20 text-2xl font-extrabold text-black drop-shadow-lg top-[calc(60%-3rem)] left-[calc(42.5%-4rem)] -translate-y-25 uppercase"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {data.position}
            </motion.h3>

            {/* 🏳️ Nationality Flag */}
              {data.nationality?.image && (
                <motion.img
                  src={data.nationality.image}
                  alt={data.nationality.name}
                  className="absolute z-20 top-[calc(38%-1rem)] left-[calc(39.5%-4rem)] w-20 h-12 object-contain rounded-sm "
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                />
              )}

            {/* ⚽ User Stats */}
            <motion.div
              className="absolute z-20 top-[calc(57%+5rem)] font-extrabold left-1/2 -translate-x-1/2 flex flex-row items-center text-base gap-6 font-anton uppercase"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { label: "G", value: data.userStats?.Goals ?? 0 },
                { label: "MOM", value: data.userStats?.["Man of the Match"] ?? 0 },
                { label: "MP", value: data.userStats?.["Matches Played"] ?? 0 },
                { label: "WR", value: `${data.userStats?.["Win Rate"] ?? 0}%`, blur: true },
                { label: "LIK", value: data.userStats?.Likeability ?? 0, blur: true },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className={`flex flex-col items-center ${stat.blur ? "text-gray-300 blur-sm" : "text-white"}`}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <p>{stat.label}</p>
                  <p>{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
