import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, ChevronRight } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';

export const Navbar = ({ activeSection, quoteItemsCount, onOpenQuoteDrawer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Brands', href: '#brands' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar-sticky ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo with User Uploaded Official Samu Emblem */}
          <a href="#home" className="brand-logo" onClick={(e) => handleNavClick(e, '#home')}>
            <img
              src="./samu-logo.png"
              alt="Samu Electricals Official Logo"
              style={{
                height: '52px',
                width: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "./samu-logo.svg";
              }}
            />
            <div>
              <div className="brand-title">{businessInfo.name}</div>
              <div className="brand-subtitle">Multi-Brand Electrical Supplier</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Nav Actions */}
          <div className="nav-actions">
            {quoteItemsCount > 0 && (
              <button 
                onClick={onOpenQuoteDrawer} 
                className="btn btn-sm btn-outline"
                title="View Selected Quote Items"
              >
                <ShoppingBag size={16} />
                <span>Quote List</span>
                <span className="quote-count-badge">{quoteItemsCount}</span>
              </button>
            )}

            <a 
              href="#enquiry" 
              className="btn btn-primary"
              onClick={(e) => handleNavClick(e, '#enquiry')}
            >
              Get a Quote
            </a>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="brand-logo">
            <img
              src="./samu-logo.png"
              alt="Samu Electricals Logo"
              style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            />
            <div className="brand-title" style={{ fontSize: '1.2rem' }}>{businessInfo.name}</div>
          </div>
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span>{link.name}</span>
                <ChevronRight size={18} color="#7B8794" />
              </a>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <a
            href="#enquiry"
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={(e) => handleNavClick(e, '#enquiry')}
          >
            Get a Quote
          </a>
        </div>
      </div>
    </>
  );
};
