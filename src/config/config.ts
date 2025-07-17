import dotenv from "dotenv";
import { Config } from "../types/index";

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  sessionSecret: process.env.SESSION_SECRET || "",
  clientUrl: process.env.CLIENT_URL || "http://localhost:4000",
  dbUrl: process.env.DB_URL || "",
};

export default config;
