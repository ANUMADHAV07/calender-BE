import { google } from "googleapis";
import config from "../config/config";

const createOAuth2Client = (accessToken: string, refreshToken: string) => {
  const oauth2Client = new google.auth.OAuth2(
    config.googleClientId,
    config.googleClientSecret,
    "http://localhost:3001/auth/google/callback"
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
  timeMin?: string,
  timeMax?: string
) => {
  const oauth2Client = createOAuth2Client(accessToken, refreshToken);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: timeMin || new Date().toISOString(),
      timeMax: timeMax,
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching calendar events:", error);
  }
};

export const createEvent = async (
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
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: eventData,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
  }
};
