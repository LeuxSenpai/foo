// src/lib/axiosInstance.ts
"use client";

import axios from "axios";
import { toast } from "react-hot-toast";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Interceptor to catch 401 errors (expired token)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired, please log in again");

      // Call logout API (optional: to clear server cookie/session)
      await axios.get("/api/users/logout");

      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
