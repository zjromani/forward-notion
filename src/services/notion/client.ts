import { Client } from "@notionhq/client";
import { config } from "../../config/validated-config";

const notion = new Client({ auth: config.notionApiKey });

export default notion;
