import { Handler } from "aws-lambda";
import { fetchUnseenEmails } from "./services/email/fetch-emails";
import { sendToNotion } from "./services/notion/send-to-notion";
import { processEmailContent } from "./services/notion/transform-data";

export const handler: Handler = async (): Promise<any> => {
  console.log("Handler started");
  return await processEmails();
};
async function processEmails() {
  try {
    const emails = await fetchUnseenEmails();
    console.log(`Fetched emails: ${emails.length}`);

    const parsedEmails = await Promise.all(
      emails.map(email => processEmailContent(email))
    );
    console.log(`Parsed emails: ${parsedEmails.length}`);

    const results = await sendToNotion(parsedEmails[0]);
    console.log("Email sent to Notion:", results);

    return results;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
