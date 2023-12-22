import { Handler } from "aws-lambda";
import { fetchUnseenEmails } from "./services/imap/email-reception";
import { sendToNotion } from "./services/notion/send-to-notion";
import { processEmailContent } from "./services/notion/transform-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler: Handler = async (): Promise<any> => {
  fetchUnseenEmails()
    .then(emails => {
      return Promise.all(emails.map(email => processEmailContent(email)));
    })
    .then(parsedEmails => {
      const email = parsedEmails[0];
      // return Promise.all(
      //   parsedEmails.map(parsedEmail => sendToNotion(parsedEmail))
      // );

      // console.log(email);
      return sendToNotion(email);
    })
    .then(results => {
      console.log("All emails have been sent to Notion:", results);
    })
    .catch(error => {
      console.error("An error occurred:", error);
    });
};
