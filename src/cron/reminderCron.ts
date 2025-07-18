import cron from "node-cron";
import { getCalendarEvents } from "../services/calendarService";

export const startEventReminderCron = (
  users: Array<{
    accessToken: string;
    refreshToken: string;
    email: string;
  }>
) => {
  const job = cron.schedule("*/2 * * * *", async () => {
    console.log("Running event reminder check...");

    for (const user of users) {
      await getCalendarEvents(user.accessToken, user.refreshToken, user.email);
    }
  });

  console.log("Event reminder cron job started - running every 2 minutes");
  return job;
};
