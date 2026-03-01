import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    APP_URL: z.string().url().default('http://localhost:3000'),
    APP_NAME: z.string().default('Next.js Template'),
    CONTACT_FROM_EMAIL: z.string().email().default('no-reply@example.com'),
    CONTACT_TO_EMAIL: z.string().email().optional(),
    CONTACT_REPLY_TO_EMAIL: z.string().email().optional(),
    CONTACT_EMAIL_PROVIDER: z.enum(['ses', 'usersend', 'both']).default('ses'),
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    AWS_REGION: z.string().optional(),
    USERSEND_API_KEY: z.string().optional(),
    USERSEND_FROM_EMAIL: z.string().email().optional(),
  },

  client: {},

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    APP_URL: process.env.APP_URL,
    APP_NAME: process.env.APP_NAME,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_REPLY_TO_EMAIL: process.env.CONTACT_REPLY_TO_EMAIL,
    CONTACT_EMAIL_PROVIDER: process.env.CONTACT_EMAIL_PROVIDER,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    USERSEND_API_KEY: process.env.USERSEND_API_KEY,
    USERSEND_FROM_EMAIL: process.env.USERSEND_FROM_EMAIL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
