import { Router } from "express";
import {
  getCalendarEventsController,
  createEventController,
} from "../controllers/calenderController";
import requireAuth from "../middlewares/auth";

const calendarRouter = Router();

calendarRouter.get("/events", requireAuth, getCalendarEventsController);
calendarRouter.post("/events", requireAuth, createEventController);

export default calendarRouter;
