import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '../data/faqs';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section" style={{ backgroundColor: 'var(--color-bg-warm)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Find clear answers to common questions regarding electrical products, brands, and enquiry processes at Samu Electricals.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={20} color="#D99A2B" /> : <ChevronDown size={20} color="#7B8794" />}
                </button>

                {isOpen && (
                  <div className="faq-answer-box">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
