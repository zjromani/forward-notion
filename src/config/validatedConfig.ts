import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NOTION_API_KEY: z.string(),
  GMAIL_USER: z.string(),
  GMAIL_PASSWORD: z.string(),
  NOTION_DATABASE_ID: z.string()
});

const validatedEnv = envSchema.parse(process.env);

export const config = {
  notionApiKey: validatedEnv.NOTION_API_KEY,
  gmailUser: validatedEnv.GMAIL_USER,
  gmailPassword: validatedEnv.GMAIL_PASSWORD,
  notionDatabaseId: validatedEnv.NOTION_DATABASE_ID
};
