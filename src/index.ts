import { ParsedMail } from "mailparser";
import { fetchUnseenEmails } from "./email/emailReception";
import { sendToNotion } from "./notion/sendToNotion";

fetchUnseenEmails()
  .then(emails => {
    // return Promise.all(emails.map(email => sendToNotion(email)));
    const email = emails[0];
    return sendToNotion(email as ParsedMail);
  })
  .then(results => {
    console.log("All emails have been sent to Notion:", results);
  })
  .catch(error => {
    console.error("An error occurred:", error);
  });
