"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

interface User {
  username: string;
  profilePic?: string;
  position?: string;
  nationality?: {
    code: string;
    name: string;
    image: string;
  };
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

        console.log("Fetched /api/users response:", res.data);

        setUsers(res.data.data || []);
        toast.success("Fetched Users Successfully!");
      } catch (error: any) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const topThree = users.slice(0, 3);
  const rest = users.slice(3);

  const topThreeImages = [
    "/images/1st.png",
    "/images/2nd.png",
    "/images/3rd.png",
  ];

  if (loading) return <p className="text-white">Loading...</p>;
  if (!users.length) return <p className="text-red-500">No users found</p>;

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

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <div className="mb-6 flex justify-center relative">
            <div className="flex flex-nowrap items-end space-x-4">
              {topThree.map((user, idx) => {
                const positions = [
                  { y: -20, zIndex: 30 },
                  { y: 10, zIndex: 20 },
                  { y: 20, zIndex: 10 },
                ];
                const styleOffset = positions[idx] || { y: 0, zIndex: 0 };

                return (
                  <motion.div
                    key={idx}
                    className="relative flex flex-col items-center"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: styleOffset.y, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      delay: idx * 0.2,
                    }}
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
                        src={topThreeImages[idx]}
                        alt={`Overlay for Rank ${idx + 1}`}
                        className="absolute object-contain opacity-80"
                      />

                      <Link
                        href={`/profile/${user.username}`}
                        className="relative z-20 flex flex-col items-center"
                      >
                        {/* Profile Pic */}
                        {user.profilePic ? (
                          <CldImage
                            src={user.profilePic}
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

                        {/* Username */}
                        <h2 className="text-3xl font-extrabold text-yellow-400 drop-shadow-lg font-anton uppercase mt-4">
                          {user.username}
                        </h2>

                        {/* Position */}
                        <h3 className="text-2xl font-extrabold text-amber-200 drop-shadow-lg font-anton uppercase">
                          {user.position || "N/A"}
                        </h3>

                        {/* Nationality */}
                        {user.nationality?.image ? (
                          <img
                            src={user.nationality.image}
                            alt={user.nationality.name}
                            className="w-12 h-8 mt-2 object-contain rounded-sm"
                          />
                        ) : (
                          <p className="text-sm text-gray-300 mt-2">N/A</p>
                        )}
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Rankings Table */}
        <div className="bg-black/20 backdrop-blur-md rounded-lg divide-y divide-gray-700/50 max-h-96 overflow-y-auto">
          {rest.map((user, idx) => (
            <motion.div
              key={idx + 3}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05, type: "spring", stiffness: 80 }}
            >
              <Link
                href={`/profile/${user.username}`}
                className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-700/20 cursor-pointer"
              >
                <span className="w-8 flex-shrink-0 text-yellow-400 font-bold">
                  {idx + 4}
                </span>

                {/* Profile pic + username */}
                <div className="flex-1 flex items-center px-2">
                  {user.profilePic ? (
                    <CldImage
                      src={user.profilePic}
                      width="32"
                      height="32"
                      crop="fill"
                      gravity="face"
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                  ) : (
                    <img
                      src="/images/default-avatar.png"
                      alt="Default"
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                  )}
                  <span>{user.username}</span>
                </div>

                {/* Nationality */}
                <span className="w-16 flex-shrink-0 flex justify-center">
                  {user.nationality?.image ? (
                    <img
                      src={user.nationality.image}
                      alt={user.nationality.name}
                      className="w-8 h-6 object-contain rounded-sm"
                    />
                  ) : (
                    "N/A"
                  )}
                </span>

                {/* Position */}
                <span className="w-20 flex-shrink-0">
                  {user.position || "N/A"}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
