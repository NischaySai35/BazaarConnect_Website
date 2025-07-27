import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Replace this with your AI backend call
  const sendMessage = async (msg: string) => {
    const context = {
      websitePurpose: "BazaarConnect connects street food vendors and suppliers.",
      page: window.location.pathname,
      language: window.localStorage.getItem('language') || 'en', // or from your app state
      // Add more context as needed
    };
    const newMessages = [...messages, { role: 'user', content: msg }];
    setMessages(newMessages);
    setInput('');
    try {
      const res = await fetch('https://woven-ceremony-388914.uc.r.appspot.com/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, context }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: 'ai', content: data.reply }]);
    } catch {
      setMessages(m => [...m, { role: 'ai', content: 'Error contacting AI.' }]);
    }
  };

  return (
    <>
      {/* Improved Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white rounded-full px-5 py-3 shadow-xl transition-all duration-200 hover:scale-105"
          aria-label="Open chatbot"
        >
          <span className="text-2xl">💬</span>
          <span className="font-semibold text-base">Ask AI</span>
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl flex flex-col">
          <div className="flex justify-between items-center p-3 border-b">
            <span className="font-bold">BazaarConnect AI</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
          </div>
          <div
            className="flex-1 p-3 overflow-y-auto"
            style={{ maxHeight: 300 }}
            ref={chatRef}
          >
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${m.role === 'user' ? 'bg-orange-100' : 'bg-green-100'}`}>
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </span>
              </div>
            ))}
          </div>
          <form
            className="flex border-t"
            onSubmit={e => {
              e.preventDefault();
              if (input.trim()) sendMessage(input.trim());
            }}
          >
            <input
              className="flex-1 p-2 outline-none"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button type="submit" className="p-2 text-orange-600 font-bold">Send</button>
          </form>
        </div>
      )}
    </>
  );
};