import { processEmailContent } from "./transform-data"; // Adjust path as needed
import { ParsedMail } from "mailparser";

describe("processEmailContent", () => {
  const mockHeaders = new Map<string, any>([
    ["from", "test@email.com"],
    ["to", "test@emaal2.com"],
    ["subject", "Test Subject"],
    ["date", new Date("2021-09-01T12:00:00.000Z")],
    ["references", "reference-id-1, reference-id-2"]
  ]);

  const mockHeaderLines = [
    { key: "From", line: "From: Sender Name <sender@example.com>" },
    { key: "To", line: "To: Receiver Name <receiver@example.com>" },
    { key: "Subject", line: "Subject: Test Subject" },
    { key: "Date", line: "Date: Wed, 1 Sep 2021 12:00:00 +0000" }
  ];
  it("should process email content correctly", () => {
    const mockEmail: ParsedMail = {
      subject: "Test Subject",
      text: "Test Body",
      html: "<p>Test Body</p>",
      attachments: [],
      headers: mockHeaders,
      headerLines: mockHeaderLines
    };

    const processedContent = processEmailContent(mockEmail);

    expect(processedContent.subject).toBe("Test Subject");
    expect(processedContent.body).toBe("Test Body");
    expect(processedContent.attachments).toEqual([]);
  });

  it("should handle missing body correctly", () => {
    const mockEmail: ParsedMail = {
      subject: "Test Subject",
      text: undefined,
      html: false,
      attachments: [],
      headers: mockHeaders,
      headerLines: mockHeaderLines
    };

    const processedContent = processEmailContent(mockEmail);

    expect(processedContent.body).toBe("Body is not a parsable string");
  });
});
