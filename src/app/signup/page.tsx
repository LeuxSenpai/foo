"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); 
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  // 🎥 Play once, pause at end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play();

    // Show form after 4.5s (or when you want)
    const timer = setTimeout(() => {
      setShowForm(true); 
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4">
      {/* 🔹 Background Video (play once, no loop) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        onEnded={(e) => (e.currentTarget.pause())} // pause at the end
      >
        <source src="/videos/bg-1.mp4" type="video/mp4" />
      </video>

      {/* 🔹 Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* 🔹 Signup Form */}
      {showForm && (
        <div className="w-full max-w-xs flex flex-col items-center text-center animate-fadeIn">
          <h1 className="text-xl font-bold text-white mb-4">
            {loading ? "Processing..." : "Signup"}
          </h1>

          <input
            className="p-2 mb-2 w-3/4 text-white placeholder-gray-300 
                       bg-gray-500/30 border border-gray-400/40 
                       rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <input
            className="p-2 mb-2 w-3/4 text-white placeholder-gray-300 
                       bg-gray-500/30 border border-gray-400/40 
                       rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            className="p-2 mb-3 w-3/4 text-white placeholder-gray-300 
                       bg-gray-500/30 border border-gray-400/40 
                       rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            onClick={onSignup}
            className="w-3/4 p-2 bg-blue-600 hover:bg-blue-700 text-white 
                       rounded-md mb-3 text-sm transition"
          >
            {buttonDisabled ? "No signup" : "Signup"}
          </button>

          <Link href="/login">
            Visit login page
          </Link>
        </div>
      )}
    </div>
  );
}
