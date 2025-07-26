import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, MapPin, Phone, CheckCircle } from 'lucide-react';
import { Language, Supplier } from '../types';
import { translations } from '../utils/translations';
import { openWhatsApp } from '../utils/whatsapp';

interface SupplierDirectoryProps {
  language: Language;
  suppliers: Supplier[];
}

export const SupplierDirectory: React.FC<SupplierDirectoryProps> = ({ language, suppliers }) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'distance' | 'rating'>('price');

  const filteredAndSortedSuppliers = useMemo(() => {
    let filtered = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (language === 'hi'
        ? supplier.product_hi.toLowerCase().includes(searchTerm.toLowerCase())
        : supplier.product_en.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      (language === 'hi'
        ? supplier.location_hi.toLowerCase().includes(searchTerm.toLowerCase())
        : supplier.location_en.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerKg - b.pricePerKg;
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [suppliers, searchTerm, sortBy]);

  const handleWhatsAppContact = (supplier: Supplier) => {
    const message = language === 'hi' 
      ? `नमस्ते ${supplier.name}! मैं BazaarConnect के माध्यम से आपसे ${supplier.product_hi} के बारे में पूछताछ कर रहा हूं।`
      : `Hello ${supplier.name}! I'm inquiring about ${supplier.product_en} through BazaarConnect.`;    
    openWhatsApp(supplier.phone, encodeURIComponent(message));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t.supplierDirectory}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'hi' 
              ? 'सभी सत्यापित आपूर्तिकर्ताओं की सूची देखें और सीधे संपर्क करें'
              : 'Browse all verified suppliers and contact them directly'
            }
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.searchProducts}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'distance' | 'rating')}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              >
                <option value="price">{t.sortBy} {t.price}</option>
                <option value="distance">{t.sortBy} {t.distance}</option>
                <option value="rating">{t.sortBy} {t.rating}</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {language === 'hi' 
              ? `${filteredAndSortedSuppliers.length} आपूर्तिकर्ता मिले`
              : `${filteredAndSortedSuppliers.length} suppliers found`
            }
          </div>
        </div>

        {/* Supplier Grid */}
        {filteredAndSortedSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.noResults}</h3>
            <p className="text-gray-600">
              {language === 'hi' 
                ? 'अपनी खोज को बदलकर दोबारा कोशिश करें'
                : 'Try adjusting your search terms'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-800 truncate">{supplier.name}</h4>
                    {supplier.verified && (
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {t.verified}
                      </div>
                    )}
                  </div>

                  {/* Product */}
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-orange-600 mb-1">
                      {language === 'hi' ? supplier.product_hi : supplier.product_en}
                    </p>
                    <p className="text-xl font-semibold text-gray-800">₹{supplier.pricePerKg} {t.perKg}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{supplier.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{supplier.distance} km</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {language === 'hi' ? supplier.location_hi : supplier.location_en}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button
                    onClick={() => handleWhatsAppContact(supplier)}
                    className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-3 px-4 rounded-xl font-medium hover:from-orange-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t.contactNow}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};