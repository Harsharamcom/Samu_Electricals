import React from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';

export const FloatingMobileCTA = ({ onOpenEnquiry }) => {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="floating-mobile-cta">
      <div className="floating-mobile-grid">
        <a
          href={`tel:${businessInfo.phone.primaryRaw}`}
          className="floating-mobile-btn call"
        >
          <Phone size={15} />
          <span>Call Us</span>
        </a>

        <a
          href={`https://wa.me/${businessInfo.whatsapp.number}?text=${encodeURIComponent(businessInfo.whatsapp.defaultMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-mobile-btn whatsapp"
        >
          <MessageSquare size={15} />
          <span>WhatsApp</span>
        </a>

        <a
          href="#enquiry"
          className="floating-mobile-btn quote"
          onClick={(e) => handleNavClick(e, '#enquiry')}
        >
          <Send size={15} />
          <span>Get Quote</span>
        </a>
      </div>
    </div>
  );
};
