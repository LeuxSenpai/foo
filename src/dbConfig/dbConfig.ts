import mongoose from "mongoose"
//configration to connect to the database
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('mongoDB connected successfully');
        })
        connection.on('error',(err)=>{
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit()
        })
    } catch (error) {
        console.log('something has gone wrong');
        console.log(error);
    }
}