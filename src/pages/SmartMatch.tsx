import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Star, Phone, Eye } from 'lucide-react';
import { Language, VendorRequest, Supplier } from '../types';
import { translations } from '../utils/translations';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

interface SmartMatchProps {
  language: Language;
  vendorRequest: VendorRequest | null;
  suppliers: Supplier[];
}

export const SmartMatch: React.FC<SmartMatchProps> = ({ language, vendorRequest, suppliers }) => {
  const t = translations[language];

  // Find best match based on material, price, and distance
  const findBestMatch = (): Supplier | null => {
    if (!vendorRequest) return null;

    const matches = suppliers.filter(supplier => {
      const supplierProduct =
      language === 'hi' ? supplier.product_hi : supplier.product_en;
      return (
      supplierProduct.toLowerCase().includes(vendorRequest.material.toLowerCase()) ||
      vendorRequest.material.toLowerCase().includes(supplierProduct.toLowerCase())
      );
    });

    if (matches.length === 0) return suppliers[0]; // Fallback to first supplier

    // Sort by price (ascending) and distance (ascending)
    return matches.sort((a, b) => {
      const priceScore = a.pricePerKg - b.pricePerKg;
      const distanceScore = a.distance - b.distance;
      return priceScore + distanceScore;
    })[0];
    };

    const bestMatch = findBestMatch();

    const handleWhatsAppContact = (supplier: Supplier) => {
    if (!vendorRequest) return;

    const supplierProduct =
      language === 'hi' ? supplier.product_hi : supplier.product_en;

    const message = generateWhatsAppMessage(
      supplier.name,
      supplierProduct,
      vendorRequest.name,
      vendorRequest.quantity,
      language
    );

    openWhatsApp(supplier.phone, message);
    };

    if (!vendorRequest || !bestMatch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {language === 'hi' ? 'कोई अनुरोध नहीं मिला' : 'No Request Found'}
        </h2>
        <p className="text-gray-600 mb-8">
        {language === 'hi'
          ? 'कृपया पहले विक्रेता फॉर्म भरें'
          : 'Please fill the vendor form first'
        }
        </p>
        <Link
        to="/vendor"
        className="bg-gradient-to-r from-orange-500 to-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
        {language === 'hi' ? 'विक्रेता फॉर्म भरें' : 'Fill Vendor Form'}
        </Link>
      </div>
      </div>
    );
    }

    return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
        {t.smartMatch}
        </h2>
        <p className="text-gray-600">
        {language === 'hi'
          ? `${vendorRequest.name} के लिए सबसे अच्छा मैच`
          : `Best match for ${vendorRequest.name}`
        }
        </p>
      </div>

      {/* Request Summary */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-orange-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
        {language === 'hi' ? 'आपका अनुरोध' : 'Your Request'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">{t.name}:</span>
          <span className="ml-2 text-gray-600">{vendorRequest.name}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">{t.location}:</span>
          <span className="ml-2 text-gray-600">{vendorRequest.location}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">{t.materialsNeeded}:</span>
          <span className="ml-2 text-gray-600">{vendorRequest.material}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">{t.quantity}:</span>
          <span className="ml-2 text-gray-600">{vendorRequest.quantity}</span>
        </div>
        </div>
      </div>

      {/* Best Match */}
      <div className="bg-gradient-to-r from-orange-500 to-green-500 rounded-3xl shadow-xl p-8 text-white mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center space-x-2">
        <Award className="w-6 h-6" />
        <span>{t.bestMatch}</span>
        </h3>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
        <div className="text-center mb-6">
          <h4 className="text-3xl font-bold mb-2">{bestMatch.name}</h4>
          <p className="text-xl opacity-90">
          {language === 'hi' ? bestMatch.product_hi : bestMatch.product_en} | All products available
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
          <p className="text-3xl font-bold">₹{bestMatch.pricePerKg}</p>
          <p className="text-sm opacity-90">{t.perKg}</p>
          </div>
          <div className="text-center">
          <p className="text-3xl font-bold">{bestMatch.distance} km</p>
          <p className="text-sm opacity-90">{t.distance}</p>
          </div>
          <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Star className="w-5 h-5 fill-current mr-1" />
            <span className="text-3xl font-bold">{bestMatch.rating}</span>
          </div>
          <p className="text-sm opacity-90">{t.rating}</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
          onClick={() => handleWhatsAppContact(bestMatch)}
          className="w-full bg-white text-green-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
          >
          <Phone className="w-5 h-5" />
          <span>{t.contactNow}</span>
          </button>

          <Link
          to="/directory"
          className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/30 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 border border-white/30"
          >
          <Eye className="w-5 h-5" />
          <span>{t.viewAllSuppliers}</span>
          </Link>
        </div>
        </div>
      </div>

      {/* Alternative Matches */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
        {language === 'hi' ? 'अन्य विकल्प' : 'Alternative Options'}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
        {suppliers
          .filter(s => s.id !== bestMatch.id)
          .slice(0, 4)
          .map((supplier) => (
          <div key={supplier.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-gray-800">{supplier.name}</h4>
            <div className="flex items-center text-sm text-yellow-600">
              <Star className="w-3 h-3 fill-current mr-1" />
              <span>{supplier.rating}</span>
            </div>
            </div>
            <p className="text-gray-600 mb-2">
            {language === 'hi' ? supplier.product_hi : supplier.product_en}
            </p>
            <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-orange-600">₹{supplier.pricePerKg}/{t.perKg}</span>
            <span className="text-gray-500">{supplier.distance} km</span>
            </div>
            <button
            onClick={() => handleWhatsAppContact(supplier)}
            className="w-full mt-3 bg-gradient-to-r from-orange-500 to-green-500 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-green-600 transition-all duration-300 text-sm"
            >
            {t.contactNow}
            </button>
          </div>
          ))}
        </div>
      </div>
      </div>
    </div>
    );
  }