import { ParsedMail } from "mailparser";

export function processEmailContent(email: ParsedMail) {
  const processedContent = {
    subject: email.subject,
    body: processBody(email.text, email.html),
    attachments: email.attachments
  };

  return processedContent;
}

function processBody(
  body: string | undefined,
  isHtml: boolean | string
): string {
  if (typeof body === "string") {
    return body;
  } else {
    return "Body is not a parsable string";
  }
}
