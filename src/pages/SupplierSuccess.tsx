import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, TrendingUp, Users, Eye } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface SupplierSuccessProps {
  language: Language;
}

export const SupplierSuccess: React.FC<SupplierSuccessProps> = ({ language }) => {
  const t = translations[language];

  // Simulated analytics data
  const analytics = {
    matchesToday: 6,
    totalVendors: 23,
    successRate: 94
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'hi' ? 'सफलतापूर्वक पंजीकृत!' : 'Successfully Registered!'}
          </h2>
          <p className="text-gray-600 text-lg">
            {language === 'hi' 
              ? 'आपका व्यापार अब BazaarConnect पर सूचीबद्ध है'
              : 'Your business is now listed on BazaarConnect'
            }
          </p>
        </div>

        {/* Analytics Dashboard */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-green-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {language === 'hi' ? '📊 आपका डैशबोर्ड' : '📊 Your Dashboard'}
          </h3>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center bg-green-50 rounded-2xl p-4">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-green-600">{analytics.matchesToday}</p>
              <p className="text-sm text-gray-600">{t.matchesToday}</p>
            </div>
            <div className="text-center bg-orange-50 rounded-2xl p-4">
              <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-orange-600">{analytics.totalVendors}</p>
              <p className="text-sm text-gray-600">{t.totalVendors}</p>
            </div>
            <div className="text-center bg-blue-50 rounded-2xl p-4">
              <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-blue-600">{analytics.successRate}%</p>
              <p className="text-sm text-gray-600">{t.successRate}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-orange-500 rounded-2xl p-6 text-white text-center">
            <h4 className="text-xl font-bold mb-2">
              {language === 'hi' ? '🎉 बधाई हो!' : '🎉 Congratulations!'}
            </h4>
            <p className="text-green-100">
              {language === 'hi' 
                ? 'आज आपको 6 विक्रेताओं से मैच मिले हैं!'
                : 'You\'ve been matched with 6 vendors today!'
              }
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {language === 'hi' ? '🚀 अगले कदम' : '🚀 Next Steps'}
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                {language === 'hi' 
                  ? 'विक्रेताओं से WhatsApp पर संपर्क का इंतजार करें'
                  : 'Wait for vendors to contact you via WhatsApp'
                }
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                {language === 'hi' 
                  ? 'अपनी प्रोफाइल को नियमित रूप से अपडेट करें'
                  : 'Keep your profile updated regularly'
                }
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>
                {language === 'hi' 
                  ? 'गुणवत्तापूर्ण सेवा प्रदान करें'
                  : 'Provide quality service to maintain high ratings'
                }
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/directory"
            className="w-full bg-gradient-to-r from-green-500 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Eye className="w-5 h-5" />
            <span>{t.viewAllSuppliers}</span>
          </Link>
          
          <Link
            to="/"
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center block border border-gray-200"
          >
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  );
};