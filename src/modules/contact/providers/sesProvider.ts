import 'server-only';

import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

import type { EmailMessage, EmailProvider } from './emailProvider';

export type SesProviderConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  fromEmail: string;
};

export class SesEmailProvider implements EmailProvider {
  private client: SESClient;
  private fromEmail: string;

  constructor(config: SesProviderConfig) {
    this.fromEmail = config.fromEmail;
    this.client = new SESClient({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  async send(message: EmailMessage): Promise<void> {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: message.to,
      },
      Message: {
        Body: {
          Html: { Data: message.html, Charset: 'UTF-8' },
        },
        Subject: { Data: message.subject, Charset: 'UTF-8' },
      },
      Source: this.fromEmail,
      ReplyToAddresses: message.replyTo,
    });

    await this.client.send(command);
  }
}
