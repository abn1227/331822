import mongoose from "mongoose";

import { config } from "@/config";

export const connection = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodb.url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
