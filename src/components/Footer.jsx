import React from 'react';
import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';

export const Footer = ({ onOpenLegal }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand Logo & Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img
                src="./samu-logo.png"
                alt="Samu Electricals Official Logo"
                style={{
                  height: '56px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.3))'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "./samu-logo.svg";
                }}
              />
              <span className="footer-brand-title">{businessInfo.name}</span>
            </div>
            <p className="footer-desc">
              Trusted electrical products from established brands for residential, commercial, and electrical contractor requirements.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#CBD5E1', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '6px' }}>
              <span>Multi-Brand Electrical Supplier</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home" className="footer-link" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
              <li><a href="#about" className="footer-link" onClick={(e) => handleNavClick(e, '#about')}>About Us</a></li>
              <li><a href="#products" className="footer-link" onClick={(e) => handleNavClick(e, '#products')}>Products Catalog</a></li>
              <li><a href="#brands" className="footer-link" onClick={(e) => handleNavClick(e, '#brands')}>Our Brands</a></li>
              <li><a href="#services" className="footer-link" onClick={(e) => handleNavClick(e, '#services')}>Product Solutions</a></li>
              <li><a href="#contact" className="footer-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Products Spectrum */}
          <div>
            <h4 className="footer-col-title">Products</h4>
            <ul className="footer-links">
              <li><a href="#products" className="footer-link" onClick={(e) => handleNavClick(e, '#products')}>Wires & Cables</a></li>
              <li><a href="#products" className="footer-link" onClick={(e) => handleNavClick(e, '#products')}>Modular Switches</a></li>
              <li><a href="#products" className="footer-link" onClick={(e) => handleNavClick(e, '#products')}>LED Lighting</a></li>
              <li><a href="#products" className="footer-link" onClick={(e) => handleNavClick(e, '#products')}>Electrical Accessories</a></li>
              <li><a href="#products" className="footer-link" onClick={(e) => handleNavClick(e, '#products')}>Distribution & MCBs</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#CBD5E1', fontSize: '0.875rem' }}>
                <MapPin size={16} color="#D99A2B" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                <span>{businessInfo.address.formatted}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#CBD5E1', fontSize: '0.875rem' }}>
                <Phone size={16} color="#D99A2B" style={{ flexShrink: 0 }} />
                <span>{businessInfo.phone.display}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#CBD5E1', fontSize: '0.875rem' }}>
                <Mail size={16} color="#D99A2B" style={{ flexShrink: 0 }} />
                <span>{businessInfo.email.display}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#CBD5E1', fontSize: '0.875rem' }}>
                <MessageSquare size={16} color="#25D366" style={{ flexShrink: 0 }} />
                <span>{businessInfo.whatsapp.display}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {currentYear} Samu Electricals. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button
              onClick={() => onOpenLegal('privacy')}
              style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
