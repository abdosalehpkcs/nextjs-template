export const siteConfig = {
  title: 'Antra Beverage Distribution',
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
  ],
  url: process.env.APP_URL || 'http://localhost:3000',
  company: {
    name: 'Antra Beverage Distribution',
    email: 'info@antrabeverage.be',
    phone: '+32 2 123 45 67',
    address: '123 Commerce Street, 1000 Brussels, Belgium',
    hours: {
      weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
      weekend: 'Saturday: 9:00 AM - 1:00 PM',
      closed: 'Sunday: Closed',
    },
  },
};
