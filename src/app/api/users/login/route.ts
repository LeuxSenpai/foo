import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest,NextResponse} from "next/server";
import bcryptjs from "bcryptjs";





connect()
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
        
    } catch (error) {
        
    }
    
}