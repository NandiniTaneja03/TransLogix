import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import '../../styles/Hero.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaTruck, FaMapMarkerAlt, FaChartLine, FaShieldAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import CountUp from "react-countup";

const Hero = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const features = [
{
icon: <FaTruck />,
title: "Fast Delivery",
description: "Get your packages delivered quickly and efficiently."
},
{
icon: <FaMapMarkerAlt />,
title: "Real-time Tracking",
description: "Track deliveries in real time with GPS."
},
{
icon: <GiMoneyStack />,
title: "Affordable Pricing",
description: "Competitive pricing with no hidden fees."
},
{
icon: <FaShieldAlt />,
title: "Secure & Safe",
description: "Your packages are insured and protected."
},
{
icon: <FaChartLine />,
title: "Analytics Dashboard",
description: "Track performance with analytics."
},
{
icon: <MdSupportAgent />,
title: "24/7 Support",
description: "Round-the-clock support whenever needed."
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
                Become a Vendor
              </Link>
              <Link to="/register-driver" className="btn-hero secondary">
                Become a Driver
              </Link>
            </div>
           <div className="hero-stats">
<div className="stat-item">
<h3><CountUp end={10000} duration={2} />+</h3>
<p>Active Users</p>
</div>

<div className="stat-item">
<h3><CountUp end={50000} duration={2} />+</h3>
<p>Deliveries</p>
</div>

<div className="stat-item">
<h3><CountUp end={98} duration={2} />%</h3>
<p>Satisfaction</p>
</div>
</div>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">
              <svg viewBox="0 0 600 600" className="delivery-illustration">
                {/* Background Circle */}
                <circle cx="300" cy="300" r="280" fill="url(#heroBgGradient)" opacity="0.1"/>
                
                {/* Delivery Truck */}
                <g className="truck-animation">
                  {/* Truck Body */}
                  <rect x="200" y="280" width="140" height="80" rx="8" fill="#6366f1"/>
                  <rect x="220" y="260" width="80" height="40" rx="6" fill="#8b5cf6"/>
                  
                  {/* Truck Windows */}
                  <rect x="230" y="270" width="25" height="25" rx="3" fill="#1a1d29" opacity="0.3"/>
                  <rect x="265" y="270" width="25" height="25" rx="3" fill="#1a1d29" opacity="0.3"/>
                  
                  {/* Truck Details */}
                  <rect x="310" y="300" width="20" height="40" rx="3" fill="#8b5cf6"/>
                  <circle cx="240" cy="365" r="18" fill="#1a1d29"/>
                  <circle cx="240" cy="365" r="12" fill="#d1d5db"/>
                  <circle cx="310" cy="365" r="18" fill="#1a1d29"/>
                  <circle cx="310" cy="365" r="12" fill="#d1d5db"/>
                  
                  {/* Package Icon on truck */}
                  <rect x="255" y="305" width="35" height="35" rx="4" fill="#242938" opacity="0.5"/>
                  <path d="M272.5 312 L272.5 332 M262 317 L283 317" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
                </g>
                
                {/* GPS Pin - Pickup Location */}
                <g className="pin-animation-1">
                  <circle cx="180" cy="200" r="30" fill="url(#pinGradient)" opacity="0.2"/>
                  <circle cx="180" cy="200" r="20" fill="url(#pinGradient)" opacity="0.4"/>
                  <path d="M180 185 C170 185 165 195 165 200 C165 210 180 220 180 220 C180 220 195 210 195 200 C195 195 190 185 180 185 Z" fill="#22c55e"/>
                  <circle cx="180" cy="200" r="5" fill="white"/>
                </g>
                
                {/* GPS Pin - Delivery Location */}
                <g className="pin-animation-2">
                  <circle cx="420" cy="240" r="30" fill="url(#pinGradient2)" opacity="0.2"/>
                  <circle cx="420" cy="240" r="20" fill="url(#pinGradient2)" opacity="0.4"/>
                  <path d="M420 225 C410 225 405 235 405 240 C405 250 420 260 420 260 C420 260 435 250 435 240 C435 235 430 225 420 225 Z" fill="#6366f1"/>
                  <circle cx="420" cy="240" r="5" fill="white"/>
                </g>
                
                {/* Dotted Route Path */}
                <path d="M180 200 Q250 220 300 240 T420 240" 
                      stroke="#6366f1" 
                      strokeWidth="3" 
                      strokeDasharray="10,10" 
                      fill="none" 
                      opacity="0.5"
                      className="route-animation"/>
                
                {/* Floating Package Boxes */}
                <g className="float-animation-1">
                  <rect x="380" y="340" width="50" height="50" rx="6" fill="#8b5cf6" opacity="0.8"/>
                  <path d="M405 340 L405 390 M380 365 L430 365" stroke="#1a1d29" strokeWidth="2" strokeLinecap="round"/>
                </g>
                
                <g className="float-animation-2">
                  <rect x="150" y="380" width="40" height="40" rx="5" fill="#6366f1" opacity="0.7"/>
                  <path d="M170 380 L170 420 M150 400 L190 400" stroke="#1a1d29" strokeWidth="2" strokeLinecap="round"/>
                </g>
                
                {/* Speed Lines */}
                <g className="speed-lines" opacity="0.3">
                  <line x1="140" y1="310" x2="180" y2="310" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="150" y1="330" x2="185" y2="330" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="145" y1="350" x2="175" y2="350" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"/>
                </g>
                
                {/* Clock/Timer - Fast Delivery */}
                <g className="pulse-animation">
                  <circle cx="450" cy="350" r="35" fill="#242938" opacity="0.8"/>
                  <circle cx="450" cy="350" r="28" stroke="#22c55e" strokeWidth="2" fill="none"/>
                  <path d="M450 330 L450 350 L465 350" stroke="#22c55e" strokeWidth="3" strokeLinecap="round"/>
                </g>
                
                {/* Analytics Chart Icon */}
                <g className="scale-pulse">
                  <rect x="470" y="140" width="60" height="60" rx="8" fill="#242938" opacity="0.8"/>
                  <path d="M485 175 L485 165 M495 175 L495 155 M505 175 L505 160 M515 175 L515 150" 
                        stroke="#6366f1" 
                        strokeWidth="3" 
                        strokeLinecap="round"/>
                </g>
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="heroBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                  </linearGradient>
                  <radialGradient id="pinGradient">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="pinGradient2">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                  </radialGradient>
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