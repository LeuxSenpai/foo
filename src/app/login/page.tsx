"use client"; //anything outside api
import Link from "next/link";
import React,{useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
       
    })

    const[buttonDisabled,setButtonDisabled] = React.useState(true);
    const [loading,setLoading] = React.useState(false);

    const onLogin= async () =>{
        try {
            setLoading(true);
            const response =await axios.post("api/users/login",user);
            console.log("Login Success",response.data)
            toast.success("Login success")
            router.push("/");
        } catch (error:any) {
            console.log("login failed",error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user]);
return (
        <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/bg-3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
           
            {/* Login Form */}
            <div className="relative z-20 flex flex-col items-center justify-center w-3/4">
                <h1 className="text-white text-2xl mb-4">{loading ? "Processing..." : "Login"}</h1>
                <hr />

<input
    className="p-2 mb-2 w-64 text-white placeholder-gray-300 
       bg-gray-500/30 border border-gray-400/40 
       rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
    id="email"
    type="text"
    value={user.email}
    onChange={(e) => setUser({ ...user, email: e.target.value })}
    placeholder="email"
/>

{/* Input: Password */}
<input
    className="p-2 mb-2 w-64 text-white placeholder-gray-300 
       bg-gray-500/30 border border-gray-400/40 
       rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
    id="password"
    type="password"
    value={user.password}
    onChange={(e) => setUser({ ...user, password: e.target.value })}
    placeholder="password"
/>

{/* Button */}
<button
    onClick={onLogin}
    className="w-64 p-2 bg-blue-600 hover:bg-blue-700 text-white 
       rounded-md mb-3 text-sm transition"
>
    Login
</button>
                <Link href="/signup"  className="text-blue-300 hover:underline text-sm">Don't have an account? Sign up here.</Link>
            </div>
        </div>
    );
}