'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { brands, products } from '@/data/products';

export default function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { t } = useTranslation();
  const { slug } = use(params);

  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    notFound();
  }

  const brandProducts = products.filter((p) => p.brand === brand.slug);

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section
        className="border-b py-16"
        style={{
          background: `linear-gradient(to bottom, ${brand.color}15, transparent)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('BrandPage.backToCatalog')}
            </Link>
          </Button>

          <div className="flex items-center gap-4">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: `${brand.color}20` }}
            >
              <span
                className="text-4xl font-bold"
                style={{ color: brand.color }}
              >
                {brand.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">
                {brand.name}
              </h1>
              <p className="mt-2 text-pretty text-lg text-muted-foreground">
                {brand.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            {t('BrandPage.products')} ({brandProducts.length})
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {brandProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-balance text-lg font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-pretty text-sm text-muted-foreground">
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
        </div>
      </section>
    </div>
  );
}
