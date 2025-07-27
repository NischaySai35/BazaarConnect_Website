import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, Package, DollarSign, Phone } from 'lucide-react';
import { Language, SupplierRegistration } from '../types';
import { translations } from '../utils/translations';

interface SupplierFormProps {
  language: Language;
  onSupplierSubmit: (supplier: SupplierRegistration) => void;
}

export const SupplierForm: React.FC<SupplierFormProps> = ({ language, onSupplierSubmit }) => {
  const navigate = useNavigate();
  const t = translations[language];
  const [formData, setFormData] = useState<SupplierRegistration>({
    name: '',
    product_en: '',
    pricePerKg: '',
    location_en: '',
    phone: ''
  });

  const handleInputChange = (field: keyof SupplierRegistration, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.product_en && formData.pricePerKg && formData.location_en && formData.phone) {
      onSupplierSubmit(formData);
      navigate('/supplier-success');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {t.registerAsSupplier}
          </h2>
          <p className="text-gray-600">
            {language === 'hi' 
              ? 'अपने उत्पादों को पंजीकृत करें और विक्रेताओं से जुड़ें'
              : 'Register your products and connect with vendors'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Store className="w-4 h-4 mr-2 text-green-500" />
                {t.name}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder={language === 'hi' ? "व्यापार का नाम(केवल अंग्रेज़ी)" : "Business name (English only)"}
                required
              />
            </div>

            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Package className="w-4 h-4 mr-2 text-green-500" />
                {t.product}
              </label>
              <input
                type="text"
                id="product"
                value={formData.product_en}
                onChange={(e) => handleInputChange('product_en', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder={language === 'hi' ? "जैसे: प्याज, टमाटर, आलू (केवल अंग्रेज़ी)" : "e.g: Onions, Tomatoes, Potatoes (English only)"}
                required
              />
            </div>

            <div>
              <label htmlFor="pricePerKg" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                {t.pricePerKg}
              </label>
              <input
                type="number"
                id="pricePerKg"
                value={formData.pricePerKg}
                onChange={(e) => handleInputChange('pricePerKg', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder={language === 'hi' ? "₹ प्रति किलो" : "₹ per kg"}
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-green-500" />
                {t.location}
              </label>
              <input
                type="text"
                id="location"
                value={formData.location_en}
                onChange={(e) => handleInputChange('location_en', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder={language === 'hi' ? "व्यापार का स्थान" : "Business location"}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-green-500" />
                {t.phone}
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="+91-9876543210"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t.registerAsSupplier}
            </button>
          </form>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {language === 'hi' ? '🌟 आपूर्तिकर्ता बनने के फायदे' : '🌟 Benefits of Being a Supplier'}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• {language === 'hi' ? 'सीधे विक्रेताओं से जुड़ें' : 'Connect directly with vendors'}</li>
            <li>• {language === 'hi' ? 'अपना व्यापार बढ़ाएं' : 'Grow your business'}</li>
            <li>• {language === 'hi' ? 'नियमित ऑर्डर पाएं' : 'Get regular orders'}</li>
            <li>• {language === 'hi' ? 'बेहतर कीमत मिले' : 'Get better prices'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};