import mongoose from "mongoose";
import { DB_NAME } from "../constants.mjs";

export const connectDB = async () => {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    // console.log(response);
    console.log(
      `\n MongoDB connected !!! DB HOST: ${response.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED", error);
    exit(1);
  }
};
