import { ContactForm } from './ContactForm';
import styles from './ContactSection.module.css';

type ContactSectionProps = {
  title?: string;
  description?: string;
};

export function ContactSection({
  title = 'Contact us',
  description = 'Tell us about your project and we will get back to you shortly.',
}: ContactSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <ContactForm />
    </section>
  );
}
