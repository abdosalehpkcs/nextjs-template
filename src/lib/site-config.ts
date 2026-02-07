export const siteConfig = {
  title: 'AN Trading BV',
  description:
    'Premium B2B beverage distributor. Specializing in Fanta, Monster, Coca-Cola, Spa Reine, Schweppes, and Freez brands. Quality wholesale distribution for businesses across Belgium.',
  keywords: [
    'beverage distribution',
    'B2B drinks',
    'Fanta wholesale',
    'Monster distributor',
    'Coca-Cola supplier',
    'Schweppes Belgium',
    'wholesale beverages',
    'bulk drinks',
    'AN Trading BV',
  ],
  url: process.env.APP_URL || 'http://localhost:3000',
  company: {
    name: 'AN Trading BV',
    email: 'info@antradebv.com',
    phones: ['+32 495 33 33 94', '+32 497 77 73 78'],
    phone: '+32 495 33 33 94',
    address: 'Brussels, Belgium',
    hours: {
      weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
      weekend: 'Saturday: 9:00 AM - 1:00 PM',
      closed: 'Sunday: Closed',
    },
  },
};
