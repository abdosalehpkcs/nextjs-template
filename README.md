# Next.js 15 Template

A modern, production-ready Next.js 15 template with TypeScript, Tailwind CSS 4, and comprehensive tooling setup. Built by **Ing. Abd Alrahman Saleh**.

> ⚠️ **Work in Progress** - This template is actively being developed and improved. Some features may be incomplete or subject to change.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-In_Progress-yellow?style=for-the-badge)](https://github.com/abd-alrahman-saleh/nextjs-15-template)

## ✨ Features

- ⚡ **Next.js 15** with App Router and Turbopack (76.7% faster development)
- ⚛️ **React 19** with latest features and optimizations
- 🔷 **TypeScript** with strict configuration and path mapping
- 🎨 **Tailwind CSS 4** with CSS-first configuration (5x faster builds)
- 🎯 **Shadcn/ui** component system with customizable themes
- 🌙 **Dark mode** support with next-themes
- 🌍 **Internationalization** with next-intl (English, German)
- 🔒 **Type-safe environment variables** with T3-env and Zod
- 🔧 **ESLint 9** with flat configuration and TypeScript support
- 💅 **Prettier** with Tailwind CSS plugin for automatic class sorting
- 🐶 **Husky & lint-staged** for pre-commit hooks and code quality
- 🐳 **Docker** ready with multi-stage builds and standalone output
- 📱 **SEO optimized** with sitemap, robots.txt, and metadata
- 🚀 **Performance optimized** with bundle analysis and monitoring

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17+ or 20+
- **Package manager**: npm
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/abdosalehpkcs/nextjs-template
   cd nextjs-15-template
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration.

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
nextjs-template/
├── 📁 public/                     # Static assets
│   ├── next.svg
│   └── ...
├── 📁 src/                        # Source code
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 [locale]/           # Internationalized routes
│   │   │   ├── layout.tsx          # Locale-specific layout
│   │   │   ├── page.tsx            # Homepage
│   │   │   └── ...
│   │   ├── globals.css           # Global styles with Tailwind
│   │   ├── layout.tsx            # Root layout
│   │   ├── sitemap.ts           # Dynamic sitemap generation
│   │   └── robots.ts            # Robots.txt configuration
│   ├── 📁 components/            # Reusable components
│   │   ├── 📁 ui/               # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   ├── icons.tsx     # Constant Icons keys
│   │   ├── lang-switcher.tsx     # Language selector
│   │   ├── theme-provider.tsx     # Context provider
│   │   ├── theme-toggle.tsx     # Dark mode toggle
│   ├── 📁 i18n/                 # Internationalization config
│   │   ├── navigation.ts        # Type-safe navigation utilities (Link, useRouter, etc.)
│   │   ├── request.ts           # Server-side i18n request handler
│   │   └── routing.ts           # Locale routing configuration and setup
│   ├── 📁 lib/                  # Utility libraries
│   │   └── utils.ts             # Common utilities (cn, etc.)
│   └── env.ts                   # Environment variable validation
├── 📁 messages/                  # Translation files
│   ├── en.json                  # English translations
│   ├── de.json                  # German translations
├── 📄 .env.example              # Environment variables template
├── 📄 .gitignore               # Git ignore rules
├── 📄 .lintstagedrc.js         # Lint-staged configuration
├── 📄 commitlint.config.js     # Commit message linting
├── 📄 components.json          # Shadcn/ui configuration
├── 📄 Dockerfile              # Docker configuration
├── 📄 eslint.config.mjs       # ESLint configuration
├── 📄 middleware.ts           # Next.js middleware for i18n
├── 📄 next.config.ts          # Next.js configuration
├── 📄 package.json           # Dependencies and scripts
├── 📄 postcss.config.mjs     # PostCSS configuration
├── 📄 prettier.config.js     # Prettier configuration
├── 📄 README.md             # This file
└── 📄 tsconfig.json         # TypeScript configuration
```

## 🛠️ Available Scripts

### Development

````bash
# Start development server with Turbopack
npm run dev

### Building
```bash
# Build for production
npm run build

# Start production server
npm run start
````

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check

# Run TypeScript type checking
npm run type-check
```

### Testing

```bash
# Run tests (if configured)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### Analysis & Optimization

```bash

```

### Docker

```bash

```

### Git Hooks

```bash

```

## 🌍 Internationalization

This template supports multiple languages out of the box:

- 🇺🇸 **English** (default) - `/`
- 🇩🇪 **German** - `/de`

### Adding New Languages

1. **Add locale to routing configuration**

   ```typescript
   // src/i18n/routing.ts
   export const routing = defineRouting({
     locales: ['en', 'de', 'your-locale'],
     defaultLocale: 'en',
   });
   ```

2. **Create translation file**

   ```bash
   # Create new translation file
   cp messages/en.json messages/your-locale.json
   ```

3. **Update language switcher**
   ```typescript
   // src/components/language-switcher.tsx
   const languages = {
     'your-locale': 'Your Language Name',
     // ...
   };
   ```

## 🎨 Customization

### Theming

The template uses Tailwind CSS 4 with CSS-first configuration:

```css
/* src/app/globals.css */
@theme {
  --color-primary: #your-color;
  --color-secondary: #your-secondary;
  /* Add your custom theme variables */
}
```

### Components

All UI components are from Shadcn/ui and can be customized:

```bash

```

### Environment Variables

Configure your environment in `.env.local`:

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Your App Name

# Authentication (example)
NEXTAUTH_SECRET=your-secret-key

# Analytics (example)
GOOGLE_SITE_ANALYTICS_ID=G-XXXXXXXXXX
```

## 📈 Performance

This template achieves excellent performance benchmarks:

- ⚡ **Dev server startup**: < 2 seconds with Turbopack
- 🔄 **Hot reload**: < 200ms with Turbopack
- 📦 **Build time**: < 30 seconds for basic template
- 🎯 **Lighthouse score**: 90+ across all metrics
- 📱 **First Contentful Paint**: < 1.5s
- 🏃 **Largest Contentful Paint**: < 2.5s

## 🔧 Configuration

### TypeScript

Strict TypeScript configuration with helpful path mappings:

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

### ESLint

Modern ESLint 9 flat configuration with Next.js, TypeScript, and Prettier integration.

### Prettier

Automatic code formatting with Tailwind CSS class sorting.

### Husky & Lint-staged

Pre-commit hooks ensure code quality:

- ESLint checking and auto-fixing
- Prettier formatting
- TypeScript type checking
- Conventional commit message linting

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://conventionalcommits.org/):

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` code style changes
- `refactor:` code refactoring
- `test:` test changes
- `chore:` maintenance tasks

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ing. Abd Alrahman Saleh**

- Full Stack Developer & Software Engineer
- 🔗 LinkedIn: [Connect with me](https://www.linkedin.com/in/abdo-saleh/)
- 🐱 GitHub: [Follow me](https://github.com/abdosalehpkcs)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization for Next.js
- [T3 Stack](https://create.t3.gg/) - Environment variable validation inspiration

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/abdosalehpkcs/nextjs-template?style=social)
![GitHub forks](https://img.shields.io/github/forks/abdosalehpkcs/nextjs-template?style=social)
![GitHub issues](https://img.shields.io/github/issues/abdosalehpkcs/nextjs-template)
![GitHub license](https://img.shields.io/github/license/abdosalehpkcs/nextjs-template)

---

<div align="center">
  <p>Made with ❤️ by <strong>Ing. Abd Alrahman Saleh</strong></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
