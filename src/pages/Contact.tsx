import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t.contactTitle}</h2>
          <p className="text-xl text-gray-600">
            {language === 'hi' 
              ? 'हमसे जुड़ें और अपने सवाल पूछें'
              : 'Get in touch with us and ask your questions'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'hi' ? 'संपर्क जानकारी' : 'Contact Information'}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{t.email}</h4>
                  <p className="text-gray-600">support@bazaarconnect.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{t.phone}</h4>
                  <p className="text-gray-600">+91-8147447343</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{t.address}</h4>
                  <p className="text-gray-600">
                    {language === 'hi' 
                      ? 'मुंबई, महाराष्ट्र, भारत'
                      : 'Mumbai, Maharashtra, India'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">WhatsApp</h4>
                  <p className="text-gray-600">+91-8147447343</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'hi' ? 'संदेश भेजें' : 'Send Message'}
            </h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  id="contact-name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder={language === 'hi' ? "आपका नाम" : "Your name"}
                />
              </div>
              
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  id="contact-email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder={language === 'hi' ? "आपका ईमेल" : "Your email"}
                />
              </div>
              
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'hi' ? 'संदेश' : 'Message'}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder={language === 'hi' ? "आपका संदेश..." : "Your message..."}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {language === 'hi' ? 'संदेश भेजें' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h3>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-2">
                {language === 'hi' 
                  ? 'BazaarConnect कैसे काम करता है?'
                  : 'How does BazaarConnect work?'
                }
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'hi' 
                  ? 'विक्रेता अपनी आवश्यकताएं बताते हैं और हमारा AI सिस्टम उन्हें सबसे अच्छे आपूर्तिकर्ता से जोड़ता है।'
                  : 'Vendors specify their requirements and our AI system connects them with the best suppliers.'
                }
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-2">
                {language === 'hi' 
                  ? 'क्या यह सेवा मुफ्त है?'
                  : 'Is this service free?'
                }
              </h4>
              <p className="text-gray-600 text-sm">
                {language === 'hi' 
                  ? 'हां, BazaarConnect पूरी तरह से मुफ्त है। कोई छुपी हुई फीस नहीं।'
                  : 'Yes, BazaarConnect is completely free. No hidden fees.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};