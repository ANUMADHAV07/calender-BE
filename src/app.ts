import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/authRoutes";
import calendarRoutes from "./routes/calendarRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import passport from "./auth/passport";
import config from "./config/config";
import dbConnect from "./config/dbConfig";
import User from "./models/user";
import { startEventReminderCron } from "./cron/reminderCron";

const app = express();

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: config.sessionSecret || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.nodeEnv === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/calendar", calendarRoutes);

// DB connect
dbConnect();

const initializeCronJobs = async () => {
  try {
    const users = await User.find();

    if (users.length > 0) {
      startEventReminderCron(users);
    } else {
      console.log("No users found for cron job initialization");
    }
  } catch (error) {
    console.error("Error initializing cron jobs:", error);
  }
};

initializeCronJobs();

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
