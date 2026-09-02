import React, { useState } from 'react';
import { Search, Filter, Eye, Send, Check, PackageSearch } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { brands } from '../data/brands';
import { ProductDetailModal } from './ProductDetailModal';

export const FeaturedProducts = ({ selectedCategoryFilter, onEnquireProduct, onAddToQuoteList, quoteItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(selectedCategoryFilter || 'all');
  const [activeBrand, setActiveBrand] = useState('all');
  const [viewingProduct, setViewingProduct] = useState(null);

  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prod.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prod.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === 'all' || prod.categoryId === activeCategory;
    const matchesBrand = activeBrand === 'all' || prod.brand.toLowerCase() === activeBrand.toLowerCase();

    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <section id="products" className="section" style={{ backgroundColor: 'var(--color-bg-warm)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <PackageSearch size={14} />
            <span>Product Showcase</span>
          </div>
          <h2 className="section-title">Popular Electrical Product Categories</h2>
          <p className="section-description">
            Explore popular electrical supplies across leading brands. Request custom quotations for single items or bulk site requirements.
          </p>
        </div>

        <div className="catalog-controls">
          <div className="catalog-search-row">
            <div className="search-input-box">
              <Search size={18} />
              <input
                type="text"
                className="search-input"
                placeholder="Search products by keyword (e.g. Havells wire, modular switch, LED panel)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} color="var(--color-steel)" />
              <select
                className="form-select"
                style={{ minWidth: '160px', padding: '0.75rem 0.85rem' }}
                value={activeBrand}
                onChange={(e) => setActiveBrand(e.target.value)}
              >
                <option value="all">All Brands</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="category-filter-chips">
            <button
              className={`filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Products ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--color-light-slate)' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-slate)', marginBottom: '1rem' }}>
              No products found matching your filter criteria.
            </p>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
                setActiveBrand('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const isAddedToQuote = quoteItems.some((item) => item.id === product.id);

              return (
                <div key={product.id} className="product-card">
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <span className="product-brand-tag">{product.brand}</span>
                    {product.popular && <span className="product-popular-badge">Popular</span>}
                  </div>

                  <div className="product-info">
                    <span className="product-category-lbl">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc">{product.shortDesc}</p>

                    <div className="product-specs-list">
                      {product.specs.slice(0, 3).map((spec, idx) => (
                        <span key={idx} className="product-spec-pill">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="product-action-bar">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setViewingProduct(product)}
                        title="View Specifications"
                      >
                        <Eye size={16} />
                        <span>Specs</span>
                      </button>

                      <button
                        className={`btn btn-sm ${isAddedToQuote ? 'btn-navy' : 'btn-primary'}`}
                        onClick={() => {
                          onAddToQuoteList(product);
                        }}
                      >
                        {isAddedToQuote ? (
                          <>
                            <Check size={16} />
                            <span>In Quote List</span>
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Enquire Now</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {viewingProduct && (
        <ProductDetailModal
          product={viewingProduct}
          onClose={() => setViewingProduct(null)}
          onEnquireProduct={onEnquireProduct}
        />
      )}
    </section>
  );
};
