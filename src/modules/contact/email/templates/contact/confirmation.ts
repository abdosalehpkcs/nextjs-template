import type { ContactEmailData } from '../../render';
import {
  renderCard,
  renderFooter,
  renderHeader,
  renderRow,
} from '../shared/components';
import { renderLayout } from '../shared/layout';
import { textStyles } from '../shared/styles';

export const renderConfirmationTemplate = (data: ContactEmailData) => {
  const summaryRows = [
    renderRow('Name', `${data.firstName} ${data.lastName}`),
    renderRow('Email', data.email),
    data.phone ? renderRow('Phone', data.phone) : '',
  ].join('');

  const confirmationCopy = `
    <p style="${textStyles.body}">Hi ${data.firstName},</p>
    <p style="${textStyles.body}">Thanks for reaching out. We received your message and our team will review it shortly.</p>
    <p style="${textStyles.body}">You can expect a reply within the next business day. If you need to add anything, just reply to this email.</p>
  `;

  const content = [
    renderHeader('We received your message', `${data.appName} support team`),
    renderCard(confirmationCopy),
    renderCard(summaryRows),
    renderFooter(data.appName, data.appUrl),
  ].join('');

  return renderLayout(content);
};
