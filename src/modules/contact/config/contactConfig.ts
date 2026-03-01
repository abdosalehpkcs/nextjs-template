import 'server-only';

import { env } from '@/env';

export type ContactEmailProvider = 'ses' | 'usersend' | 'both';

export type ContactConfig = {
  appName: string;
  appUrl: string;
  fromEmail: string;
  toEmail: string;
  replyToEmail?: string;
  provider: ContactEmailProvider;
  aws: {
    accessKeyId?: string;
    secretAccessKey?: string;
    region?: string;
  };
  usersend: {
    apiKey?: string;
    fromEmail?: string;
  };
};

const requireValue = (value: string | undefined, label: string) => {
  if (!value) {
    throw new Error(`${label} is required for contact email sending.`);
  }
};

export const getContactConfig = (): ContactConfig => {
  const provider = env.CONTACT_EMAIL_PROVIDER as ContactEmailProvider;

  if (env.NODE_ENV === 'production') {
    requireValue(env.CONTACT_TO_EMAIL, 'CONTACT_TO_EMAIL');
  }

  if (provider === 'ses' || provider === 'both') {
    requireValue(env.AWS_ACCESS_KEY_ID, 'AWS_ACCESS_KEY_ID');
    requireValue(env.AWS_SECRET_ACCESS_KEY, 'AWS_SECRET_ACCESS_KEY');
    requireValue(env.AWS_REGION, 'AWS_REGION');
  }

  if (provider === 'usersend' || provider === 'both') {
    requireValue(env.USERSEND_API_KEY, 'USERSEND_API_KEY');
  }

  return {
    appName: env.APP_NAME,
    appUrl: env.APP_URL,
    fromEmail: env.CONTACT_FROM_EMAIL,
    toEmail: env.CONTACT_TO_EMAIL || env.CONTACT_FROM_EMAIL,
    replyToEmail: env.CONTACT_REPLY_TO_EMAIL,
    provider,
    aws: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      region: env.AWS_REGION,
    },
    usersend: {
      apiKey: env.USERSEND_API_KEY,
      fromEmail: env.USERSEND_FROM_EMAIL,
    },
  };
};
