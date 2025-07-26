import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { VendorForm } from './pages/VendorForm';
import { SupplierForm } from './pages/SupplierForm';
import { SmartMatch } from './pages/SmartMatch';
import { SupplierDirectory } from './pages/SupplierDirectory';
import { SupplierSuccess } from './pages/SupplierSuccess';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Language, VendorRequest, SupplierRegistration, Supplier } from './types';
import { initialSuppliers } from './data/suppliers';
import { ChatbotWidget } from './components/ChatbotWidget';

function App() {
  const [language, setLanguage] = useState<Language>('hi');
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [currentVendorRequest, setCurrentVendorRequest] = useState<VendorRequest | null>(null);

  const handleVendorSubmit = (request: VendorRequest) => {
    setCurrentVendorRequest(request);
  };

  const handleSupplierSubmit = (supplierData: SupplierRegistration) => {
    const newSupplier: Supplier = {
      id: Date.now().toString(),
      name: supplierData.name,
      product_hi: supplierData.product_hi,
      product_en: supplierData.product_en,
      pricePerKg: parseInt(supplierData.pricePerKg),
      location_hi: supplierData.location_hi,
      location_en: supplierData.location_en,
      rating: 4.0, // Default rating for new suppliers
      distance: Math.random() * 3 + 0.5, // Random distance between 0.5-3.5 km
      phone: supplierData.phone,
      verified: false // New suppliers start unverified
    };
    
    setSuppliers(prev => [...prev, newSupplier]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
        <Header language={language} setLanguage={setLanguage} />
        
        <main>
          <Routes>
            <Route path="/" element={<LandingPage language={language} />} />
            <Route 
              path="/vendor" 
              element={
                <VendorForm 
                  language={language} 
                  onVendorSubmit={handleVendorSubmit}
                />
              } 
            />
            <Route 
              path="/supplier" 
              element={
                <SupplierForm 
                  language={language} 
                  onSupplierSubmit={handleSupplierSubmit}
                />
              } 
            />
            <Route 
              path="/smart-match" 
              element={
                <SmartMatch 
                  language={language} 
                  vendorRequest={currentVendorRequest}
                  suppliers={suppliers}
                />
              } 
            />
            <Route 
              path="/directory" 
              element={
                <SupplierDirectory 
                  language={language} 
                  suppliers={suppliers}
                />
              } 
            />
            <Route 
              path="/supplier-success" 
              element={<SupplierSuccess language={language} />} 
            />
            <Route path="/about" element={<About language={language} />} />
            <Route path="/contact" element={<Contact language={language} />} />
          </Routes>
        </main>
        
        <Footer language={language} />
        <ChatbotWidget />
      </div>
    </Router>
  );
}

export default App;