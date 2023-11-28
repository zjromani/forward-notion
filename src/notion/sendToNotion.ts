import { config } from "../config/validatedConfig";

import notion from "./notionClient";
import { processEmailContent } from "../email/contentProcessing";
import { ParsedMail } from "mailparser";

export async function sendToNotion(email: ParsedMail) {
  const emailContent = processEmailContent(email);

  const response = await notion.pages.create({
    parent: { database_id: config.notionDatabaseId },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: emailContent.subject ?? "Default Subject"
            }
          }
        ]
      }
    },
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: emailContent.body
              }
            }
          ]
        }
      }
    ]
  });

  return response;
}
