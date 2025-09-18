import mongoose from "mongoose";

// configuration to connect to the database
/*
0 = disconnected

1 = connected

2 = connecting

3 = disconnecting
*/
export async function connect() {
    // If already connected or connecting, just return
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB is already connected.");
        return;
    }
    if (mongoose.connection.readyState === 2) {
        console.log("MongoDB connection is currently in progress.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.error(
                "MongoDB connection error. Please make sure MongoDB is running. " + err
            );
            process.exit(1);
        });
    } catch (error) {
        console.error("Something went wrong while connecting to MongoDB");
        console.error(error);
    }
}
