import { Client } from "@notionhq/client";
import { config } from "../config/validatedConfig";

const notion = new Client({ auth: config.notionApiKey });

export default notion;
