import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URL?.trim();

  if (!mongoUri) {
    throw new Error(
      "MONGODB_URL is missing. Add your MongoDB Atlas connection string to the .env file."
    );
  }

  try {
    const client = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(`📦 MongoDB connected to: ${client.connection.host}`);
    return client;
  } catch (err) {
    const errorMessage = err?.message ?? "Unknown MongoDB connection error";

    if (err?.code === 8000 || errorMessage.toLowerCase().includes("bad auth")) {
      throw new Error(
        "MongoDB authentication failed. Check the username and password in MONGODB_URL or recreate the Atlas database user."
      );
    }

    throw err;
  }
};
