import { ParsedMail } from "mailparser";

export function processEmailContent(email: ParsedMail) {
  console.log("Parsed email object:", email);

  return {
    subject: email.subject,
    body: processBody(email.html ? email.textAsHtml : email.text),
    attachments: email.attachments
  };
}

function processBody(body: string | undefined): string {
  if (typeof body === "string") {
    const trimmedString = trimStringToMaxLength(body, 1000);
    return trimmedString;
  } else {
    return "No valid email body content available.";
  }
}

function trimStringToMaxLength(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength);
}
