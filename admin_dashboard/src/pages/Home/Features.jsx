import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import '../../styles/Features.css';

const Features = () => {
  const features = [
    {
      category: 'For Vendors',
      items: [
        { icon: '📦', title: 'Order Management', description: 'Create and manage delivery orders with ease' },
        { icon: '📊', title: 'Analytics Dashboard', description: 'Track performance with detailed insights' },
        { icon: '💳', title: 'Flexible Billing', description: 'Multiple payment options and invoicing' },
        { icon: '🔔', title: 'Real-time Notifications', description: 'Stay updated on every order status' }
      ]
    },
    {
      category: 'For Drivers',
      items: [
        { icon: '🗺️', title: 'Route Optimization', description: 'Get the fastest routes for deliveries' },
        { icon: '💰', title: 'Earnings Tracker', description: 'Monitor your daily and monthly earnings' },
        { icon: '📱', title: 'Mobile App', description: 'Manage deliveries on the go' },
        { icon: '⭐', title: 'Rating System', description: 'Build your reputation with customer ratings' }
      ]
    },
    {
      category: 'Platform Features',
      items: [
        { icon: '🔒', title: 'Secure & Safe', description: 'Bank-level security for all transactions' },
        { icon: '🌍', title: 'Multi-location Support', description: 'Operate across multiple cities' },
        { icon: '📞', title: '24/7 Support', description: 'Round-the-clock customer service' },
        { icon: '🚀', title: 'Fast Processing', description: 'Quick order processing and dispatch' }
      ]
    }
  ];

  return (
    <div className="features-page">
      <Navbar />
      
      <section className="features-hero">
        <div className="container">
          <h1>Powerful Features for Modern Logistics</h1>
          <p>Everything you need to run a successful delivery business</p>
        </div>
      </section>

      <section className="features-content">
        <div className="container">
          {features.map((section, index) => (
            <div key={index} className="feature-section">
              <h2 className="section-category">{section.category}</h2>
              <div className="features-grid">
                {section.items.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <div className="feature-icon-large">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;