import { emailTokens } from './tokens';

export type InlineStyle = Record<string, string | number | undefined>;

export const styleToString = (style: InlineStyle) => {
  return Object.entries(style)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
};

export const baseFont =
  "font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const textStyles = {
  heading: styleToString({
    color: emailTokens.text,
    fontSize: '20px',
    fontWeight: 600,
    margin: '0 0 12px 0',
    lineHeight: '1.4',
  }),
  subheading: styleToString({
    color: emailTokens.text,
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 8px 0',
    lineHeight: '1.4',
  }),
  body: styleToString({
    color: emailTokens.text,
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0',
  }),
  muted: styleToString({
    color: emailTokens.mutedText,
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '0',
  }),
};

export const layoutStyles = {
  outerTable: styleToString({
    width: '100%',
    background: emailTokens.background,
    padding: '24px 0',
  }),
  container: styleToString({
    width: '100%',
    maxWidth: '640px',
    margin: '0 auto',
  }),
  card: styleToString({
    background: emailTokens.surface,
    border: `1px solid ${emailTokens.border}`,
    borderRadius: '12px',
    padding: '20px',
  }),
  footer: styleToString({
    color: emailTokens.mutedText,
    fontSize: '12px',
    lineHeight: '1.6',
    textAlign: 'center',
    paddingTop: '16px',
  }),
};
