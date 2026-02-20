import React, { useState } from 'react';
import { 
  Truck, Star, Clock, Shield, ArrowRight, Menu, X,
  Package, Users, TrendingUp, MapPin, Phone, Mail
} from 'lucide-react';

const HomePage = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Clock size={32} />,
      title: 'Fast Delivery',
      description: 'Lightning-fast deliveries with real-time tracking and updates'
    },
    {
      icon: <Shield size={32} />,
      title: 'Safe & Secure',
      description: 'Your packages are insured and handled with utmost care'
    },
    {
      icon: <Star size={32} />,
      title: 'Rated Drivers',
      description: 'All drivers are verified and rated by customers'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Best Prices',
      description: 'Competitive pricing with transparent billing'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Deliveries' },
    { number: '500+', label: 'Active Drivers' },
    { number: '1000+', label: 'Happy Customers' },
    { number: '4.8', label: 'Average Rating' }
  ];

  return (
    <div className="homepage-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <Truck size={32} />
            <span>TransLogix</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#drivers">For Drivers</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            <button 
              className="btn-secondary"
              onClick={() => onNavigate('login')}
            >
              Login
            </button>
            <button 
              className="btn-primary"
              onClick={() => onNavigate('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About Us</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#drivers" onClick={() => setMobileMenuOpen(false)}>For Drivers</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <button 
              className="btn-secondary mobile-btn"
              onClick={() => onNavigate('login')}
            >
              Login
            </button>
            <button 
              className="btn-primary mobile-btn"
              onClick={() => onNavigate('signup')}
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Fast, Reliable Delivery<br />
              <span className="gradient-text">At Your Service</span>
            </h1>
            <p className="hero-subtitle">
              Connect with verified drivers for all your delivery needs. 
              Real-time tracking, competitive pricing, and 24/7 support.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn-hero-primary"
                onClick={() => onNavigate('signup', 'customer')}
              >
                Get Started
                <ArrowRight size={20} />
              </button>
              <button 
                className="btn-hero-secondary"
                onClick={() => onNavigate('signup', 'driver')}
              >
                Become a Driver
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card floating">
              <Package size={48} />
              <h3>Package Tracking</h3>
              <p>Real-time updates</p>
            </div>
            <div className="hero-card floating" style={{ animationDelay: '0.2s' }}>
              <Users size={48} />
              <h3>500+ Drivers</h3>
              <p>Ready to deliver</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h2>{stat.number}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose TransLogix?</h2>
          <p>We provide the best delivery experience with our premium services</p>
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
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>About TransLogix</h2>
            <p>
              TransLogix is a leading delivery management platform connecting 
              customers with verified, professional drivers. We're committed to 
              providing fast, reliable, and secure delivery services.
            </p>
            <p>
              Our platform empowers drivers with flexible work opportunities and 
              provides businesses with efficient delivery solutions. With advanced 
              tracking, transparent pricing, and 24/7 support, we're revolutionizing 
              the delivery industry.
            </p>
            <ul className="about-list">
              <li>✓ Verified and rated drivers</li>
              <li>✓ Real-time package tracking</li>
              <li>✓ Secure and insured deliveries</li>
              <li>✓ 24/7 customer support</li>
            </ul>
          </div>
          <div className="about-image">
            <div className="about-card">
              <Truck size={64} />
              <h3>Professional Service</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Drivers Section */}
      <section id="drivers" className="drivers-section">
        <div className="drivers-content">
          <h2>Join Our Driver Network</h2>
          <p className="drivers-subtitle">
            Earn on your schedule. Be your own boss. Get paid weekly.
          </p>
          <div className="drivers-benefits">
            <div className="benefit-card">
              <div className="benefit-number">1</div>
              <h3>Sign Up</h3>
              <p>Create your driver profile and complete verification</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-number">2</div>
              <h3>Get Orders</h3>
              <p>Accept delivery requests that match your schedule</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-number">3</div>
              <h3>Earn Money</h3>
              <p>Get paid weekly with transparent earnings tracking</p>
            </div>
          </div>
          <div className="drivers-features">
            <div className="driver-feature">
              <Star className="feature-icon-small" />
              <div>
                <h4>Build Your Rating</h4>
                <p>Higher ratings = More orders + Better pay</p>
              </div>
            </div>
            <div className="driver-feature">
              <Clock className="feature-icon-small" />
              <div>
                <h4>Flexible Schedule</h4>
                <p>Work when you want, where you want</p>
              </div>
            </div>
            <div className="driver-feature">
              <TrendingUp className="feature-icon-small" />
              <div>
                <h4>Weekly Payouts</h4>
                <p>Track earnings in real-time, get paid fast</p>
              </div>
            </div>
          </div>
          <button 
            className="btn-driver-signup"
            onClick={() => onNavigate('signup', 'driver')}
          >
            Start Driving Today
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Have questions? We're here to help!</p>
            <div className="contact-methods">
              <div className="contact-method">
                <MapPin size={24} />
                <div>
                  <h4>Address</h4>
                  <p>123 Delivery Street, City, State 12345</p>
                </div>
              </div>
              <div className="contact-method">
                <Phone size={24} />
                <div>
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="contact-method">
                <Mail size={24} />
                <div>
                  <h4>Email</h4>
                  <p>support@translogix.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h3>Send us a message</h3>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Subject" required />
              <textarea placeholder="Your Message" rows="4" required></textarea>
              <button type="submit" className="btn-send">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Truck size={32} />
              <span>TransLogix</span>
            </div>
            <p>Fast, reliable delivery at your fingertips.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
          </div>
          <div className="footer-section">
            <h4>For Drivers</h4>
            <a href="#drivers">Become a Driver</a>
            <a href="#" onClick={() => onNavigate('login', 'driver')}>Driver Login</a>
            <a href="#faq">Driver FAQ</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="#contact">Contact Us</a>
            <a href="#faq">FAQ</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 TransLogix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;