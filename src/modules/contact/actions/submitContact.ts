'use server';

import 'server-only';

import { getContactConfig } from '../config/contactConfig';
import { renderConfirmationEmail, renderInternalEmail } from '../email/render';
import { sendWithProviders } from '../providers';
import type {
  ContactActionResult,
  ContactInput,
} from '../schema/contactSchema';
import { contactSchema } from '../schema/contactSchema';

export const runtime = 'nodejs';

export const submitContact = async (
  input: ContactInput,
): Promise<ContactActionResult> => {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string' && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      ok: false,
      message: 'Please check the form and try again.',
      fieldErrors,
    };
  }

  // Honeypot: if filled, silently accept.
  if (parsed.data.honeypot) {
    return { ok: true };
  }

  // Rate limiting hook: add per-IP throttling here if needed.

  const config = getContactConfig();
  const timestamp = new Date().toISOString();
  const phone = parsed.data.phone?.trim() || undefined;

  const emailData = {
    firstName: parsed.data.firstName.trim(),
    lastName: parsed.data.lastName.trim(),
    email: parsed.data.email.trim(),
    phone,
    description: parsed.data.description.trim(),
    privacyAccepted: parsed.data.privacyAccepted,
    timestamp,
    appName: config.appName,
    appUrl: config.appUrl,
  };

  try {
    await sendWithProviders({
      to: [config.toEmail],
      subject: `${config.appName} Contact: ${emailData.firstName} ${emailData.lastName}`,
      html: renderInternalEmail(emailData),
      replyTo: [emailData.email],
    });

    await sendWithProviders({
      to: [emailData.email],
      subject: `We received your message — ${config.appName}`,
      html: renderConfirmationEmail(emailData),
      replyTo: [config.replyToEmail || config.fromEmail],
    });

    return { ok: true };
  } catch (error) {
    console.error('[Contact] Failed to send contact emails', error);
    return {
      ok: false,
      message: 'We could not send your message. Please try again later.',
    };
  }
};
