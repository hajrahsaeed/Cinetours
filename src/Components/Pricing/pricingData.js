/**
 * Pricing data configuration - can be moved to backend later
 * Admin can modify these values without touching component code
 */
export const pricingPlans = [
  {
    package: 'Express',
    photocount: '1-10 photos',
    turnaround: '48 hours',
    price: '$60',
    popular: false
  },
  {
    package: 'Quick',
    photocount: '11-25 photos',
    turnaround: '36 hours',
    price: '$100',
    popular: true
  },
  {
    package: 'Standered',
    photocount: '26-50 photos',
    turnaround: '24 hours',
    price: '$130',
    popular: false
  },
  {
    package: 'Pro',
    photocount: '50+ photos',
    turnaround: 'Custom',
    price: '$200',
    popular: false
  },
  {
    package: 'Ultra',
    photocount: '50+ photos',
    turnaround: 'Custom',
    price: '$280',
    popular: false
  }
];