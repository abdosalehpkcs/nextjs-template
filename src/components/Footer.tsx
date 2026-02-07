'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LegalLinks } from '@/components/legal';
import { siteConfig } from '@/lib/site-config';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              Antra<span className="text-foreground">Beverage</span>
            </h3>
            <p className="text-balance text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('Footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('Footer.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('Footer.products')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('Footer.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('Footer.contactUs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('Footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <a
                  href={`mailto:${siteConfig.company.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {siteConfig.company.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <a
                  href={`tel:${siteConfig.company.phone}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {siteConfig.company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-balance text-sm text-muted-foreground">
                  {siteConfig.company.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('Footer.company')}
            </h3>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              {siteConfig.company.hours.weekdays}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.company.hours.weekend}
            </p>
            <p className="text-sm text-muted-foreground">
              {siteConfig.company.hours.closed}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.company.name}.{' '}
              {t('Footer.copyright')}
            </p>
            <LegalLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}
