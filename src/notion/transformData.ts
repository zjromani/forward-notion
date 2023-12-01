import { ParsedMail } from "mailparser";
import { NodeHtmlMarkdown } from "node-html-markdown";

export function processEmailContent(email: ParsedMail) {
  const processedContent = {
    subject: email.subject,
    body: processBody(email.textAsHtml),
    attachments: email.attachments
  };

  return processedContent;
}

function processBody(body: string | undefined): string {
  if (typeof body === "string") {
    return NodeHtmlMarkdown.translate(body);
  } else {
    console.log(body, "((((((((((body");
    return "Body is not a parsable string";
  }
}
