import {
  Code2,
  ExternalLink,
  Github,
  Globe,
  Globe2,
  Linkedin,
  Rocket,
  Server,
  Settings,
  Shield,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { env } from '@/env';
import { siteConfig } from '@/lib/site-config';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home(props: Props) {
  const params = await props.params;

  const { locale } = params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('HomePage');
  const tFooter = await getTranslations('Footer');
  const tFeatures = await getTranslations('HomePage.features');

  const features = [
    { key: 'nextjs', icon: '⚡' },
    { key: 'react', icon: '⚛️' },
    { key: 'typescript', icon: '🔷' },
    { key: 'tailwind', icon: '🎨' },
    { key: 'shadcn', icon: '🎯' },
    { key: 'darkMode', icon: '🌙' },
    { key: 'i18n', icon: '🌍' },
    { key: 'env', icon: '🔒' },
    { key: 'linting', icon: '🔧' },
    { key: 'docker', icon: '🐳' },
  ];

  const techStack = [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Shadcn/ui',
  ];

  return (
    <div className="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
      {/* Header with Controls */}
      <header className="container mx-auto px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="text-primary h-6 w-6" />
            <span className="text-lg font-semibold">Next.js 15 Template</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Section */}
            <section className="mb-12 lg:mb-20">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-8">
                  <p className="text-muted-foreground mb-2 text-lg">
                    {t('greeting')}
                  </p>
                  <h1 className="from-primary to-primary/60 mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl lg:text-7xl">
                    {t('name')}
                  </h1>
                  <h2 className="text-muted-foreground mb-6 text-xl font-medium md:text-2xl lg:text-3xl">
                    {t('title')}
                  </h2>
                </div>

                <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg leading-relaxed md:text-xl">
                  {t('description')}
                </p>

                {/* CTA Buttons */}
                <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="group" asChild>
                    <a
                      href="https://www.linkedin.com/in/abdo-saleh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-5 w-5" />
                      {t('viewLinkedIn')}
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>

                  <Button variant="outline" size="lg" asChild>
                    <a
                      href="https://github.com/abdosalehpkcs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-5 w-5" />
                      {t('viewGitHub')}
                    </a>
                  </Button>
                </div>

                {/* Tech Stack */}
                <div className="mb-16">
                  <p className="text-muted-foreground mb-4 text-sm">
                    {t('builtWith')}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {techStack.map(tech => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="mb-16">
              <div className="mb-12 text-center">
                <h3 className="mb-4 flex items-center justify-center gap-2 text-2xl font-bold md:text-3xl">
                  <Rocket className="text-primary h-8 w-8" />
                  {tFeatures('title')}
                </h3>
                <p className="text-muted-foreground mx-auto max-w-2xl">
                  {t('templateInfo')}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {features.map(feature => (
                  <Card
                    key={feature.key}
                    className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <span className="text-2xl">{feature.icon}</span>
                        <span className="group-hover:text-primary transition-colors">
                          {tFeatures(feature.key)}
                        </span>
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* About Template Section */}
            <section className="mb-16">
              <Card className="border-primary/10 from-primary/5 border-2 bg-gradient-to-r to-transparent">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Code2 className="text-primary h-6 w-6" />
                    Next.js 15 Template
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t('templateInfo')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button size="lg" className="group" asChild>
                    <a
                      href="https://github.com/abd-alrahman-saleh/nextjs-15-template"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-5 w-5" />
                      {t('getStarted')}
                      <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Configuration Sidebar */}
          <aside className="space-y-4 lg:w-80 xl:w-96">
            <div className="sticky top-4 space-y-4">
              {/* Site Configuration */}
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Settings className="text-primary h-4 w-4" />
                    Site Config
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">Title</p>
                    <p className="text-sm font-medium break-words">
                      {siteConfig.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">
                      Description
                    </p>
                    <p className="text-muted-foreground line-clamp-2 text-xs">
                      {siteConfig.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">URL</p>
                    <p className="font-mono text-xs break-all">
                      {siteConfig.url}
                    </p>
                  </div>
                  <div className="border-t pt-2">
                    <code className="text-muted-foreground text-xs">
                      lib/site-config.ts
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Environment Variables - Client */}
              <Card className="border-blue-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Globe2 className="h-4 w-4 text-blue-500" />
                    Client Env
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">
                      App URL
                    </p>
                    <p className="font-mono text-xs break-all">
                      {env.NEXT_PUBLIC_APP_URL}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">
                      App Name
                    </p>
                    <p className="text-sm font-medium">
                      {env.NEXT_PUBLIC_APP_NAME}
                    </p>
                  </div>
                  <div className="border-t pt-2">
                    <code className="text-muted-foreground text-xs">
                      env.ts (client)
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Environment Variables - Server */}
              <Card className="border-orange-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Server className="h-4 w-4 text-orange-500" />
                    Server Env
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">
                      Node Environment
                    </p>
                    <Badge
                      variant={
                        env.NODE_ENV === 'production' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {env.NODE_ENV}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">
                      Google Site Verification
                    </p>
                    <p className="font-mono text-xs">
                      {env.GOOGLE_SITE_VERIFICATION_ID || (
                        <span className="text-muted-foreground italic">
                          Not configured
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 text-xs">
                      Google Analytics
                    </p>
                    <p className="font-mono text-xs">
                      {env.GOOGLE_SITE_ANALYTICS_ID || (
                        <span className="text-muted-foreground italic">
                          Not configured
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="border-t pt-2">
                    <code className="text-muted-foreground text-xs">
                      env.ts (server)
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-green-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Shield className="h-4 w-4 text-green-500" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      Features
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {features.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      Tech Stack
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {techStack.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">
                      Locale
                    </span>
                    <Badge variant="secondary" className="text-xs uppercase">
                      {locale}
                    </Badge>
                  </div>
                  <div className="border-t pt-2">
                    <p className="text-muted-foreground text-xs">
                      Runtime info
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 mt-16 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {tFooter('madeBy')}{' '}
              <span className="text-foreground font-semibold">{t('name')}</span>
            </p>
            <div className="mb-4 flex justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/abdo-saleh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/abdosalehpkcs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 {t('name')}. {tFooter('allRightsReserved')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
