import darkThemeImage from '@/assets/images/settings/theme_dark.webp';
import lightThemeImage from '@/assets/images/settings/theme_light.webp';
import systemThemeImage from '@/assets/images/settings/theme_system.webp';

export const pricingPlans = [
  {
    title: 'Basic',
    price: 30,
    description: 'The basics to get your team started for up to 10 users.',
    features: [
      'Up to 10 team members',
      'Up to 5,000 requests a day',
      'Up to 1GB max file limits',
      '7-day log retention',
      '24/7 support access',
    ],
  },
  {
    title: 'Pro',
    price: 60,
    description: 'Advanced features for growing teams with more demands.',
    features: [
      'Up to 25 team members',
      'Up to 25,000 requests a day',
      'Up to 5GB max file limits',
      '30-day log retention',
      'Priority support access',
      'Advanced analytics',
    ],
    isPopular: true,
  },
];

export const themes = [
  {
    label: 'Dark',
    value: 'dark',
    image: darkThemeImage,
  },
  {
    label: 'Light',
    value: 'light',
    image: lightThemeImage,
  },
  {
    label: 'System',
    value: 'system',
    image: systemThemeImage,
  },
];
