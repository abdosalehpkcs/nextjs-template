'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Package, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { products, brands } from '@/data/products';
import type { Brand } from '@/types/product';

export default function ProductsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [searchQuery, selectedBrands, selectedCategories]);

  const toggleBrand = (brand: Brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="border-b bg-muted/40 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">
            {t('ProductsPage.title')}
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            {t('ProductsPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('ProductsPage.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {/* Brand Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {t('ProductsPage.filterBrand')}
                    {selectedBrands.length > 0 && (
                      <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        {selectedBrands.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {brands.map((brand) => (
                    <DropdownMenuCheckboxItem
                      key={brand.slug}
                      checked={selectedBrands.includes(brand.slug)}
                      onCheckedChange={() => toggleBrand(brand.slug)}
                    >
                      {brand.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {t('ProductsPage.filterCategory')}
                    {selectedCategories.length > 0 && (
                      <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        {selectedCategories.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
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
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Package className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('ProductsPage.noResults')}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {t('ProductsPage.noResultsDesc')}
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrands([]);
                  setSelectedCategories([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
