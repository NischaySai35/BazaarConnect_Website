import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Users, Package, Clock, Award, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface LandingPageProps {
  language: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({ language }) => {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-orange-100 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              {language === 'hi' ? 'ताज़ी सामग्री, बेहतर व्यापार' : 'Fresh Ingredients, Better Business'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {language === 'hi' 
                ? 'अपने नजदीकी आपूर्तिकर्ताओं से जुड़ें और अपना व्यापार बढ़ाएं'
                : 'Connect with nearby suppliers and grow your street food business'
              }
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/60 rounded-2xl p-4">
                <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">500+</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'विक्रेता' : 'Vendors'}</p>
              </div>
              <div className="bg-white/60 rounded-2xl p-4">
                <Truck className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">200+</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'आपूर्तिकर्ता' : 'Suppliers'}</p>
              </div>
              <div className="bg-white/60 rounded-2xl p-4">
                <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">1000+</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'ऑर्डर' : 'Orders'}</p>
              </div>
              <div className="bg-white/60 rounded-2xl p-4">
                <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">98%</p>
                <p className="text-sm text-gray-600">{language === 'hi' ? 'संतुष्टि' : 'Satisfaction'}</p>
              </div>
            </div>

            {/* User Type Selection */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                {t.whoAreYou}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => navigate('/vendor')}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <div className="text-6xl mb-4">🍲</div>
                  <h4 className="text-xl font-bold mb-2">{t.streetVendor}</h4>
                  <p className="text-orange-100 text-sm">
                    {language === 'hi' 
                      ? 'कच्चे माल की तलाश करें'
                      : 'Find raw materials'
                    }
                  </p>
                  <div className="mt-4 bg-white/20 rounded-full px-4 py-2 text-sm font-medium group-hover:bg-white/30 transition-colors">
                    {t.getStarted} →
                  </div>
                </button>

                <button
                  onClick={() => navigate('/supplier')}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <div className="text-6xl mb-4">🧅</div>
                  <h4 className="text-xl font-bold mb-2">{t.rawSupplier}</h4>
                  <p className="text-green-100 text-sm">
                    {language === 'hi' 
                      ? 'अपने उत्पाद बेचें'
                      : 'Sell your products'
                    }
                  </p>
                  <div className="mt-4 bg-white/20 rounded-full px-4 py-2 text-sm font-medium group-hover:bg-white/30 transition-colors">
                    {t.getStarted} →
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {language === 'hi' ? 'हमारी विशेषताएं' : 'Our Features'}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Clock className="w-12 h-12 text-orange-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'hi' ? 'तुरंत मैचिंग' : 'Instant Matching'}
              </h4>
              <p className="text-gray-600">
                {language === 'hi' 
                  ? 'AI-powered स्मार्ट मैचिंग सिस्टम से तुरंत सबसे अच्छे आपूर्तिकर्ता खोजें'
                  : 'Find the best suppliers instantly with our AI-powered smart matching system'
                }
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'hi' ? 'सत्यापित आपूर्तिकर्ता' : 'Verified Suppliers'}
              </h4>
              <p className="text-gray-600">
                {language === 'hi' 
                  ? 'सभी आपूर्तिकर्ता सत्यापित हैं और उच्च गुणवत्ता की गारंटी देते हैं'
                  : 'All suppliers are verified and guarantee high quality products'
                }
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <Package className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'hi' ? 'आसान ऑर्डरिंग' : 'Easy Ordering'}
              </h4>
              <p className="text-gray-600">
                {language === 'hi' 
                  ? 'WhatsApp के जरिए सीधे संपर्क करें और आसानी से ऑर्डर करें'
                  : 'Contact directly via WhatsApp and place orders easily'
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};