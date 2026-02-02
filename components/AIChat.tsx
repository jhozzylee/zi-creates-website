"use client";

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from 'react';
import BookCall from './BookCall'; // Import your actual component

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    // This is the bridge: When the AI calls the tool, your modal opens
    onToolCall({ toolCall }) {
      if (toolCall.toolName === 'triggerBookCallModal') {
        setIsModalOpen(true);
      }
    }
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // FIX: Jumps to the START (top) of the new message
  useEffect(() => {
    if (isOpen && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" // This ensures the top of the message is visible
      });
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* 1. Use your actual BookCall component here */}
      <BookCall 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] font-light font-poppins">
        
        {/* Trigger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-background px-6 py-3 md:px-8 md:py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-all active:scale-95 flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-background"></span>
          </span>
          {isOpen ? "Close" : "Zi Concierge"}
        </button>

        <div className={`
          absolute bottom-16 right-0 
          w-[calc(100vw-2rem)] md:w-[400px] 
          h-[550px] md:h-[600px] 
          bg-[#0a0a0a] border border-neutral/10 
          rounded-[2.5rem] flex flex-col overflow-hidden 
          shadow-[0_40px_100px_rgba(0,0,0,0.6)] 
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95 pointer-events-none"}
        `}>
          
          <div className="p-8 border-b border-neutral/5 bg-neutral/[0.02]">
            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">Zi Concierge</p>
            <p className="text-neutral/60 text-[11px] mt-1 italic">Curating digital excellence.</p>
          </div>
          
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide scroll-smooth"
          >
            {messages.map((m, index) => (
              <div 
                key={m.id} 
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
              >
                <div className={`max-w-[85%] px-6 py-4 rounded-[1.8rem] text-[13px] leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-primary text-background font-semibold' 
                  : 'bg-neutral/5 text-neutral/80 border border-neutral/5'
                }`}>
                  {m.content}

                  {/* 2. Manual Trigger Button inside the chat bubble */}
                  {m.role === 'assistant' && m.content.toLowerCase().includes('consultation') && (
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="mt-4 w-full py-3 bg-primary text-background rounded-full text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all"
                    >
                      Booking Consultation
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 border-t border-neutral/5">
            <div className="relative flex items-center bg-neutral/5 rounded-full p-1 border border-neutral/10 focus-within:border-primary/40 transition-all">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask your Question..."
                className="flex-1 bg-transparent text-[16px] text-neutral placeholder:text-neutral/20 py-3 px-5 outline-none"
              />
              <button 
                type="submit"
                disabled={!input}
                className={`p-2.5 rounded-full transition-all ${
                  input ? "text-neutral scale-100 shadow-md" : "opacity-0 scale-75"
                }`}
              >
                <svg viewBox="0 0 1024 1024" className="w-4 h-4" fill="currentColor">
                  <path d="M41.353846 876.307692l86.646154-320.984615h366.276923c9.846154 0 19.692308-9.846154 19.692308-19.692308v-39.384615c0-9.846154-9.846154-19.692308-19.692308-19.692308H128l-84.676923-315.076923C41.353846 157.538462 39.384615 151.630769 39.384615 145.723077c0-13.784615 13.784615-27.569231 29.538462-25.6 3.938462 0 5.907692 1.969231 9.846154 1.969231l886.153846 364.307692c11.815385 3.938462 19.692308 15.753846 19.692308 27.569231s-7.876923 21.661538-17.723077 25.6L78.769231 913.723077c-3.938462 1.969231-7.876923 1.969231-11.815385 1.969231-15.753846-1.969231-27.569231-13.784615-27.569231-29.538462 0-3.938462 0-5.907692 1.969231-9.846154z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}