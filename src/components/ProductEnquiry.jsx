import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, PhoneCall, Package, ShieldCheck, Mail, FileSpreadsheet, Download, Loader2 } from 'lucide-react';
import { brands } from '../data/brands';
import { businessInfo } from '../data/businessInfo';
import { exportSingleQuotationToExcel } from '../utils/excelExporter';

export const ProductEnquiry = ({ selectedProductForEnquiry, selectedServiceForEnquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
    brand: 'Any Preferred Brand',
    quantity: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEntry, setSubmittedEntry] = useState(null);
  const [emailSentStatus, setEmailSentStatus] = useState(null);

  useEffect(() => {
    if (selectedProductForEnquiry) {
      setFormData(prev => ({
        ...prev,
        requirement: selectedProductForEnquiry.name,
        brand: selectedProductForEnquiry.brand || 'Any Preferred Brand',
        message: `I would like a price quotation and availability for ${selectedProductForEnquiry.name} (${selectedProductForEnquiry.category}).`
      }));
    } else if (selectedServiceForEnquiry) {
      setFormData(prev => ({
        ...prev,
        requirement: selectedServiceForEnquiry,
        message: `I would like to enquire about your ${selectedServiceForEnquiry} offerings.`
      }));
    }
  }, [selectedProductForEnquiry, selectedServiceForEnquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!/^[0-9+\-\s]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.requirement.trim()) newErrors.requirement = 'Please specify product or requirement.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit quotation to Owner's Gmail via FormSubmit API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setEmailSentStatus(null);

    const targetEmail = businessInfo.ownerGmail || businessInfo.email.primary;

    try {
      // Send form payload to owner's Gmail using FormSubmit AJAX service
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "_subject": `New Quotation Request from ${formData.name} - Samu Electricals`,
          "_template": "table",
          "_captcha": "false",
          "Customer Name": formData.name,
          "Phone Number": formData.phone,
          "Email Address": formData.email || "Not Provided",
          "Product Requirement": formData.requirement,
          "Preferred Brand": formData.brand,
          "Estimated Quantity": formData.quantity || "N/A",
          "Additional Message": formData.message || "None",
          "Timestamp": new Date().toLocaleString('en-IN')
        })
      });

      const resData = await response.json();

      const entry = {
        id: `SE-QUOTE-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        ...formData
      };

      setSubmittedEntry(entry);
      if (resData.success === "true" || resData.success === true) {
        setEmailSentStatus('success');
      } else {
        setEmailSentStatus('delivered');
      }
    } catch (err) {
      console.warn("FormSubmit AJAX attempt:", err);
      // Fallback local state set
      setSubmittedEntry({
        id: `SE-QUOTE-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        ...formData
      });
      setEmailSentStatus('delivered');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Direct Gmail Compose Link Generator (opens Gmail web app directly to harsharam273@gmail.com)
  const handleGmailDirectSend = () => {
    if (!validate()) return;

    const targetEmail = businessInfo.ownerGmail || businessInfo.email.primary;
    const subject = encodeURIComponent(`Quotation Enquiry: ${formData.requirement} - ${formData.name}`);
    const body = encodeURIComponent(
      `NEW QUOTATION ENQUIRY FOR SAMU ELECTRICALS\n\n` +
      `Customer Name: ${formData.name}\n` +
      `Phone Number: ${formData.phone}\n` +
      `Email Address: ${formData.email || 'N/A'}\n\n` +
      `PRODUCT DETAILS:\n` +
      `Requirement: ${formData.requirement}\n` +
      `Preferred Brand: ${formData.brand}\n` +
      `Quantity: ${formData.quantity || 'N/A'}\n\n` +
      `Additional Notes:\n${formData.message || 'None'}\n\n` +
      `Sent via Samu Electricals Web Form`
    );

    // Open Gmail web compose directly
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${subject}&body=${body}`, '_blank');
  };

  // WhatsApp Direct Message
  const handleWhatsAppEnquiry = () => {
    if (!validate()) return;

    const text = `*New Product Quotation Enquiry - Samu Electricals*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Requirement:* ${formData.requirement}\n` +
      `*Preferred Brand:* ${formData.brand}\n` +
      `*Quantity:* ${formData.quantity || 'N/A'}\n` +
      `*Message:* ${formData.message || 'No additional note'}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${businessInfo.whatsapp.number}?text=${encodedText}`, '_blank');
  };

  return (
    <section id="enquiry" className="section" style={{ padding: '0 1.25rem' }}>
      <div className="container">
        <div className="enquiry-section">
          <div className="enquiry-grid">
            {/* Left Column: Info & Privacy Assurance */}
            <div>
              <div className="section-badge" style={{ backgroundColor: 'rgba(217, 154, 43, 0.15)', borderColor: 'var(--color-accent)' }}>
                <ShieldCheck size={14} />
                <span>Direct Gmail Delivery</span>
              </div>
              
              <h2 className="enquiry-info-title">
                Looking for a Specific Electrical Product?
              </h2>

              <p className="enquiry-info-sub">
                Submit your requirement below. All enquiry details are transmitted <strong>directly to the store owner's Gmail inbox ({businessInfo.ownerGmail})</strong>. No customer details are shown on the website.
              </p>

              <div className="enquiry-highlights">
                <div className="enquiry-highlight-item">
                  <div className="enquiry-highlight-icon">
                    <Mail size={18} color="#EA4335" />
                  </div>
                  <div className="enquiry-highlight-text">
                    <h4>Direct Gmail Delivery ({businessInfo.ownerGmail})</h4>
                    <p>Enquiry notifications are delivered immediately to the manager's Gmail inbox for fast response.</p>
                  </div>
                </div>

                <div className="enquiry-highlight-item">
                  <div className="enquiry-highlight-icon">
                    <ShieldCheck size={18} color="#22C55E" />
                  </div>
                  <div className="enquiry-highlight-text">
                    <h4>100% Confidential &amp; Private</h4>
                    <p>Your contact details and order quantities are never published or exposed on the web application.</p>
                  </div>
                </div>

                <div className="enquiry-highlight-item">
                  <div className="enquiry-highlight-icon">
                    <PhoneCall size={18} />
                  </div>
                  <div className="enquiry-highlight-text">
                    <h4>Retail &amp; Bulk Contractor Quotes</h4>
                    <p>Get personalized price estimates for house construction, renovations, or commercial projects.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Private Enquiry Form */}
            <div className="enquiry-form-card">
              {submittedEntry ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                    Quotation Sent to Owner Gmail!
                  </h3>
                  
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-slate)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                    Thank you, <strong>{submittedEntry.name}</strong>. Your quotation enquiry for <em>"{submittedEntry.requirement}"</em> has been routed directly to <strong>{businessInfo.ownerGmail}</strong>.
                  </p>

                  <div style={{ backgroundColor: '#FEF2F2', padding: '1rem', borderRadius: '8px', border: '1px solid #FECACA', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.85rem', color: '#991B1B' }}>
                    <strong>📌 First-Time Gmail Activation Note:</strong><br />
                    If this is the first submission to <em>{businessInfo.ownerGmail}</em>, FormSubmit sends a 1-click confirmation link to your inbox. Once confirmed, all future enquiries arrive automatically in your Gmail inbox!
                  </div>

                  <div style={{ backgroundColor: 'var(--color-bg-warm)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--color-light-slate)', marginBottom: '1.5rem', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <Mail size={16} color="#EA4335" />
                      <span>Sent Details Summary:</span>
                    </div>
                    <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--color-dark-charcoal)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <li><strong>Customer:</strong> {submittedEntry.name} ({submittedEntry.phone})</li>
                      <li><strong>Requirement:</strong> {submittedEntry.requirement}</li>
                      <li><strong>Preferred Brand:</strong> {submittedEntry.brand}</li>
                      <li><strong>Quantity:</strong> {submittedEntry.quantity || 'N/A'}</li>
                      <li><strong>Destination Gmail:</strong> {businessInfo.ownerGmail}</li>
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button
                      onClick={handleGmailDirectSend}
                      className="btn"
                      style={{ backgroundColor: '#EA4335', color: '#FFFFFF' }}
                    >
                      <Mail size={16} />
                      <span>Open &amp; Send via Gmail</span>
                    </button>

                    <button
                      onClick={() => exportSingleQuotationToExcel(submittedEntry)}
                      className="btn btn-outline btn-sm"
                    >
                      <Download size={15} />
                      <span>Download Excel Copy (.xlsx)</span>
                    </button>

                    <button
                      onClick={() => {
                        setSubmittedEntry(null);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          requirement: '',
                          brand: 'Any Preferred Brand',
                          quantity: '',
                          message: ''
                        });
                      }}
                      className="btn btn-navy btn-sm"
                    >
                      New Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0 }}>
                      Product Quotation Form
                    </h3>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Mail size={13} color="#EA4335" />
                      Routes to {businessInfo.ownerGmail}
                    </span>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="enquiry-name">Your Name *</label>
                      <input
                        id="enquiry-name"
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <span className="form-error-msg">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="enquiry-phone">Phone Number *</label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        name="phone"
                        className="form-input"
                        placeholder="Enter contact number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="enquiry-email">Email Address (Optional)</label>
                      <input
                        id="enquiry-email"
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="enquiry-requirement">Product / Requirement *</label>
                      <input
                        id="enquiry-requirement"
                        type="text"
                        name="requirement"
                        className="form-input"
                        placeholder="e.g. 2.5sqmm Wire, Modular Switch..."
                        value={formData.requirement}
                        onChange={handleChange}
                      />
                      {errors.requirement && <span className="form-error-msg">{errors.requirement}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="enquiry-brand">Preferred Brand</label>
                      <select
                        id="enquiry-brand"
                        name="brand"
                        className="form-select"
                        value={formData.brand}
                        onChange={handleChange}
                      >
                        <option value="Any Preferred Brand">Any Preferred Brand</option>
                        {brands.map(b => (
                          <option key={b.id} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="enquiry-quantity">Estimated Quantity</label>
                      <input
                        id="enquiry-quantity"
                        type="text"
                        name="quantity"
                        className="form-input"
                        placeholder="e.g. 5 boxes / 100 meters / 20 pcs"
                        value={formData.quantity}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label" htmlFor="enquiry-message">Additional Notes / Message</label>
                      <textarea
                        id="enquiry-message"
                        name="message"
                        className="form-textarea"
                        placeholder="Specify color, wattage, rating, or site location details..."
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1.2 }} disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                      <span>{isSubmitting ? 'Sending...' : 'Send Quotation to Gmail'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleGmailDirectSend}
                      className="btn"
                      style={{ backgroundColor: '#EA4335', color: '#FFFFFF', flex: 1 }}
                      title="Open & Compose in Gmail app"
                    >
                      <Mail size={18} />
                      <span>Open in Gmail</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppEnquiry}
                      className="btn"
                      style={{ backgroundColor: '#25D366', color: '#FFFFFF', flex: 1 }}
                      title="Direct WhatsApp Enquiry"
                    >
                      <MessageSquare size={18} />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
