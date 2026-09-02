import React from 'react';
import { Award, PackageCheck, UserCheck, Headset } from 'lucide-react';

export const TrustBar = () => {
  const trustPoints = [
    {
      icon: Award,
      title: "Trusted Brands",
      sub: "Established Manufacturers"
    },
    {
      icon: PackageCheck,
      title: "Quality Products",
      sub: "Dependable Specifications"
    },
    {
      icon: UserCheck,
      title: "Professional Service",
      sub: "Expert Guidance & Support"
    },
    {
      icon: Headset,
      title: "Customer Focused",
      sub: "Easy Product Enquiries"
    }
  ];

  return (
    <section className="trust-bar">
      <div className="container">
        <div className="trust-grid">
          {trustPoints.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="trust-item">
                <div className="trust-icon-box">
                  <IconComp size={22} />
                </div>
                <div>
                  <div className="trust-item-title">{item.title}</div>
                  <div className="trust-item-sub">{item.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
