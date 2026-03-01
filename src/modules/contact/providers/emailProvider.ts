export type EmailMessage = {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string[];
};

export interface EmailProvider {
  send(message: EmailMessage): Promise<void>;
}
