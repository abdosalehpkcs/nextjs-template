'use client';

import { Award, Heart, Lightbulb, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="border-b bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">
            {t('AboutPage.title')}
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            {t('AboutPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-foreground">
            {t('AboutPage.mission.title')}
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            {t('AboutPage.mission.content')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-foreground">
                14+
              </div>
              <div className="mt-2 text-sm text-primary-foreground/90">
                {t('AboutPage.stats.yearsExperience')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-foreground">
                500+
              </div>
              <div className="mt-2 text-sm text-primary-foreground/90">
                {t('AboutPage.stats.happyClients')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-foreground">
                62+
              </div>
              <div className="mt-2 text-sm text-primary-foreground/90">
                {t('AboutPage.stats.productRange')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-foreground">
                99%
              </div>
              <div className="mt-2 text-sm text-primary-foreground/90">
                {t('AboutPage.stats.deliveryRate')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            {t('AboutPage.values.title')}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {t('AboutPage.values.integrity')}
                </h3>
                <p className="text-pretty text-sm text-muted-foreground">
                  {t('AboutPage.values.integrityDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {t('AboutPage.values.excellence')}
                </h3>
                <p className="text-pretty text-sm text-muted-foreground">
                  {t('AboutPage.values.excellenceDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {t('AboutPage.values.partnership')}
                </h3>
                <p className="text-pretty text-sm text-muted-foreground">
                  {t('AboutPage.values.partnershipDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {t('AboutPage.values.innovation')}
                </h3>
                <p className="text-pretty text-sm text-muted-foreground">
                  {t('AboutPage.values.innovationDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
