
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  Loader2, 
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { motion } from 'motion/react';
import { getGeminiStream } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Hi! I'm Anup's Virtual Assistant. Want to know about his IEEE paper, web skills, or how he can help your team? Ask me anything! ✨" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    // Placeholder for streaming
    setMessages(prev => [...prev, { role: 'assistant', text: '', isStreaming: true }]);

    try {
      await getGeminiStream(userText, (updatedText) => {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last && last.role === 'assistant' && last.isStreaming) {
            return [...prev.slice(0, -1), { role: 'assistant', text: updatedText, isStreaming: true }];
          }
          return prev;
        });
      });
    } catch (e) {
      setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: "Sorry, I had trouble processing that. Try again?" }]);
    } finally {
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last) {
          return [...prev.slice(0, -1), { role: 'assistant', text: last.text, isStreaming: false }];
        }
        return prev;
      });
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[200] group"
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          {/* Futuristic Robot Character Button */}
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.4)] flex items-center justify-center relative overflow-hidden border border-white/20"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            
            {/* Robot Face */}
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="flex gap-2">
                <motion.div 
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.2] }}
                  className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]" 
                />
                <motion.div 
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.2] }}
                  className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]" 
                />
              </div>
              <motion.div 
                animate={{ width: [12, 16, 12] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-1 bg-teal-200 rounded-full shadow-[0_0_5px_rgba(153,246,228,0.5)]" 
              />
            </div>

            {/* Scanning Line */}
            <motion.div 
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-teal-400/50 shadow-[0_0_10px_teal]"
            />
          </motion.div>

          {/* Tooltip */}
          <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-md text-teal-400 px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 border border-teal-500/30 translate-x-4 group-hover:translate-x-0 shadow-2xl">
            SYSTEM_ONLINE: CHAT_WITH_ANUP
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex flex-col glass-card rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 border border-white/10 ${isMinimized ? 'h-16 w-72' : 'h-[600px] w-[380px] md:w-[450px]'}`}>
      {/* Header */}
      <div className="bg-slate-950/80 p-5 border-b border-white/10 flex justify-between items-center cursor-pointer select-none" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center border border-teal-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-teal-500/5 animate-pulse" />
            <Bot size={22} className="text-teal-400 relative z-10" />
            {isTyping && (
              <motion.div 
                animate={{ height: [2, 8, 2] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute bottom-1 w-4 bg-teal-400/50 rounded-full"
              />
            )}
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-widest uppercase">Anup_Bot v2.0</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping" />
              <p className="text-[10px] text-teal-400 font-bold uppercase tracking-tighter">Neural Link Established</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors" title={isMinimized ? "Maximize" : "Minimize"}>
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors" title="Close">
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar bg-slate-900/40">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-teal-600 text-white rounded-tr-none' 
                    : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-white/5'
                }`}>
                  {msg.text}
                  {msg.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-teal-400 animate-pulse align-middle" />}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-900/80 border-t border-white/5">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about projects, skills..."
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-teal-500 hover:text-teal-400 disabled:opacity-30 transition-all duration-200"
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-center flex items-center justify-center gap-1 opacity-60">
              <Sparkles size={10} /> Optimized for Recruiter Q&A
            </p>
          </div>
        </>
      )}
    </div>
  );
};
