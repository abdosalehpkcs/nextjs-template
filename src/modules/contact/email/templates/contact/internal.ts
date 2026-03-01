import type { ContactEmailData } from '../../render';
import {
  renderCard,
  renderFooter,
  renderHeader,
  renderRow,
} from '../shared/components';
import { renderLayout } from '../shared/layout';
import { textStyles } from '../shared/styles';

export const renderInternalTemplate = (data: ContactEmailData) => {
  const profileRows = [
    renderRow('Name', `${data.firstName} ${data.lastName}`),
    renderRow('Email', data.email),
    data.phone ? renderRow('Phone', data.phone) : '',
  ].join('');

  const descriptionBlock = `
    <p style="${textStyles.subheading}">Message</p>
    <p style="${textStyles.body}">${data.description}</p>
  `;

  const privacyBlock = `
    <p style="${textStyles.subheading}">Privacy</p>
    <p style="${textStyles.body}">Accepted: ${data.privacyAccepted ? 'Yes' : 'No'}</p>
    <p style="${textStyles.muted}">Received: ${data.timestamp}</p>
  `;

  const content = [
    renderHeader(`${data.appName} contact submission`, 'New message received.'),
    renderCard(profileRows),
    renderCard(descriptionBlock),
    renderCard(privacyBlock),
    renderFooter(data.appName, data.appUrl),
  ].join('');

  return renderLayout(content);
};
