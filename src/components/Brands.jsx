import React from 'react';
import { ShieldCheck, Tag } from 'lucide-react';
import { brands } from '../data/brands';

export const Brands = ({ onBrandSelect }) => {
  return (
    <section id="brands" className="section brands-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <ShieldCheck size={14} />
            <span>Brand Variety</span>
          </div>
          <h2 className="section-title">Trusted Brands Under One Roof</h2>
          <p className="section-description">
            Choose from a wide range of genuine electrical products sourced from established, industry-leading electrical manufacturers.
          </p>
        </div>

        <div className="brands-grid">
          {brands.map((b) => (
            <div key={b.id} className="brand-card">
              <span className="brand-badge">{b.highlightBadge}</span>
              <h3 className="brand-name">{b.name}</h3>
              <p className="brand-tagline">{b.tagline}</p>
              <p className="brand-desc">{b.desc}</p>
              
              <div className="brand-lines">
                {b.availableLines.map((line, idx) => (
                  <span key={idx} className="brand-line-tag">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="brand-disclaimer">
          <Tag size={16} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} />
          <span>Product availability across brands may vary depending on current store stock and manufacturer supply schedules.</span>
        </div>
      </div>
    </section>
  );
};
