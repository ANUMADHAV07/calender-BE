import { google } from "googleapis";
import config from "../config/config";
import makeReminderCall from "./twilioService";

const createOAuth2Client = (accessToken: string, refreshToken: string) => {
  const oauth2Client = new google.auth.OAuth2(
    config.googleClientId,
    config.googleClientSecret,
    "http://localhost:3001/api/auth/google/callback"
  );

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return oauth2Client;
};

export const getCalendarEvents = async (
  accessToken: string,
  refreshToken: string,
  userEmail?: string
) => {
  const oauth2Client = createOAuth2Client(accessToken, refreshToken);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const now = new Date();
  const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);

  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      timeMax: fiveMinutesLater.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];
    console.log(`Found ${events.length} upcoming events for ${userEmail}`);

    for (const event of events) {
      if (!event.id || !event.start?.dateTime || !event.summary) {
        continue;
      }

      const eventStartTime = new Date(event.start.dateTime);
      const timeDifference = eventStartTime.getTime() - now.getTime();
      const minutesUntilEvent = Math.floor(timeDifference / (1000 * 60));

      const userPhoneNumber = process.env.USER_PHONE_NUMBER;

      if (minutesUntilEvent <= 5 && minutesUntilEvent >= 0) {
        await makeReminderCall(event, userPhoneNumber!);
      }
    }
    return response.data.items;
  } catch (error) {
    console.error("Error fetching calendar events:", error);
  }
};

export const creatCalendarEvent = async (
  accessToken: string,
  refreshToken: string,
  eventData: {
    summary: string;
    description?: string;
    start: { dateTime: string; timeZone?: string };
    end: { dateTime: string; timeZone?: string };
    attendees?: { email: string }[];
  }
) => {
  const oauth2Client = createOAuth2Client(accessToken, refreshToken);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    console.log("event-data", eventData);
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: eventData,
    });

    console.log("Event created:", response.data);
    console.log("Event ID:", response.data.id);
    console.log("Event Link:", response.data.htmlLink);

    return response.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
  }
};
