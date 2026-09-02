import * as XLSX from 'xlsx';

const LOCAL_STORAGE_KEY = 'samu_electricals_quotations_v1';

/**
 * Save a new customer quotation to persistent localStorage storage
 */
export const saveQuotationToStorage = (enquiryData) => {
  try {
    const existing = getSavedQuotationsFromStorage();
    const newEntry = {
      id: `SE-QUOTE-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      ...enquiryData
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.error('Error saving quotation to localStorage:', err);
    return null;
  }
};

/**
 * Get all saved customer quotations from localStorage
 */
export const getSavedQuotationsFromStorage = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading quotations from localStorage:', err);
    return [];
  }
};

/**
 * Clear all saved quotations from localStorage
 */
export const clearSavedQuotationsFromStorage = () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing quotations storage:', err);
  }
};

/**
 * Export a single quotation entry as an Excel file (.xlsx)
 */
export const exportSingleQuotationToExcel = (enquiry) => {
  const wb = XLSX.utils.book_new();

  const data = [
    ["SAMU ELECTRICALS - CUSTOMER QUOTATION ENQUIRY SHEET"],
    ["Generated Date & Time:", enquiry.timestamp || new Date().toLocaleString()],
    ["Quotation Reference ID:", enquiry.id || "N/A"],
    [""],
    ["CUSTOMER CONTACT INFORMATION"],
    ["Full Name:", enquiry.name],
    ["Phone Number:", enquiry.phone],
    ["Email Address:", enquiry.email || "Not Provided"],
    [""],
    ["PRODUCT REQUIREMENT DETAILS"],
    ["Requirement / Product:", enquiry.requirement],
    ["Preferred Brand:", enquiry.brand || "Any Preferred Brand"],
    ["Estimated Quantity:", enquiry.quantity || "Not Specified"],
    ["Additional Notes / Message:", enquiry.message || "None"],
    [""],
    ["DISCLAIMER: Samu Electricals Multi-Brand Supplier - Quotation Request Form Record"]
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);

  // Set custom column widths
  ws['!cols'] = [
    { wch: 30 },
    { wch: 50 }
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Quotation Detail");

  const sanitizedName = enquiry.name ? enquiry.name.replace(/[^a-zA-Z0-9]/g, '_') : 'Customer';
  const fileName = `Samu_Quotation_${sanitizedName}_${Date.now()}.xlsx`;

  XLSX.writeFile(wb, fileName);
};

/**
 * Export all collected customer quotations into a Master Excel Spreadsheet (.xlsx)
 */
export const exportAllQuotationsToExcel = (quotationsArray) => {
  const list = quotationsArray && quotationsArray.length > 0 
    ? quotationsArray 
    : getSavedQuotationsFromStorage();

  if (!list || list.length === 0) {
    alert("No quotation records found to export.");
    return;
  }

  // Format data into rows
  const formattedData = list.map((q, index) => ({
    "S.No": index + 1,
    "Quotation ID": q.id || `SE-${index + 1}`,
    "Date & Time": q.timestamp || "N/A",
    "Customer Name": q.name,
    "Phone Number": q.phone,
    "Email": q.email || "-",
    "Product / Requirement": q.requirement,
    "Preferred Brand": q.brand || "Any",
    "Quantity": q.quantity || "-",
    "Customer Notes": q.message || "-"
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(formattedData);

  // Set column widths for comfortable Excel viewing
  ws['!cols'] = [
    { wch: 6 },   // S.No
    { wch: 16 },  // Quotation ID
    { wch: 22 },  // Date & Time
    { wch: 22 },  // Customer Name
    { wch: 16 },  // Phone
    { wch: 25 },  // Email
    { wch: 35 },  // Requirement
    { wch: 18 },  // Preferred Brand
    { wch: 15 },  // Quantity
    { wch: 40 }   // Customer Notes
  ];

  XLSX.utils.book_append_sheet(wb, ws, "All Quotations");

  const todayStr = new Date().toISOString().split('T')[0];
  const fileName = `Samu_Electricals_Master_Quotations_${todayStr}.xlsx`;

  XLSX.writeFile(wb, fileName);
};
