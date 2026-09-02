import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';

export const Hero = ({ onExploreClick, onContactClick }) => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-badge">
              <ShieldCheck size={16} />
              <span>Multi-Brand Electrical Supplier</span>
            </div>

            <h1 className="hero-headline">
              {businessInfo.tagline}
            </h1>

            <p className="hero-subtext">
              {businessInfo.description}
            </p>

            <div className="hero-ctas">
              <button onClick={onExploreClick} className="btn btn-primary">
                <span>Explore Products</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={onContactClick} className="btn btn-outline" style={{ color: '#FFFFFF', borderColor: '#7B8794' }}>
                <PhoneCall size={18} />
                <span>Contact Us</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
                <CheckCircle2 size={16} color="#D99A2B" />
                <span>Genuine Products</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
                <CheckCircle2 size={16} color="#D99A2B" />
                <span>Multiple Top Brands</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
                <CheckCircle2 size={16} color="#D99A2B" />
                <span>Retail & Wholesale</span>
              </div>
            </div>
          </div>

          <div>
            <div className="hero-visual-card">
              <img
                src="./images/hero-showroom.jpg"
                alt="Samu Electricals Showroom Display of Modular Switches, Wires, LED Panels and Circuit Breakers"
                className="hero-image"
              />

              <div className="hero-floating-badge">
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#D99A2B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={20} color="#FFFFFF" />
                </div>
                <div>
                  <p>Established Brand Variety</p>
                  <span>Havells • Legrand • Philips • Kundan Cab</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
