import React from 'react';
import { X, Trash2, Send, ShoppingBag } from 'lucide-react';

export const QuoteListDrawer = ({ isOpen, onClose, quoteItems, onRemoveItem, onProceedToEnquiry }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-light-slate)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={22} color="#D99A2B" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>
              Selected Quote Items ({quoteItems.length})
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {quoteItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <p style={{ fontSize: '1rem', color: 'var(--color-slate)', marginBottom: '1.25rem' }}>
              Your quote list is currently empty. Browse products and click <strong>"Enquire Now"</strong> to add items here.
            </p>
            <button onClick={onClose} className="btn btn-navy btn-sm">
              Explore Products
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '50vh', overflowY: 'auto', marginBottom: '1.5rem' }}>
              {quoteItems.map((item) => (
                <div
                  key={item.id}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', backgroundColor: 'var(--color-bg-warm)', borderRadius: '8px', border: '1px solid var(--color-light-slate)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-hover)', fontWeight: '700' }}>{item.brand}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '600' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-steel)' }}>{item.category}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '0.4rem' }}
                    title="Remove from Quote"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={onClose} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                Continue Browsing
              </button>
              <button
                onClick={() => {
                  onProceedToEnquiry();
                  onClose();
                }}
                className="btn btn-primary btn-sm"
                style={{ flex: 1.5 }}
              >
                <Send size={16} />
                <span>Submit Quote Enquiry</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
