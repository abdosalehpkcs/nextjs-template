import 'server-only';

import { getContactConfig } from '../config/contactConfig';
import type { EmailMessage, EmailProvider } from './emailProvider';
import { SesEmailProvider } from './sesProvider';
import { UserSendEmailProvider } from './userSendProvider';

const buildProviders = (): EmailProvider[] => {
  const config = getContactConfig();
  const providers: EmailProvider[] = [];

  if (config.provider === 'ses' || config.provider === 'both') {
    providers.push(
      new SesEmailProvider({
        accessKeyId: config.aws.accessKeyId as string,
        secretAccessKey: config.aws.secretAccessKey as string,
        region: config.aws.region as string,
        fromEmail: config.fromEmail,
      }),
    );
  }

  if (config.provider === 'usersend' || config.provider === 'both') {
    providers.push(
      new UserSendEmailProvider({
        apiKey: config.usersend.apiKey as string,
        fromEmail: config.usersend.fromEmail || config.fromEmail,
      }),
    );
  }

  return providers;
};

export const sendWithProviders = async (
  message: EmailMessage,
): Promise<void> => {
  const providers = buildProviders();
  const errors: Error[] = [];

  for (const provider of providers) {
    try {
      await provider.send(message);
    } catch (error) {
      console.error('[Contact] Email provider failed', error);
      errors.push(error as Error);
    }
  }

  if (errors.length === providers.length) {
    throw new Error('All email providers failed to send the message.');
  }
};
