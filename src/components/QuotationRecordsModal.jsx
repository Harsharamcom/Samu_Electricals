import React, { useState } from 'react';
import { X, FileSpreadsheet, Download, Trash2, Search, Table, RefreshCw } from 'lucide-react';
import { getSavedQuotationsFromStorage, exportAllQuotationsToExcel, exportSingleQuotationToExcel, clearSavedQuotationsFromStorage } from '../utils/excelExporter';

export const QuotationRecordsModal = ({ isOpen, onClose }) => {
  const [quotations, setQuotations] = useState(() => getSavedQuotationsFromStorage());
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const refreshList = () => {
    setQuotations(getSavedQuotationsFromStorage());
  };

  const filtered = quotations.filter((q) => {
    const term = searchTerm.toLowerCase();
    return (
      q.name?.toLowerCase().includes(term) ||
      q.phone?.toLowerCase().includes(term) ||
      q.requirement?.toLowerCase().includes(term) ||
      q.brand?.toLowerCase().includes(term)
    );
  });

  const handleExportMaster = () => {
    exportAllQuotationsToExcel(quotations);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all stored quotation records?")) {
      clearSavedQuotationsFromStorage();
      setQuotations([]);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', width: '95%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--color-light-slate)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#15803D', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', margin: 0 }}>
                Submitted Quotations Excel Log
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-steel)' }}>
                {quotations.length} customer enquiry record(s) saved in local database
              </div>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '360px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-steel)' }} />
            <input
              type="text"
              className="search-input"
              style={{ padding: '0.5rem 0.85rem 0.5rem 2.4rem', fontSize: '0.875rem' }}
              placeholder="Search quotes by customer name, phone, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={refreshList} className="btn btn-outline btn-sm" title="Refresh List">
              <RefreshCw size={15} />
            </button>

            <button
              onClick={handleExportMaster}
              className="btn btn-sm"
              style={{ backgroundColor: '#15803D', color: '#FFFFFF' }}
              disabled={quotations.length === 0}
            >
              <Download size={16} />
              <span>Export All to Master Excel (.xlsx)</span>
            </button>

            {quotations.length > 0 && (
              <button onClick={handleClearAll} className="btn btn-outline btn-sm" style={{ color: 'var(--color-error)' }} title="Clear History">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Table View */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: 'var(--color-bg-warm)', borderRadius: '8px', border: '1px solid var(--color-light-slate)' }}>
            <Table size={40} color="var(--color-steel)" style={{ marginBottom: '0.75rem' }} />
            <p style={{ fontSize: '1rem', color: 'var(--color-slate)' }}>
              {quotations.length === 0 ? "No customer quotation submissions recorded yet." : "No records match your search."}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', maxHeight: '55vh', borderRadius: '8px', border: '1px solid var(--color-light-slate)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-primary)', color: '#FFFFFF' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>ID & Date</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Customer</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Phone</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Product / Requirement</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Brand</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Qty</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Excel</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q, idx) => (
                  <tr key={q.id || idx} style={{ borderBottom: '1px solid var(--color-light-slate)', backgroundColor: idx % 2 === 0 ? '#FFFFFF' : 'var(--color-bg-warm)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: '700', color: 'var(--color-primary)', fontSize: '0.8rem' }}>{q.id}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-steel)' }}>{q.timestamp}</div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--color-dark-charcoal)' }}>
                      {q.name}
                      {q.email && <div style={{ fontSize: '0.75rem', color: 'var(--color-steel)', fontWeight: '400' }}>{q.email}</div>}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--color-primary)', fontWeight: '500' }}>
                      {q.phone}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: '500' }}>{q.requirement}</div>
                      {q.message && <div style={{ fontSize: '0.75rem', color: 'var(--color-slate)', fontStyle: 'italic' }}>"{q.message}"</div>}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ backgroundColor: 'var(--color-bg-soft)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>
                        {q.brand}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>
                      {q.quantity || '-'}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => exportSingleQuotationToExcel(q)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                        title="Download Individual Excel Sheet"
                      >
                        <Download size={13} />
                        <span>.xlsx</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-steel)' }}>
            🟢 All entries are automatically stored and formatted as Microsoft Excel (.xlsx) spreadsheets.
          </div>
          <button onClick={onClose} className="btn btn-navy btn-sm">
            Close Log
          </button>
        </div>
      </div>
    </div>
  );
};
