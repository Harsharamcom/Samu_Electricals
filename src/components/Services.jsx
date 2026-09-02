import React from 'react';
import { Home, Building2, Zap, Truck, ShieldCheck, Wrench, Check, ArrowRight } from 'lucide-react';
import { services } from '../data/services';

const iconMap = {
  Home,
  Building2,
  Zap,
  Truck,
  ShieldCheck,
  Wrench
};

export const Services = ({ onEnquireService }) => {
  return (
    <section id="services" className="section" style={{ backgroundColor: 'var(--color-bg-warm)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Wrench size={14} />
            <span>Product Solutions</span>
          </div>
          <h2 className="section-title">Electrical Product Solutions</h2>
          <p className="section-description">
            Tailored supply solutions for homeowners, commercial interiors, contractors, and specialized electrical requirements.
          </p>
        </div>

        <div className="services-grid">
          {services.map((svc) => {
            const IconComp = iconMap[svc.iconName] || Zap;
            return (
              <div key={svc.id} className="service-card">
                <div className="service-header">
                  <div className="service-icon">
                    <IconComp size={22} />
                  </div>
                  <h3 className="service-title">{svc.title}</h3>
                </div>

                <p className="service-desc">{svc.desc}</p>

                <ul className="service-features-list">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="service-feature-item">
                      <Check size={14} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onEnquireService(svc.title)}
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '1.25rem', width: '100%' }}
                >
                  <span>Request Solution Quote</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
