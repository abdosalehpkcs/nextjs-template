'use client';

import { useState, FormEvent } from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { brands } from '@/data/products';
import { siteConfig } from '@/lib/site-config';

interface FormData {
  companyName: string;
  vatId: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  interestedBrands: string[];
  volume: string;
  message: string;
}

export default function ContactPage() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    vatId: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    interestedBrands: [],
    volume: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (formData.interestedBrands.length === 0) {
      newErrors.interestedBrands = 'Please select at least one brand';
    }

    if (!formData.volume) {
      newErrors.volume = 'Please select estimated volume';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('[v0] Lead form submission:', formData);

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        companyName: '',
        vatId: '',
        contactName: '',
        email: '',
        phone: '',
        location: '',
        interestedBrands: [],
        volume: '',
        message: '',
      });
      setSubmitSuccess(false);
    }, 3000);
  };

  const toggleBrand = (brand: string) => {
    setFormData((prev) => ({
      ...prev,
      interestedBrands: prev.interestedBrands.includes(brand)
        ? prev.interestedBrands.filter((b) => b !== brand)
        : [...prev.interestedBrands, brand],
    }));
  };

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="border-b bg-muted/40 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">
            {t('ContactPage.title')}
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            {t('ContactPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        {t('ContactPage.form.companyName')} *
                      </Label>
                      <Input
                        id="companyName"
                        placeholder={t('ContactPage.form.companyNamePlaceholder')}
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        aria-invalid={!!errors.companyName}
                      />
                      {errors.companyName && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    {/* VAT ID */}
                    <div className="space-y-2">
                      <Label htmlFor="vatId">
                        {t('ContactPage.form.vatId')}
                      </Label>
                      <Input
                        id="vatId"
                        placeholder={t('ContactPage.form.vatIdPlaceholder')}
                        value={formData.vatId}
                        onChange={(e) =>
                          setFormData({ ...formData, vatId: e.target.value })
                        }
                      />
                    </div>

                    {/* Contact Name and Email */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">
                          {t('ContactPage.form.contactName')} *
                        </Label>
                        <Input
                          id="contactName"
                          placeholder={t('ContactPage.form.contactNamePlaceholder')}
                          value={formData.contactName}
                          onChange={(e) =>
                            setFormData({ ...formData, contactName: e.target.value })
                          }
                          aria-invalid={!!errors.contactName}
                        />
                        {errors.contactName && (
                          <p className="text-sm text-destructive" role="alert">
                            {errors.contactName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {t('ContactPage.form.email')} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t('ContactPage.form.emailPlaceholder')}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone and Location */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {t('ContactPage.form.phone')} *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t('ContactPage.form.phonePlaceholder')}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive" role="alert">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">
                          {t('ContactPage.form.location')} *
                        </Label>
                        <Input
                          id="location"
                          placeholder={t('ContactPage.form.locationPlaceholder')}
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                          aria-invalid={!!errors.location}
                        />
                        {errors.location && (
                          <p className="text-sm text-destructive" role="alert">
                            {errors.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Interested Brands */}
                    <div className="space-y-2">
                      <Label>{t('ContactPage.form.interestedBrands')} *</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('ContactPage.form.selectBrands')}
                      </p>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {brands.map((brand) => (
                          <label
                            key={brand.slug}
                            className="flex items-center gap-2 rounded-md border p-3 transition-colors hover:bg-accent"
                          >
                            <Checkbox
                              checked={formData.interestedBrands.includes(brand.slug)}
                              onChange={() => toggleBrand(brand.slug)}
                            />
                            <span className="text-sm">{brand.name}</span>
                          </label>
                        ))}
                      </div>
                      {errors.interestedBrands && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.interestedBrands}
                        </p>
                      )}
                    </div>

                    {/* Volume Estimate */}
                    <div className="space-y-2">
                      <Label htmlFor="volume">
                        {t('ContactPage.form.volumeEstimate')} *
                      </Label>
                      <Select
                        id="volume"
                        value={formData.volume}
                        onChange={(e) =>
                          setFormData({ ...formData, volume: e.target.value })
                        }
                        aria-invalid={!!errors.volume}
                      >
                        <option value="">
                          {t('ContactPage.form.selectVolume')}
                        </option>
                        <option value="small">{t('ContactPage.volumes.small')}</option>
                        <option value="medium">{t('ContactPage.volumes.medium')}</option>
                        <option value="large">{t('ContactPage.volumes.large')}</option>
                        <option value="enterprise">
                          {t('ContactPage.volumes.enterprise')}
                        </option>
                      </Select>
                      {errors.volume && (
                        <p className="text-sm text-destructive" role="alert">
                          {errors.volume}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {t('ContactPage.form.message')}
                      </Label>
                      <Textarea
                        id="message"
                        placeholder={t('ContactPage.form.messagePlaceholder')}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={5}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="space-y-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting || submitSuccess}
                      >
                        {isSubmitting
                          ? t('ContactPage.form.submitting')
                          : submitSuccess
                            ? t('ContactPage.form.success')
                            : t('ContactPage.form.submit')}
                      </Button>
                      {submitSuccess && (
                        <p className="text-center text-sm text-green-600" role="status">
                          {t('ContactPage.form.success')}
                        </p>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('ContactPage.info.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t('ContactPage.info.email')}
                      </p>
                      <a
                        href={`mailto:${siteConfig.company.email}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {siteConfig.company.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t('ContactPage.info.phone')}
                      </p>
                      {siteConfig.company.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t('ContactPage.info.address')}
                      </p>
                      <p className="text-balance text-sm text-muted-foreground">
                        {siteConfig.company.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {t('ContactPage.info.hours')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.company.hours.weekdays}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.company.hours.weekend}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {siteConfig.company.hours.closed}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
