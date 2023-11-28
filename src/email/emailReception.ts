import Imap from "imap";
import { ParsedMail, Source, simpleParser } from "mailparser";
import { z } from "zod";
import { processEmailContent } from "./contentProcessing";
import { config } from "../config/validatedConfig";

const imapConfigSchema = z.object({
  user: z.string(),
  password: z.string(),
  host: z.string(),
  port: z.number(),
  tls: z.boolean(),
  tlsOptions: z.object({
    rejectUnauthorized: z.boolean()
  })
});

type ImapConfig = z.infer<typeof imapConfigSchema>;

const imapConfig = {
  user: config.gmailUser,
  password: config.gmailPassword,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
};

const validatedImapConfig: ImapConfig = imapConfigSchema.parse(imapConfig);

const imap = new Imap(validatedImapConfig);

function openInbox(cb: (err: Error, mailbox: Imap.Box) => void): void {
  imap.openBox("INBOX", false, cb);
}

export function fetchUnseenEmails(): Promise<ParsedMail[]> {
  return new Promise((resolve, reject) => {
    imap.once("ready", () => {
      openInbox((err: Error, mailbox: Imap.Box) => {
        if (err) {
          reject(err);
          return;
        }
        // const searchCriteria = ["ALL"];
        const searchCriteria = [
          "UNSEEN",
          ["SINCE", new Date().toDateString().split(" ").slice(1).join("-")]
        ];

        const fetchOptions: Imap.FetchOptions = {
          bodies: ["HEADER", "TEXT"],
          markSeen: false
        };

        imap.search(searchCriteria, (searchErr: Error, results: number[]) => {
          if (searchErr) {
            reject(searchErr);
            return;
          }
          const fetchedEmails: any[] = [];
          const fetch = imap.fetch(results, fetchOptions);
          console.log("Fetching emails...");

          fetch.on("message", (msg: Imap.ImapMessage, seqno: number) => {
            msg.on("body", (stream: Source) => {
              simpleParser(stream, (parseErr: Error, mail: ParsedMail) => {
                if (parseErr) {
                  reject(parseErr);
                  return;
                }

                console.log("Fetched email subject:", mail.subject);

                fetchedEmails.push(processEmailContent(mail));
              });
            });
          });

          fetch.on("end", () => {
            imap.end();
            resolve(fetchedEmails);
          });
        });
      });
    });

    imap.once("error", (err: Error) => {
      console.error(err);
      reject(err);
    });

    imap.connect();
  });
}
