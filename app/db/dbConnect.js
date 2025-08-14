import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("Database connection successful sir!");
  } catch (error) {
    console.log("mongodb connection error::", error.message);
    throw new Error();
  }
};
