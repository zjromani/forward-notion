import Connection from 'imap';
import Imap from 'imap';
import { ParsedMail, Source, simpleParser } from 'mailparser';
import { z } from 'zod';

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


const config = {
	user: process.env.GMAIL_USER,
  password: process.env.GMAIL_PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
};

const imapConfig: ImapConfig = imapConfigSchema.parse(config);


const imap = new Imap(imapConfig);

function openInbox(cb: (err: Error, mailbox: Imap.Box) => void): void {
  imap.openBox('INBOX', false, cb);
}

export function fetchUnseenEmails(): Promise<ParsedMail[]> {
  return new Promise((resolve, reject) => {
    imap.once('ready', () => {
      openInbox((err: Error, mailbox: Imap.Box) => {
        if (err) {
          reject(err);
          return;
        }
        const searchCriteria = ['UNSEEN'];
        const fetchOptions: Imap.FetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: true };

        imap.search(searchCriteria, (searchErr: Error, results: number[]) => {
          if (searchErr) {
            reject(searchErr);
            return;
          }
          const fetchedEmails: ParsedMail[] = [];
          const fetch = imap.fetch(results, fetchOptions);

          fetch.on('message', (msg: Imap.ImapMessage, seqno: number) => {
            msg.on('body', (stream: Source) => {
              simpleParser(stream, (parseErr: Error, mail: ParsedMail) => {
                if (parseErr) {
                  reject(parseErr);
                  return;
                }
                fetchedEmails.push(mail);
              });
            });
          });

          fetch.on('end', () => {
            imap.end();
            resolve(fetchedEmails);
          });
        });
      });
    });

    imap.once('error', (err: Error) => {
      console.error(err);
      reject(err);
    });

    imap.connect();
  });
}