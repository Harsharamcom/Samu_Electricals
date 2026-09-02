import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Navigation } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';

export const Contact = () => {
  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--color-bg-white)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Phone size={14} />
            <span>Reach Us</span>
          </div>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-description">
            Contact Samu Electricals for product enquiries, stock availability, or store visit details.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: NAP Contact Information */}
          <div className="contact-info-cards">
            <div className="contact-card-item">
              <div className="contact-card-icon">
                <MapPin size={22} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 className="contact-card-title">Business Address</h3>
                </div>
                <div className="contact-card-val">{businessInfo.address.formatted}</div>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-card-icon">
                <Phone size={22} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 className="contact-card-title">Phone Number</h3>
                </div>
                <div className="contact-card-val">{businessInfo.phone.display}</div>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-card-icon">
                <Mail size={22} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 className="contact-card-title">Email Address</h3>
                </div>
                <div className="contact-card-val">{businessInfo.email.display}</div>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-card-icon">
                <Clock size={22} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 className="contact-card-title">Business Hours</h3>
                </div>
                <div className="contact-card-val">{businessInfo.hours.display}</div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-warm)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--color-light-slate)', marginTop: '0.5rem' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={18} color="#25D366" />
                <span>WhatsApp Business Enquiry</span>
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-slate)', marginBottom: '1rem' }}>
                Connect directly with our store team for quick availability checks and product photos.
              </p>
              <a
                href={`https://wa.me/${businessInfo.whatsapp.number}?text=${encodeURIComponent(businessInfo.whatsapp.defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{ backgroundColor: '#25D366', color: '#FFFFFF', width: '100%' }}
              >
                <MessageSquare size={16} />
                <span>Message on WhatsApp ({businessInfo.phone.display})</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Google Map Embed */}
          <div className="map-container-box">
            <div className="map-placeholder-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="#D99A2B" />
                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Find Samu Electricals Showroom</span>
              </div>
              <span className="placeholder-badge" style={{ backgroundColor: 'rgba(217,154,43,0.2)', color: '#FFFFFF', borderColor: '#D99A2B' }}>
                Interactive Location
              </span>
            </div>

            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '440px' }}>
              <iframe
                src={businessInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Samu Electricals Google Maps Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
