import React from 'react';
import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';

export const TopHeader = ({ onOpenEnquiry }) => {
  return (
    <div className="top-header">
      <div className="container top-header-inner">
        <div className="top-header-info">
          <div className="top-header-item">
            <MapPin size={13} />
            <span>{businessInfo.address.formatted}</span>
          </div>
          <div className="top-header-item top-header-hours">
            <Clock size={13} />
            <span>{businessInfo.hours.display}</span>
          </div>
        </div>

        <div className="top-header-actions">
          <div className="top-header-item">
            <Phone size={13} />
            <span>{businessInfo.phone.display}</span>
          </div>

          <button 
            onClick={onOpenEnquiry} 
            className="btn btn-sm btn-outline" 
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
          >
            <MessageSquare size={12} /> Quick Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};
