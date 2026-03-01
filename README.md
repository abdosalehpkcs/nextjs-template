# Next.js 15 Template

A modern, production-ready Next.js 15 template with TypeScript, Tailwind CSS 4, and comprehensive tooling setup. Built by **Ing. Abd Alrahman Saleh**.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

- ⚡ **Next.js 15** with App Router and Turbopack
- ⚛️ **React 19** with latest features
- 🔷 **TypeScript** with strict configuration
- 🎨 **Tailwind CSS 4** with CSS-first configuration
- 🎯 **Shadcn/ui** component system
- 🌙 **Dark mode** support with next-themes
- 🌍 **Internationalization** with react-i18next (instant client-side switching)
- 🔒 **Type-safe environment variables** with T3-env and Zod
- 🔧 **ESLint 9** with flat configuration
- 💅 **Prettier** with Tailwind CSS plugin
- 🐶 **Husky & lint-staged** for pre-commit hooks
- 🐳 **Docker** ready with multi-stage builds
- 📱 **SEO optimized** with sitemap and robots.txt

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17+ or 20+
- **pnpm** (recommended) or npm

### Installation

```bash
# 1. Clone the repository (or use GitHub's "Use this template" button)
git clone https://github.com/abdosalehpkcs/nextjs-template
cd nextjs-template

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 📁 Project Structure

```
nextjs-template/
├── messages/                 # Translation files (en.json, de.json)
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage (client component)
│   │   ├── robots.ts         # Robots.txt generation
│   │   └── sitemap.ts        # Sitemap generation
│   ├── components/           # React components
│   │   ├── ui/               # Shadcn/ui components
│   │   ├── lang-switcher.tsx # Language toggle button
│   │   ├── theme-provider.tsx
│   │   └── theme-switcher.tsx
│   ├── i18n/                 # Internationalization
│   │   ├── config.ts         # Locale configuration
│   │   ├── provider.tsx      # I18n React provider
│   │   └── settings.ts       # i18next settings
│   ├── lib/                  # Utilities
│   │   ├── fonts.ts
│   │   ├── site-config.ts    # Site metadata
│   │   └── utils.ts
│   └── env.ts                # Environment validation
├── .env.example              # Environment template
├── Dockerfile                # Docker configuration
├── next.config.ts            # Next.js config
└── package.json
```

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start dev server with Turbopack

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting
pnpm type-check       # TypeScript type checking
```

## 🌍 Internationalization

This template uses **react-i18next** for instant client-side language switching (no page reloads).

**Supported languages:**

- 🇺🇸 English (default)
- 🇩🇪 German

### Adding a New Language

1. **Create translation file:**

   ```bash
   cp messages/en.json messages/fr.json
   ```

2. **Add locale to config:**

   ```typescript
   // src/i18n/config.ts
   export const locales = ['en', 'de', 'fr'] as const;
   ```

3. **Translate the JSON file** with your new language strings.

### Using Translations

```tsx
'use client';
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('HomePage.greeting')}</h1>;
}
```

## 🎨 Customization

### Site Configuration

Edit `src/lib/site-config.ts`:

```typescript
export const siteConfig = {
  title: 'Your App Name',
  description: 'Your app description',
  keywords: ['keyword1', 'keyword2'],
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};
```

### Environment Variables

Edit `.env.local`:

```bash
# Required
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Your App Name

# Optional
CONTACT_FROM_EMAIL=no-reply@example.com
CONTACT_TO_EMAIL=team@example.com
CONTACT_REPLY_TO_EMAIL=support@example.com
CONTACT_EMAIL_PROVIDER=ses
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
USERSEND_API_KEY=your-usersend-key
USERSEND_FROM_EMAIL=optional-override@example.com
```

### Adding UI Components

```bash
npx shadcn@latest add [component-name]
```

## 🐳 Docker

```bash
# Build image
docker build -t nextjs-app .

# Run container
docker run -p 3000:3000 nextjs-app
```

## 🔄 Syncing Updates from Template

> **Note:** A repository created from a GitHub template has **no automatic link** to the original template. GitHub does not track template ancestry, so there's no "Update from template" button.

### How to Pull Template Updates

You can manually sync updates by adding the template as an upstream remote:

```bash
# 1. Add template as remote (one-time setup)
git remote add template https://github.com/abdosalehpkcs/nextjs-template.git

# 2. Fetch latest changes from template
git fetch template

# 3. Merge or rebase template changes into your branch
git merge template/main
# or
git rebase template/main
```

### Cherry-pick Specific Commits

If you only want specific updates:

```bash
# View template commits
git log template/main --oneline

# Cherry-pick specific commit
git cherry-pick <commit-hash>
```

### Limitations

- ❌ No automatic syncing like a fork
- ❌ No one-click "update from template" in GitHub
- ⚠️ Manual merging may cause conflicts with your customizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

**Commit Convention:** This project uses [Conventional Commits](https://conventionalcommits.org/)

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Ing. Abd Alrahman Saleh** - Full Stack Developer & Software Engineer

- 🔗 [LinkedIn](https://www.linkedin.com/in/abdo-saleh/)
- 🐱 [GitHub](https://github.com/abdosalehpkcs)

---

<div align="center">
  <p>Made with ❤️ by <strong>Ing. Abd Alrahman Saleh</strong></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
