// Updated useAdminData.js
import { useState } from 'react';

const useAdminData = () => {
  // Initialize pricing state that will be shared across both admin and public
  const [pricing, setPricing] = useState([
    {
      id: 1,
      name: 'Express',
      photos: '1-10',
      price: 60,
      turnaround: '48 hours',
      popular: false
    },
    {
      id: 2,
      name: 'Quick',
      photos: '11-25',
      price: 100,
      turnaround: '36 hours',
      popular: true
    },
    {
      id: 3,
      name: 'Standard',
      photos: '26-50',
      price: 130,
      turnaround: '24 hours',
      popular: false
    },
    {
      id: 4,
      name: 'Pro',
      photos: '50+',
      price: 200,
      turnaround: 'Custom',
      popular: false
    },
    {
      id: 5,
      name: 'Ultra',
      photos: '50+',
      price: 280,
      turnaround: 'Custom',
      popular: false
    }
  ]);

  const updatePricingLocal = (id, newPrice) => {
    setPricing(prevPricing => 
      prevPricing.map(item => 
        item.id === id ? { ...item, price: newPrice } : item
      )
    );
  };

  // Format pricing data for public view
  const getPublicPricing = () => {
    return pricing.map(plan => ({
      package: plan.name,
      photocount: `${plan.photos} photos`,
      turnaround: plan.turnaround,
      price: `$${plan.price}`,
      popular: plan.popular
    }));
  };

  return {
    pricing,
    updatePricingLocal,
    getPublicPricing
  };
};

export default useAdminData;