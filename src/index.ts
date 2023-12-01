import { fetchUnseenEmails } from "./emailReception";
import { sendToNotion } from "./notion/sendToNotion";
import { processEmailContent } from "./notion/transformData";

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
