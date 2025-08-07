/**
 * Pricing data configuration - can be moved to backend later
 * Admin can modify these values without touching component code
 */
export const pricingPlans = [
  {
    package: 'Basic',
    photocount: '1-10 photos',
    turnaround: '48 hours',
    price: '$49',
    popular: false
  },
  {
    package: 'Standard',
    photocount: '11-25 photos',
    turnaround: '36 hours',
    price: '$99',
    popular: true
  },
  {
    package: 'Premium',
    photocount: '26-50 photos',
    turnaround: '24 hours',
    price: '$149',
    popular: false
  },
  {
    package: 'Enterprise',
    photocount: '50+ photos',
    turnaround: 'Custom',
    price: 'Contact Us',
    popular: false
  }
];