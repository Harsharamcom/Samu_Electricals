import React from 'react';
import { ArrowRight, Grid } from 'lucide-react';
import { categories } from '../data/categories';

export const Categories = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="section" style={{ backgroundColor: 'var(--color-bg-warm)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Grid size={14} />
            <span>Product Spectrum</span>
          </div>
          <h2 className="section-title">Explore Our Electrical Products</h2>
          <p className="section-description">
            Discover a comprehensive catalog of genuine electrical supplies categorized for easy product discovery and quote request.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-image-box">
                <img src={cat.image} alt={cat.name} className="category-image" />
              </div>
              <div className="category-content">
                <h3 className="category-title">{cat.name}</h3>
                <p className="category-desc">{cat.shortDesc}</p>

                <div className="category-footer">
                  <span className="category-count">{cat.itemCount}</span>
                  <button
                    className="category-btn"
                    onClick={() => onSelectCategory(cat.id)}
                  >
                    <span>View Products</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
