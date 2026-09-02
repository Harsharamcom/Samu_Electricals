import React from 'react';
import { ArrowRight, Check, Layers, Sparkles } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';

export const About = ({ onLearnMoreClick }) => {
  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--color-bg-white)' }}>
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrapper">
            <img
              src="/images/switches-accessories.jpg"
              alt="Samu Electricals Modular Switches and Product Showcase"
              className="about-image"
            />
            <div className="about-badge-card">
              <Sparkles size={24} color="#D99A2B" />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem' }}>Multi-Brand Assortment</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>Authentic Products</div>
              </div>
            </div>
          </div>

          <div>
            <div className="section-badge">
              <Layers size={14} />
              <span>Who We Are</span>
            </div>

            <h2 className="section-title">
              About Samu Electricals
            </h2>

            <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
              <strong>Samu Electricals</strong> is a dedicated multi-brand electrical products supplier and dealer. We specialize in providing a wide selection of genuine electrical components for residential, commercial, and industrial requirements.
            </p>

            <p style={{ marginBottom: '1.5rem', fontSize: '0.975rem', color: 'var(--color-slate)' }}>
              Our commitment is to simplify product sourcing for homeowners, electrical contractors, builders, and technicians by offering trusted brands under one roof with transparent product guidance and dependable customer support.
            </p>

            <ul className="about-bullets">
              <li className="about-bullet-item">
                <Check size={18} />
                <span>Wide Brand Availability</span>
              </li>
              <li className="about-bullet-item">
                <Check size={18} />
                <span>Extensive Product Range</span>
              </li>
              <li className="about-bullet-item">
                <Check size={18} />
                <span>Quality Focused Selection</span>
              </li>
              <li className="about-bullet-item">
                <Check size={18} />
                <span>Professional Technical Support</span>
              </li>
              <li className="about-bullet-item">
                <Check size={18} />
                <span>Retail & Wholesale Enquiries</span>
              </li>
              <li className="about-bullet-item">
                <Check size={18} />
                <span>Straightforward Quotations</span>
              </li>
            </ul>

            <button onClick={onLearnMoreClick} className="btn btn-navy">
              <span>Learn More About Our Range</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
