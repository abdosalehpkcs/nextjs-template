'use client';

import { useState, useTransition } from 'react';

import { submitContact } from '../actions/submitContact';
import type { ContactActionResult } from '../schema/contactSchema';
import styles from './ContactForm.module.css';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  description: '',
  privacyAccepted: false,
};

type FormState = typeof initialState;

type FieldErrors = Record<string, string> | undefined;

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [result, setResult] = useState<ContactActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);

    startTransition(async () => {
      const response = await submitContact({
        ...formState,
        phone: formState.phone || undefined,
      });
      setResult(response);

      if (response.ok) {
        setFormState(initialState);
      }
    });
  };

  const fieldErrors: FieldErrors = result?.ok ? undefined : result?.fieldErrors;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>First name</span>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={event => updateField('firstName', event.target.value)}
            required
            maxLength={80}
            autoComplete="given-name"
          />
          {fieldErrors?.firstName ? (
            <span className={styles.error}>{fieldErrors.firstName}</span>
          ) : null}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Last name</span>
          <input
            className={styles.input}
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={event => updateField('lastName', event.target.value)}
            required
            maxLength={80}
            autoComplete="family-name"
          />
          {fieldErrors?.lastName ? (
            <span className={styles.error}>{fieldErrors.lastName}</span>
          ) : null}
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          className={styles.input}
          type="email"
          name="email"
          value={formState.email}
          onChange={event => updateField('email', event.target.value)}
          required
          maxLength={254}
          autoComplete="email"
        />
        {fieldErrors?.email ? (
          <span className={styles.error}>{fieldErrors.email}</span>
        ) : null}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Phone (optional)</span>
        <input
          className={styles.input}
          type="tel"
          name="phone"
          value={formState.phone}
          onChange={event => updateField('phone', event.target.value)}
          maxLength={40}
          autoComplete="tel"
        />
        {fieldErrors?.phone ? (
          <span className={styles.error}>{fieldErrors.phone}</span>
        ) : null}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>How can we help?</span>
        <textarea
          className={styles.textarea}
          name="description"
          value={formState.description}
          onChange={event => updateField('description', event.target.value)}
          required
          minLength={10}
          maxLength={5000}
          rows={6}
        />
        {fieldErrors?.description ? (
          <span className={styles.error}>{fieldErrors.description}</span>
        ) : null}
      </label>

      <label className={styles.checkboxRow}>
        <input
          className={styles.checkbox}
          type="checkbox"
          name="privacyAccepted"
          checked={formState.privacyAccepted}
          onChange={event =>
            updateField('privacyAccepted', event.target.checked)
          }
          required
        />
        <span className={styles.checkboxLabel}>
          I agree to the privacy policy.
        </span>
      </label>
      {fieldErrors?.privacyAccepted ? (
        <span className={styles.error}>{fieldErrors.privacyAccepted}</span>
      ) : null}

      <button className={styles.submit} type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send message'}
      </button>

      {result && result.ok ? (
        <div className={styles.success} role="status">
          Thanks! Your message has been sent.
        </div>
      ) : null}

      {result && !result.ok ? (
        <div className={styles.errorSummary} role="alert">
          {result.message}
        </div>
      ) : null}
    </form>
  );
}
