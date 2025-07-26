import React from 'react';
import { Users, Target, Heart, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface AboutProps {
  language: Language;
}

export const About: React.FC<AboutProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.aboutTitle}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.aboutDescription}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <Target className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {language === 'hi' ? 'हमारा मिशन' : 'Our Mission'}
            </h3>
            <p className="text-gray-600 text-lg">
              {language === 'hi' 
                ? 'स्ट्रीट फूड विक्रेताओं को सशक्त बनाना और उन्हें गुणवत्तापूर्ण कच्चे माल से जोड़ना'
                : 'Empowering street food vendors by connecting them with quality raw material suppliers'
              }
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {language === 'hi' ? 'समुदाय' : 'Community'}
            </h4>
            <p className="text-gray-600">
              {language === 'hi' 
                ? '700+ विक्रेता और आपूर्तिकर्ता हमारे नेटवर्क का हिस्सा हैं'
                : '700+ vendors and suppliers are part of our network'
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {language === 'hi' ? 'विश्वसनीयता' : 'Trust'}
            </h4>
            <p className="text-gray-600">
              {language === 'hi' 
                ? 'सभी आपूर्तिकर्ता सत्यापित हैं और गुणवत्ता की गारंटी देते हैं'
                : 'All suppliers are verified and guarantee quality products'
              }
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Award className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {language === 'hi' ? 'उत्कृष्टता' : 'Excellence'}
            </h4>
            <p className="text-gray-600">
              {language === 'hi' 
                ? '98% ग्राहक संतुष्टि दर और बेहतर सेवा'
                : '98% customer satisfaction rate and superior service'
              }
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {language === 'hi' ? 'हमारी टीम' : 'Our Team'}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">N</span>
              </div>
              <h4 className="font-bold text-gray-800">Nischay Sai</h4>
              <p className="text-sm text-gray-600">Frontend, Backend & UI/UX Design</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">K</span>
              </div>
              <h4 className="font-bold text-gray-800">Kalyani Bawane</h4>
              <p className="text-sm text-gray-600">Video Editing & Presentation</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
              <h4 className="font-bold text-gray-800">Shiva Chary</h4>
              <p className="text-sm text-gray-600">APIs & Hosting</p>
            </div>
          </div>
          
          <div className="text-center mt-8 p-4 bg-gradient-to-r from-orange-100 to-green-100 rounded-2xl">
            <p className="text-gray-700 font-medium">
              {t.builtFor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};