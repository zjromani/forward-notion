import { config } from "../config/validatedConfig";

import notion from "./notionClient";
import { processEmailContent } from "../contentProcessing";
import { ParsedMail } from "mailparser";

async function addEmailToNotion(email: ParsedMail, databaseId: string) {
  const emailContent = processEmailContent(email);

  const response = await notion.pages.create({
    parent: { database_id: config.notionDatabaseId },
    properties: {
      // Map your email content to your Notion database properties
      Name: {
        title: [
          {
            text: {
              content: emailContent.subject
            }
          }
        ]
      }
      // ... other properties ...
    },
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          text: [
            {
              type: "text",
              text: {
                content: emailContent.body
              }
            }
          ]
        }
      }
      // ... handle attachments or other content as needed ...
    ]
  });

  return response;
}
