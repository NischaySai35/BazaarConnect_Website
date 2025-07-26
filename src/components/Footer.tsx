import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <h4 className="text-xl font-bold mb-2">{t.teamCredits}</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex flex-col items-center bg-orange-600 px-4 py-2 rounded-full min-w-[180px]">
              <span className="font-semibold">Nischay Sai</span>
            </div>
            <div className="flex flex-col items-center bg-green-600 px-4 py-2 rounded-full min-w-[180px]">
              <span className="font-semibold">Kalyani Bawane</span>
            </div>
            <div className="flex flex-col items-center bg-blue-600 px-4 py-2 rounded-full min-w-[180px]">
              <span className="font-semibold">Shiva Chary</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs mt-2">
            <div className="min-w-[180px] text-center">
              <span>(Team Leader)</span>
              <div>Frontend, Backend, UI/UX Designer</div>
            </div>
            <div className="min-w-[180px] text-center">
              <div>Video Editing, Presentation</div>
            </div>
            <div className="min-w-[180px] text-center">
              <div>APIs, Hosting</div>
            </div>
          </div>
        </div>
        <p className="text-gray-400 mb-4">{t.builtFor}</p>
        <div className="flex items-center justify-center space-x-2 text-sm">
          <ShoppingCart className="w-4 h-4 text-orange-400" />
          <span>© 2024 BazaarConnect. Made with ❤️ for street food vendors.</span>
        </div>
      </div>
    </footer>
  );
};