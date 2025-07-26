export const generateWhatsAppMessage = (
  supplierName: string,
  product: string,
  vendorName: string,
  quantity: string,
  language: 'hi' | 'en'
) => {
  const messages = {
    hi: `नमस्ते ${supplierName}! मैं ${vendorName} हूं, एक स्ट्रीट फूड विक्रेता। मुझे ${quantity} किलो ${product} की आवश्यकता है। क्या आप इसकी आपूर्ति कर सकते हैं? BazaarConnect के माध्यम से संपर्क कर रहा हूं।`,
    en: `Hello ${supplierName}! I'm ${vendorName}, a street food vendor. I need ${quantity} kg of ${product}. Can you supply this? Contacting through BazaarConnect.`
  };
  
  return encodeURIComponent(messages[language]);
};

export const openWhatsApp = (phone: string, message: string) => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};