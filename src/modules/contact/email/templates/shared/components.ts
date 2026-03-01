import { layoutStyles, styleToString, textStyles } from './styles';
import { emailTokens } from './tokens';

export const renderHeader = (title: string, subtitle?: string) => {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="${styleToString({ padding: '0 0 16px 0' })}">
          <p style="${textStyles.heading}">${title}</p>
          ${subtitle ? `<p style="${textStyles.muted}">${subtitle}</p>` : ''}
        </td>
      </tr>
    </table>
  `;
};

export const renderCard = (content: string) => {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="${layoutStyles.card}">
      <tr>
        <td>
          ${content}
        </td>
      </tr>
    </table>
  `;
};

export const renderRow = (label: string, value: string) => {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="${styleToString({ padding: '6px 0' })}">
          <p style="${textStyles.muted}">${label}</p>
          <p style="${textStyles.body}">${value}</p>
        </td>
      </tr>
    </table>
  `;
};

export const renderFooter = (appName: string, appUrl: string) => {
  const footerText = `${appName} · ${appUrl}`;
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td style="${layoutStyles.footer}">
          <p style="margin:0;color:${emailTokens.mutedText}">${footerText}</p>
        </td>
      </tr>
    </table>
  `;
};
