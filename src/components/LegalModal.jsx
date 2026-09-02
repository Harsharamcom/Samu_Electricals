import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';

export const LegalModal = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-primary)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}>
              {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-steel)' }}>{businessInfo.name} • Official Document</div>
          </div>
        </div>

        <div style={{ fontSize: '0.925rem', color: 'var(--color-slate)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {isPrivacy ? (
            <>
              <p>
                At <strong>Samu Electricals</strong>, we respect your privacy and are committed to protecting any personal information submitted via our product enquiry form.
              </p>
              <h4 style={{ color: 'var(--color-primary)' }}>1. Information We Collect</h4>
              <p>
                When you request a product quotation, we collect your name, phone number, email address, and product requirements purely for quotation fulfillment.
              </p>
              <h4 style={{ color: 'var(--color-primary)' }}>2. Use of Information</h4>
              <p>
                Your information is strictly used to answer your enquiries, provide price estimates, and communicate order details. We do not sell or rent customer data.
              </p>
              <h4 style={{ color: 'var(--color-primary)' }}>3. Contact Us</h4>
              <p>
                For any privacy questions or data updates, please contact Samu Electricals directly through our contact details.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong>Samu Electricals</strong>. By browsing our website and making product enquiries, you agree to the following terms:
              </p>
              <h4 style={{ color: 'var(--color-primary)' }}>1. Product Listings & Quotations</h4>
              <p>
                All product information and images are provided for reference. Prices and stock availability are subject to store confirmation at the time of quotation.
              </p>
              <h4 style={{ color: 'var(--color-primary)' }}>2. Trademarks & Brand Rights</h4>
              <p>
                All brand names (Havells, Legrand, Philips, Kundan Cab, Lisha, etc.) are registered trademarks of their respective owners. Samu Electricals supplies products across these brands.
              </p>
              <h4 style={{ color: 'var(--color-primary)' }}>3. Limitation of Liability</h4>
              <p>
                Samu Electricals ensures genuine product supply. Electrical installations should be carried out by qualified electricians.
              </p>
            </>
          )}
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button onClick={onClose} className="btn btn-navy btn-sm">
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
