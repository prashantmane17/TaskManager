import mongoose from "mongoose";

export const db_Connect = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB");
            return;
        }

        const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName: "TaskMaster",
        });
        
        console.log("Connected to MongoDB:", connection.name);
    } catch (error) {
        console.log("Failed to connect:", error);
    }
};
