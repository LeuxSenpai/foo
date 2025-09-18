"use client";
import axios from "axios";
import Link from "next/link"
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation"

export default function Profile() {
    const router=useRouter();
    const logout=async()=>{
        try {
            await axios.get("api/users/logout");
            toast.success("logout successfull")
            router.push("/login");
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    return(
        <div>
            Profile
            <hr/>
            <button onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bond py-2 px-4 rounded">
                Logout
            </button>
        </div>
    )
}