import { config } from "../config/validatedConfig";

import notion from "./client";

export async function sendToNotion(email: any) {
  const response = await notion.pages.create({
    parent: { database_id: config.notionDatabaseId },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: email.subject ?? "Default Subject"
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
                content: email.body
              }
            }
          ]
        }
      }
    ]
  });

  return response;
}
