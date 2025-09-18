import jwt from "jsonwebtoken"
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from "next/server";
import bcryptjs from "bcryptjs";





await connect()
//how do we handle the frontend data call
export async function POST(request:NextRequest){
    try {
        const reqBody= await request.json()
        const {email,password}=reqBody;
        console.log(reqBody);

        //check if users exists
        const user =await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User doesnt exist"},{status:400})
        }

        //check if password is correct
        const validPassword= await bcryptjs.compare(password,user.password)
        if (!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }
        //create token data 
        const tokenData={
            id: user._id,
            username: user.username,
            email:user.email
        }
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        //send to users cookie
        const response = NextResponse.json({
            message: "login succesfull",
            success:true,
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response ;
        
    } catch (error:any) {

        
    }
    
}