import React, { useState } from 'react';
import { SeoManager } from './components/SeoManager';
import { TopHeader } from './components/TopHeader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { About } from './components/About';
import { Categories } from './components/Categories';
import { Brands } from './components/Brands';
import { FeaturedProducts } from './components/FeaturedProducts';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Services } from './components/Services';
import { ProductEnquiry } from './components/ProductEnquiry';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingMobileCTA } from './components/FloatingMobileCTA';
import { LegalModal } from './components/LegalModal';
import { QuoteListDrawer } from './components/QuoteListDrawer';

import './styles/index.css';
import './styles/components.css';

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [quoteItems, setQuoteItems] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedProductForEnquiry, setSelectedProductForEnquiry] = useState(null);
  const [selectedServiceForEnquiry, setSelectedServiceForEnquiry] = useState(null);
  const [legalModalType, setLegalModalType] = useState(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToQuoteList = (product) => {
    setQuoteItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveQuoteItem = (productId) => {
    setQuoteItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryFilter(categoryId);
    scrollToSection('products');
  };

  const handleEnquireProduct = (product) => {
    setSelectedProductForEnquiry(product);
    setSelectedServiceForEnquiry(null);
    scrollToSection('enquiry');
  };

  const handleEnquireService = (serviceTitle) => {
    setSelectedServiceForEnquiry(serviceTitle);
    setSelectedProductForEnquiry(null);
    scrollToSection('enquiry');
  };

  const handleProceedToEnquiryFromDrawer = () => {
    if (quoteItems.length > 0) {
      const itemNames = quoteItems.map((i) => i.name).join(', ');
      setSelectedProductForEnquiry({
        name: `Selected Bulk Quote Items (${quoteItems.length})`,
        category: 'Multiple Categories',
        brand: 'Multiple Brands',
        shortDesc: itemNames
      });
    }
    scrollToSection('enquiry');
  };

  return (
    <div className="app-root">
      <SeoManager />
      
      <TopHeader
        onOpenEnquiry={() => scrollToSection('enquiry')}
      />
      
      <Navbar
        activeSection={activeSection}
        quoteItemsCount={quoteItems.length}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
      />

      <main>
        <Hero
          onExploreClick={() => scrollToSection('products')}
          onContactClick={() => scrollToSection('contact')}
        />
        <TrustBar />
        <About onLearnMoreClick={() => scrollToSection('products')} />
        <Categories onSelectCategory={handleSelectCategory} />
        <Brands onBrandSelect={() => scrollToSection('products')} />
        <FeaturedProducts
          selectedCategoryFilter={selectedCategoryFilter}
          onEnquireProduct={handleEnquireProduct}
          onAddToQuoteList={handleAddToQuoteList}
          quoteItems={quoteItems}
        />
        <WhyChooseUs />
        <Services onEnquireService={handleEnquireService} />
        <ProductEnquiry
          selectedProductForEnquiry={selectedProductForEnquiry}
          selectedServiceForEnquiry={selectedServiceForEnquiry}
        />
        <FAQ />
        <Contact />
      </main>

      <Footer onOpenLegal={(type) => setLegalModalType(type)} />
      <FloatingMobileCTA onOpenEnquiry={() => scrollToSection('enquiry')} />

      {/* Modals & Drawers */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <QuoteListDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        quoteItems={quoteItems}
        onRemoveItem={handleRemoveQuoteItem}
        onProceedToEnquiry={handleProceedToEnquiryFromDrawer}
      />
    </div>
  );
}

export default App;
