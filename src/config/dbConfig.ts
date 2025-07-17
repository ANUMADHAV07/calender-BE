import mongoose from "mongoose";
import config from "./config";

const dbUrl = config.dbUrl;

export default async function dbConnect() {
  try {
    const mongooseInstance = await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
    console.log(mongooseInstance.connection.readyState);
  } catch (error) {
    console.log(error);
  }
}
