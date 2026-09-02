import React from 'react';
import { X, Check, ShieldAlert, Send } from 'lucide-react';

export const ProductDetailModal = ({ product, onClose, onEnquireProduct }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ borderRadius: '8px', overflow: 'hidden', backgroundColor: 'var(--color-bg-soft)', height: '220px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-hover)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              {product.brand}
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              {product.name}
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-steel)', marginBottom: '0.75rem' }}>
              Category: <strong>{product.category}</strong>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-slate)', lineHeight: '1.5' }}>
              {product.shortDesc}
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--color-bg-warm)', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--color-light-slate)' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--color-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldAlert size={16} color="#D99A2B" />
            <span>Product Specifications & Details</span>
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            {product.specs.map((spec, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--color-dark-charcoal)' }}>
                <Check size={14} color="#15803D" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-outline btn-sm">
            Close
          </button>
          <button
            onClick={() => {
              onEnquireProduct(product);
              onClose();
            }}
            className="btn btn-primary btn-sm"
          >
            <Send size={16} />
            <span>Enquire About This Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};
