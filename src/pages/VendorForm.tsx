import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Package, Scale } from 'lucide-react';
import { Language, VendorRequest } from '../types';
import { translations } from '../utils/translations';

interface VendorFormProps {
  language: Language;
  onVendorSubmit: (request: VendorRequest) => void;
}

export const VendorForm: React.FC<VendorFormProps> = ({ language, onVendorSubmit }) => {
  const navigate = useNavigate();
  const t = translations[language];
  const [formData, setFormData] = useState<VendorRequest>({
    name: '',
    location: '',
    material: '',
    quantity: ''
  });

  const handleInputChange = (field: keyof VendorRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.location && formData.material && formData.quantity) {
      onVendorSubmit(formData);
      navigate('/smart-match');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {language === 'hi' ? 'विक्रेता अनुरोध फॉर्म' : 'Vendor Request Form'}
          </h2>
          <p className="text-gray-600">
            {language === 'hi' 
              ? 'अपनी आवश्यकताएं बताएं और सबसे अच्छे आपूर्तिकर्ता खोजें'
              : 'Tell us your requirements and find the best suppliers'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Package className="w-4 h-4 mr-2 text-orange-500" />
                {t.name}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder={language === 'hi' ? "अपना नाम लिखें" : "Enter your name"}
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                {t.location}
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder={language === 'hi' ? "अपना स्थान लिखें" : "Enter your location"}
                required
              />
            </div>

            <div>
              <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Package className="w-4 h-4 mr-2 text-orange-500" />
                {t.materialsNeeded}
              </label>
              <input
                type="text"
                id="material"
                value={formData.material}
                onChange={(e) => handleInputChange('material', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder={language === 'hi' ? "जैसे: प्याज, टमाटर, आलू" : "e.g: Onions, Tomatoes, Potatoes"}
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Scale className="w-4 h-4 mr-2 text-orange-500" />
                {t.quantity}
              </label>
              <input
                type="text"
                id="quantity"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder={language === 'hi' ? "मात्रा लिखें" : "Enter quantity needed"}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t.findSuppliers}
            </button>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {language === 'hi' ? '💡 सुझाव' : '💡 Quick Tips'}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• {language === 'hi' ? 'सटीक स्थान दें ताकि नजदीकी आपूर्तिकर्ता मिल सकें' : 'Provide accurate location to find nearby suppliers'}</li>
            <li>• {language === 'hi' ? 'मात्रा स्पष्ट रूप से बताएं' : 'Specify quantity clearly'}</li>
            <li>• {language === 'hi' ? 'एक से अधिक सामग्री के लिए अलग-अलग फॉर्म भरें' : 'Fill separate forms for different materials'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};