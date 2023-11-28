import { ParsedMail } from "mailparser";

export function processEmailContent(email: ParsedMail) {
  console.log("email", email);
  const processedContent = {
    subject: email.subject,
    body: processBody(email.text),
    attachments: email.attachments
  };

  return processedContent;
}

function processBody(body: string | undefined): string {
  if (typeof body === "string") {
    return body;
  } else {
    return "Body is not a parsable string";
  }
}
