import 'server-only';

import {
  renderConfirmationTemplate,
  renderInternalTemplate,
} from './templates/contact';

export type ContactEmailData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  description: string;
  privacyAccepted: boolean;
  timestamp: string;
  appName: string;
  appUrl: string;
};

export const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const sanitize = (data: ContactEmailData): ContactEmailData => ({
  ...data,
  firstName: escapeHtml(data.firstName),
  lastName: escapeHtml(data.lastName),
  email: escapeHtml(data.email),
  phone: data.phone ? escapeHtml(data.phone) : undefined,
  description: escapeHtml(data.description),
  timestamp: escapeHtml(data.timestamp),
  appName: escapeHtml(data.appName),
  appUrl: escapeHtml(data.appUrl),
});

export const renderInternalEmail = (data: ContactEmailData) => {
  return renderInternalTemplate(sanitize(data));
};

export const renderConfirmationEmail = (data: ContactEmailData) => {
  return renderConfirmationTemplate(sanitize(data));
};
