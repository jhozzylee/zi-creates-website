"use client";

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCall from './BookCall'; 
import PaymentModal from "./PaymentModal";
import ReactMarkdown from 'react-markdown';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialTyping, setIsInitialTyping] = useState(false); // New state for first message
  const [showFirstMessage, setShowFirstMessage] = useState(false); // Controls welcome msg visibility
  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    title: string;
    price: number;
    planId: string;
  } | null>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi, I’m Zi Concierge. I help brands plan, build, and scale smarter. How can I help you today?"
      }
    ],
    onToolCall({ toolCall }) {
      if (toolCall.toolName === 'triggerBookCallModal') setIsModalOpen(true);
      if (toolCall.toolName === 'triggerPaymentModal') {
        const { planName, price, planId } = toolCall.args as { planName: string; price: number; planId: string };
        setSelectedPlan({ title: planName, price: price, planId: planId || "" });
        setIsPaymentModalOpen(true); 
      }
    }
  });

  // Handle the "Human" sequence when opening for the first time
  useEffect(() => {
    if (isOpen && !showFirstMessage) {
      setIsInitialTyping(true);
      const timer = setTimeout(() => {
        setIsInitialTyping(false);
        setShowFirstMessage(true);
      }, 1500); // 1.5s of "typing" for the first message
      return () => clearTimeout(timer);
    }
  }, [isOpen, showFirstMessage]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages, isOpen, isLoading, isInitialTyping]);

  return (
    <>
      <BookCall isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} selectedPlan={selectedPlan} />

      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] font-poppins">
        
        {/* Trigger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-zinc-950 border border-primary/10 text-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-all active:scale-95 flex items-center gap-4 group"
        >
          <div className="flex flex-col items-start mr-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] leading-none mb-1">
              {isOpen ? "Close" : "Zi Concierge"}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              <span className="text-[8px] font-mono font-bold text-zinc-500">
                {isOpen ? "Online" : "Talk with Zi"}
              </span>
            </div>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-background transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed md:absolute bottom-0 md:bottom-24 right-0 w-screen md:w-[400px] h-[100dvh] md:h-[650px] bg-[#0a0a0a] border border-neutral/10 rounded-t-[2.5rem] md:rounded-[2.5rem] flex flex-col overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
            >
              {/* Header */}
              <div className="p-8 border-b border-neutral/5 bg-neutral/[0.02] flex justify-between items-start shrink-0">
                <div>
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">Zi Concierge</p>
                  <p className="text-neutral/60 text-[11px] mt-1 italic">Your Intelligent Brand Assistant.</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-neutral/40 hover:text-primary transition-colors text-lg">✕</button>
              </div>
              
              {/* Messages Container */}
              <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide scroll-smooth">
                {messages.map((m, index) => {
                  // Only show the welcome message after the initial typing delay
                  if (m.id === 'welcome' && !showFirstMessage) return null;
                  
                  return (
                    <motion.div 
                      key={m.id} 
                      ref={index === messages.length - 1 ? lastMessageRef : null}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] px-6 py-4 rounded-[1.8rem] text-[13px] leading-relaxed ${
                        m.role === 'user' ? 'bg-primary text-background font-semibold' : 'bg-neutral/5 text-neutral/80 border border-neutral/5'
                      }`}>
                        <ReactMarkdown
                          components={{
                            h2: ({node, ...props}) => <h2 className="text-[12px] font-bold uppercase tracking-widest mb-1 mt-3 text-primary" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-primary" {...props} />,
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    </motion.div>
                  );
                })}

                {/* --- Typing Indicator (Shared for Initial & Subsequent msgs) --- */}
                {(isLoading || isInitialTyping) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-neutral/5 border border-neutral/5 px-6 py-4 rounded-[1.8rem] flex gap-1 items-center">
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          className="w-1.5 h-1.5 bg-primary rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: dot * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Form Area */}
              <form onSubmit={handleSubmit} className="p-6 border-t border-neutral/5 shrink-0 bg-[#0a0a0a]">
                <div className="relative flex items-center bg-neutral/5 rounded-full p-1 border border-neutral/10 focus-within:border-primary/40 transition-all">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter inquiry..."
                    className="flex-1 bg-transparent text-[16px] text-neutral placeholder:text-neutral/20 py-3 px-5 outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={!input || isLoading}
                    className={`px-4 rounded-full transition-all ${input ? "text-primary" : "opacity-0"}`}
                  >
                    <svg viewBox="0 0 1024 1024" className="w-4 h-4" fill="currentColor">
                      <path d="M41.353846 876.307692l86.646154-320.984615h366.276923c9.846154 0 19.692308-9.846154 19.692308-19.692308v-39.384615c0-9.846154-9.846154-19.692308-19.692308-19.692308H128l-84.676923-315.076923C41.353846 157.538462 39.384615 151.630769 39.384615 145.723077c0-13.784615 13.784615-27.569231 29.538462-25.6 3.938462 0 5.907692 1.969231 9.846154 1.969231l886.153846 364.307692c11.815385 3.938462 19.692308 15.753846 19.692308 27.569231s-7.876923 21.661538-17.723077 25.6L78.769231 913.723077c-3.938462 1.969231-7.876923 1.969231-11.815385 1.969231-15.753846-1.969231-27.569231-13.784615-27.569231-29.538462 0-3.938462 0-5.907692 1.969231-9.846154z" />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}