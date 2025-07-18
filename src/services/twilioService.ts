import { twilioClient } from "../auth/twilio";

export default async function makeReminderCall(
  event: any,
  phoneNumber: string
) {
  try {
    const eventTime = new Date(event.start.dateTime).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    const twimlMessage = `
      <Response>
        <Say voice="alice">
          Hello! This is your calendar reminder. 
          You have "${event.summary}" starting in about 5 minutes at ${eventTime}.
          Have a great day!
        </Say>
      </Response>
    `;

    const call = await twilioClient.calls.create({
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER!,
      twiml: twimlMessage,
    });

    console.log(`Call initiated with SID: ${call.sid}`);
    return call;
  } catch (error) {
    console.error("Error making reminder call:", error);
    throw error;
  }
}
