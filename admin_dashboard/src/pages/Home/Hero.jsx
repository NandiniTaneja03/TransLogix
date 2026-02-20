import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import '../../styles/Hero.css';

const Hero = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Fast Delivery',
      description: 'Get your packages delivered quickly and efficiently with our express service.'
    },
    {
      icon: '📍',
      title: 'Real-time Tracking',
      description: 'Track your deliveries in real-time with live GPS tracking and updates.'
    },
    {
      icon: '💰',
      title: 'Affordable Pricing',
      description: 'Competitive pricing with no hidden fees. Pay only for what you use.'
    },
    {
      icon: '🔒',
      title: 'Secure & Safe',
      description: 'Your packages are insured and handled with utmost care and security.'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Get insights into your delivery performance with detailed analytics.'
    },
    {
      icon: '24/7',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you whenever you need.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Restaurant Owner',
      content: 'TransLogix has transformed our delivery operations. Fast, reliable, and affordable!',
      avatar: 'S'
    },
    {
      name: 'Mike Chen',
      role: 'E-commerce Store',
      content: 'The real-time tracking and analytics have helped us improve our customer satisfaction significantly.',
      avatar: 'M'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Retail Business',
      content: 'Best logistics partner we\'ve worked with. Professional service and great support team.',
      avatar: 'E'
    }
  ];

  return (
    <div className="hero-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Transform Your Logistics
              <span className="gradient-text"> with TransLogix</span>
            </h1>
            <p className="hero-description">
              Complete delivery management solution for businesses of all sizes. 
              Fast, reliable, and affordable logistics at your fingertips.
            </p>
            <div className="hero-buttons">
              <Link to="/register-vendor" className="btn-hero primary">
                Get Started Free
              </Link>
              <Link to="/register-driver" className="btn-hero secondary">
                Become a Driver
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <h3>10+</h3>
                <p>Active Users</p>
              </div>
              <div className="stat-item">
                <h3>Working</h3>
                <p>Deliveries</p>
              </div>
              <div className="stat-item">
                <h3>98%</h3>
                <p>Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">
              <svg viewBox="0 0 500 500" className="delivery-illustration">
                <circle cx="250" cy="250" r="200" fill="url(#heroGradient)" opacity="0.1"/>
                <path d="M200,250 L300,250 L300,300 L200,300 Z" fill="#6366f1"/>
                <circle cx="220" cy="320" r="15" fill="#1a1d29"/>
                <circle cx="280" cy="320" r="15" fill="#1a1d29"/>
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header-center">
            <h2>Why Choose TransLogix?</h2>
            <p>Everything you need to manage your logistics efficiently</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <div className="section-header-center">
            <h2>How It Works</h2>
            <p>Get started in three simple steps</p>
          </div>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up as a vendor or driver in minutes</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-item">
              <div className="step-number">2</div>
              <h3>Create Order</h3>
              <p>Enter pickup and delivery details</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-item">
              <div className="step-number">3</div>
              <h3>Track & Deliver</h3>
              <p>Monitor your delivery in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header-center">
            <h2>What Our Clients Say</h2>
            <p>Trusted by thousands of businesses worldwide</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Transform Your Logistics?</h2>
          <p>Join thousands of businesses using TransLogix</p>
          <div className="cta-buttons">
            <Link to="/register-vendor" className="btn-cta primary">
              Start Free Trial
            </Link>
            <Link to="/login" className="btn-cta secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hero;