import React from 'react';
import { Layers, CheckCircle, Headphones, MessageSquare, ShieldCheck, HeartHandshake } from 'lucide-react';

export const WhyChooseUs = () => {
  const whyCards = [
    {
      icon: Layers,
      title: "Multiple Trusted Brands",
      desc: "Access electrical products across several established brands under one roof without visiting multiple dealers."
    },
    {
      icon: CheckCircle,
      title: "Wide Product Range",
      desc: "Find products for different residential, commercial, and electrical contractor requirements with ease."
    },
    {
      icon: ShieldCheck,
      title: "Quality Focused",
      desc: "We focus on dependable electrical products manufactured to recognized safety standards for long service life."
    },
    {
      icon: Headphones,
      title: "Customer Support",
      desc: "Get personalized assistance from our team to find the exact electrical product and rating you require."
    },
    {
      icon: MessageSquare,
      title: "Convenient Enquiry",
      desc: "Submit product inquiries easily through our online quote form or connect directly via WhatsApp and Phone."
    },
    {
      icon: HeartHandshake,
      title: "Professional Service",
      desc: "A straightforward, honest, and customer-focused electrical product experience for all buyers."
    }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg-white)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <ShieldCheck size={14} />
            <span>Our Advantage</span>
          </div>
          <h2 className="section-title">Why Choose Samu Electricals?</h2>
          <p className="section-description">
            We simplify electrical product sourcing with genuine product variety, technical clarity, and dependable service.
          </p>
        </div>

        <div className="why-grid">
          {whyCards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div key={idx} className="why-card">
                <div className="why-icon-box">
                  <IconComp size={26} />
                </div>
                <h3 className="why-title">{card.title}</h3>
                <p className="why-desc">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
