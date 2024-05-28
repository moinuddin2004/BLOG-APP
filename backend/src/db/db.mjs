import mongoose from "mongoose";
import { DB_NAME } from "../constants.mjs";

export const connectDB = async () => {
  try {
    const uri = `${process.env.MONGODB_URL}`;
    console.log("MongoDB URI: ", uri); // Add this line to print the URI
    const response = await mongoose.connect(uri, {
      useNewUrlParser: true, // Can be omitted if using Mongoose >= 6
      useUnifiedTopology: true, // Can be omitted if using Mongoose >= 6
    });
    console.log(
      `\n MongoDB connected !!! DB HOST: ${response.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED", error);
    process.exit(1);
  }
};
