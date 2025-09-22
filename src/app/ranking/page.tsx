"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

interface User {
  username: string;
  position?: number;
  nationality?: string;
  value?: number;
  userStats?: {
    Goals?: number;
    "Man of the Match"?: number;
    "Matches Played"?: number;
    "Win Rate"?: number;
    Likeability?: number;
  };
}

export default function Ranking() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data.data || []);
        toast.success("Fetched Users Successfully!");
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const topThree = users.slice(0, 3);
  const rest = users.slice(3);

  // Variants for top 3 cards
  const cardVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.2, type: "spring", stiffness: 100 },
    }),
  };

  // Variants for table rows
  const rowVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.05, type: "spring", stiffness: 80 },
    }),
  };

  // Array of different images for top 3
  const topThreeImages = [
    "/images/1st.png", // 1st place image
    "/images/2nd.png", // 2nd place image
    "/images/3rd.png", // 3rd place image
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start bg-transparent p-6 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full object-cover z-0 translate-y-6 translate-x-[-10px]"
      >
        <source src="/videos/no.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8 mt-12">
          <h1 className="text-4xl font-bold text-white mb-2 p-2 rounded-lg">
            ᴛꜰᴄ ʀᴀɴᴋɪɴɢꜱ
          </h1>
          <p className="text-gray-400 text-sm p-2 rounded-lg">
            Explore the complete ratings for the players available.
          </p>
        </div>

        {/* Top 3 Horizontal Cards */}
        {topThree.length > 0 && (
          <div className="mb-6 flex justify-center relative">
            {/* Container to allow overlapping heights */}
            <div className="flex flex-nowrap items-end space-x-4">
              {topThree.map((user, idx) => {
                // Position offsets for podium effect
                const positions = [
                  { y: -20, zIndex: 30 }, // 1st place: highest
                  { y: 10, zIndex: 20 },  // 2nd place: left, slightly lower
                  { y: 20, zIndex: 10 },  // 3rd place: right, lowest
                ];

                const styleOffset = positions[idx] || { y: 0, zIndex: 0 };

                return (
                  <motion.div
                    key={idx}
                    className="relative flex flex-col items-center"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: styleOffset.y, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: idx * 0.2 }}
                    style={{ zIndex: styleOffset.zIndex }}
                  >
                    <span className="text-2xl font-extrabold text-yellow-400 mb-2">
                      Rank {idx + 1}
                    </span>
                    <div
                      className="relative z-10 flex items-center justify-center object-contain"
                      style={{ width: "9.5cm", height: "12.5cm" }}
                    >
                      <img
                        src={topThreeImages[idx]} // Dynamically assign image based on rank
                        alt={`Overlay for Rank ${idx + 1}`}
                        className="absolute object-contain opacity-80"
                      />
                      <div className="relative z-20">
                        <h2 className="absolute text-3xl font-extrabold text-yellow-400 drop-shadow-lg top-[calc(58%+1rem)] left-[calc(50%-4rem)] font-anton uppercase">
                          {user.username}
                        </h2>
                        <h3 className="absolute text-2xl font-extrabold text-amber-200 drop-shadow-lg top-[calc(50%-3rem)] left-[calc(45%-4rem)] -translate-y-25 font-anton uppercase">
                          {user.position || "N/A"}
                        </h3>
                        <div className="absolute z-20 top-[calc(57%+5rem)] font-extrabold left-1/2 -translate-x-1/2 flex flex-row items-center text-base gap-4 font-anton uppercase">
                          <div className="flex flex-col items-center text-white">
                            <p>G</p>
                            <p>{user.userStats?.Goals ?? 0}</p>
                          </div>
                          <div className="flex flex-col items-center text-white">
                            <p>MOM</p>
                            <p>{user.userStats?.["Man of the Match"] ?? 0}</p>
                          </div>
                          <div className="flex flex-col items-center text-white">
                            <p>MP</p>
                            <p>{user.userStats?.["Matches Played"] ?? 0}</p>
                          </div>
                          <div className="flex flex-col items-center text-gray-300 blur-[2.5px]">
                            <p>WR</p>
                            <p>{user.userStats?.["Win Rate"] ?? 0}%</p>
                          </div>
                          <div className="flex flex-col items-center text-gray-300 blur-[2.5px]">
                            <p>LIK</p>
                            <p>{user.userStats?.Likeability ?? 0}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Rankings Table Header */}
        <div className="bg-black/20 backdrop-blur-md rounded-t-lg overflow-hidden mb-0">
          <div className="flex justify-between px-4 py-2 text-green-500 font-semibold bg-black/30">
            <span className="w-8 flex-shrink-0">RANK</span>
            <span className="w-150 flex-shrink-1">PLAYER</span>
            <span className="w-10 flex-shrink-0">NAT</span>
            <span className="w-20 flex-shrink-0">POS</span>
          </div>
        </div>

        {/* Rest of the Rankings */}
        <div className="bg-black/20 backdrop-blur-md rounded-b-lg divide-y divide-gray-700/50 max-h-96 overflow-y-auto">
          {rest.length > 0 &&
            rest.map((user, idx) => (
              <motion.div
                key={idx + 3}
                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-700/20"
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={rowVariants}
              >
                <span className="w-8 flex-shrink-0 text-yellow-400 font-bold">
                  {idx + 4}
                </span>
                <div className="flex-1 flex items-center px-2">
                  <div className="w-8 h-8 bg-gray-600 rounded-full mr-2"></div>
                  <span>{user.username}</span>
                </div>
                <span className="w-16 flex-shrink-0">N/A</span>
                <span className="w-20 flex-shrink-0">{user.position || "N/A"}</span>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}

// Variants for table rows (placed outside component to keep CSS untouched)
const rowVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.05, type: "spring", stiffness: 80 },
  }),
};