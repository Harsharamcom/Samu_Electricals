import React, { useEffect } from 'react';
import { businessInfo } from '../data/businessInfo';
import { faqs } from '../data/faqs';

export const SeoManager = () => {
  useEffect(() => {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "ElectricalStore",
      "name": businessInfo.name,
      "description": businessInfo.description,
      "url": businessInfo.seo.canonicalUrl,
      "telephone": businessInfo.phone.primaryRaw,
      "email": businessInfo.email.primary,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": businessInfo.address.street,
        "addressLocality": businessInfo.address.city,
        "addressRegion": businessInfo.address.state,
        "postalCode": businessInfo.address.postalCode,
        "addressCountry": "IN"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "20:30"
        }
      ],
      "makesOffer": [
        "Electrical Switches",
        "LED Lighting Products",
        "Wires and Cables",
        "Modular Electrical Accessories",
        "Distribution Boards and MCBs"
      ],
      "brand": ["Havells", "Lisha", "Legrand", "Philips", "Kundan Cab", "Polycab", "Schneider Electric"]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": businessInfo.seo.canonicalUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": `${businessInfo.seo.canonicalUrl}#products`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Brands",
          "item": `${businessInfo.seo.canonicalUrl}#brands`
        }
      ]
    };

    const injectScript = (id, data) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    injectScript('jsonld-local-business', localBusinessSchema);
    injectScript('jsonld-faq-page', faqSchema);
    injectScript('jsonld-breadcrumb', breadcrumbSchema);

  }, []);

  return null;
};
