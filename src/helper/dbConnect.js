import mongoose from "mongoose";

export const db_Connect = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return mongoose.connection;
    }

    // Connect to MongoDB
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "TaskMaster",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB:", connection.name);
    return connection;
  } catch (error) {
    console.error("Failed to connect:", error);
    throw error; // Re-throw the error if you need to handle it higher up
  }
};
