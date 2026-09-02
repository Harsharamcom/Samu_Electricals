import React from 'react';
import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { businessInfo } from '../data/businessInfo';

export const TopHeader = ({ onOpenEnquiry }) => {
  return (
    <div className="top-header">
      <div className="container top-header-inner">
        <div className="top-header-info">
          <div className="top-header-item">
            <MapPin size={14} />
            <span>{businessInfo.address.formatted}</span>
            <span className="placeholder-badge">Placeholder</span>
          </div>
          <div className="top-header-item">
            <Clock size={14} />
            <span>{businessInfo.hours.display}</span>
          </div>
        </div>

        <div className="top-header-actions">
          <div className="top-header-item">
            <Phone size={14} />
            <span>{businessInfo.phone.display}</span>
          </div>

          <button 
            onClick={onOpenEnquiry} 
            className="btn btn-sm btn-outline" 
            style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}
          >
            <MessageSquare size={13} /> Quick Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};
