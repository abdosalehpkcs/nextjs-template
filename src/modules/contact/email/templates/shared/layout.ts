import { baseFont, layoutStyles } from './styles';

export const renderLayout = (content: string) => {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Contact</title>
    </head>
    <body style="margin:0;padding:0;${baseFont}">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="${layoutStyles.outerTable}">
        <tr>
          <td>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="${layoutStyles.container}">
              <tr>
                <td>
                  ${content}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
