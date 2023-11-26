import "dotenv/config";
import { fetchUnseenEmails } from "./emailReception";

fetchUnseenEmails()
  .then(emails => {
    console.log(emails);
  })
  .catch(err => {
    console.error(err);
  });
