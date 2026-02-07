'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Package, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { brands, products } from '@/data/products';

export default function HomePage() {
  const { t } = useTranslation();
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-8 flex items-center justify-center">
              <Image
                src="/images/antrading-logo.png"
                alt="AN Trading BV"
                width={160}
                height={160}
                className="aspect-square h-32 w-32 object-contain sm:h-40 sm:w-40"
                priority
              />
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {t('HomePage.hero.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t('HomePage.hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/products">
                  {t('HomePage.hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">{t('HomePage.hero.ctaSecondary')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('HomePage.brands.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              {t('HomePage.brands.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group relative flex flex-col items-center gap-3 rounded-lg border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: brand.color }}
                  >
                    {brand.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-center text-sm font-semibold text-foreground">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/40 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t('HomePage.featured.title')}
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/products">
                {t('HomePage.featured.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {product.brand}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-balance text-lg font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-pretty text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  {product.packageSize && (
                    <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <Package className="h-3 w-3" />
                      {product.packageSize}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link href="/products">
                {t('HomePage.featured.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('HomePage.why.title')}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {t('HomePage.why.reliability')}
              </h3>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                {t('HomePage.why.reliabilityDesc')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {t('HomePage.why.quality')}
              </h3>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                {t('HomePage.why.qualityDesc')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {t('HomePage.why.competitive')}
              </h3>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                {t('HomePage.why.competitiveDesc')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {t('HomePage.why.support')}
              </h3>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                {t('HomePage.why.supportDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Partner With Us?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-primary-foreground/90">
            Contact our team today for a personalized quote and discover how we can support your business.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="mt-8"
          >
            <Link href="/contact">
              {t('Navigation.requestQuote')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
