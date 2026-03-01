import 'server-only';

import type { EmailMessage, EmailProvider } from './emailProvider';

export type UserSendProviderConfig = {
  apiKey: string;
  fromEmail: string;
};

const USERSEND_API_URL = 'https://api.usersend.com/v1/email';

export class UserSendEmailProvider implements EmailProvider {
  private apiKey: string;
  private fromEmail: string;

  constructor(config: UserSendProviderConfig) {
    this.apiKey = config.apiKey;
    this.fromEmail = config.fromEmail;
  }

  async send(message: EmailMessage): Promise<void> {
    const response = await fetch(USERSEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: this.fromEmail,
        to: message.to,
        subject: message.subject,
        html: message.html,
        replyTo: message.replyTo,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`UserSend request failed: ${response.status} ${body}`);
    }
  }
}
