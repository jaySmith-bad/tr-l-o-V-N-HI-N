import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Message } from '../types';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { Chat, GenerateContentResponse } from '@google/genai';

const AiAssistantPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const aiAvatar = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiMxMTIyNDAiLz48cGF0aCBkPSJNNDAgMzAgQyAyMCA1MCwgMjAgNzAsIDQwIDkwIiBzdHJva2U9IiMyMmQzZWUiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIgLz48cGF0aCBkPSJNNjAgMzAgQyA4MCA1MCwgODAgNzAsIDYwIDkwIiBzdHJva2U9IiMyMmQzZWUiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIgLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxMCIgc3Ryb2tlPSIjZmRlMDQ3IiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiLz48bGluZSB4MT0iNTAiIHkxPSIzNSIgeDI9IjUwIiB5Mj0iMjUiIHN0cm9rZT0iIzIyZDNlZSIgc3Ryb2tlLXdpZHRoPSI0IiAvPjxsaW5lIHgxPSI1MCIgeTE9IjY1IiB4Mj0iNTAiIHkyPSI3NSIgc3Ryb2tlPSIjMjJkM2VlIiBzdHJva2Utd2lkdGg9IjQiIC8+PGxpbmUgeDE9IjM1IiB5MT0iNTAiIHgyPSIyNSIgeTI9IjUwIiBzdHJva2U9IiMyMmQzZWUiIHN0cm9rZS13aWR0aD0iNCIgLz48bGluZSB4MT0iNjUiIHkxPSI1MCIgeDI9Ijc1IiB5Mj0iNTAiIHN0cm9rZT0iIzIyZDNlZSIgc3Ryb2tlLXdpZHRoPSI0IiAvPjwvc3ZnPg==";

  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (input.trim() === '' || isTyping || !chatSessionRef.current) return;
    
    const userMsgText = input;
    const userMsg: Message = { id: Date.now(), text: userMsgText, sender: 'user' };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const stream = await sendMessageStream(chatSessionRef.current, userMsgText);
      let fullResponseText = "";
      
      const aiMsgId = Date.now() + 1;
      setMessages(prev => [...prev, { id: aiMsgId, text: "", sender: 'ai', isTyping: true }]);

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullResponseText += c.text;
          setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, text: fullResponseText } : msg
          ));
        }
      }

      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId ? { ...msg, isTyping: false } : msg
      ));

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { id: Date.now(), text: "Xin lỗi, tôi gặp sự cố kết nối.", sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <aside className="hidden xl:flex w-80 flex-shrink-0 flex-col h-full p-4">
      <div className="relative w-full h-full bg-navy-dark rounded-2xl border border-accent-yellow/30 shadow-glow-yellow flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-dark/30 flex flex-col items-center shrink-0">
            <div className="relative w-16 h-16 mb-2">
                <div className="absolute inset-0 bg-accent-yellow rounded-full animate-pulse opacity-20"></div>
                <img src={aiAvatar} alt="AI Assistant Avatar" className="w-full h-full rounded-full object-cover border-2 border-accent-yellow/50" />
            </div>
          <h2 className="text-base font-bold text-slate-lightest">Trợ lý AI</h2>
          <p className="text-xs text-slate">Luôn sẵn sàng hỗ trợ bạn!</p>
        </div>
        
        <div className="flex-grow p-4 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && <img className="w-6 h-6 rounded-full shrink-0" src={aiAvatar} alt="AI Avatar"/>}
              <div className={`flex flex-col max-w-[85%] leading-relaxed p-2.5 rounded-xl text-sm ${msg.sender === 'user' ? 'rounded-br-none bg-accent-yellow text-navy-dark font-medium' : 'rounded-bl-none bg-navy-light text-slate-lightest'}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex items-start gap-2">
                <img className="w-6 h-6 rounded-full shrink-0" src={aiAvatar} alt="AI Avatar"/>
                <div className="bg-navy-light p-2 rounded-xl rounded-bl-none">
                  <Loader2 className="w-4 h-4 text-accent-yellow animate-spin" />
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 mt-auto border-t border-slate-dark/30 shrink-0 bg-navy-dark">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Hỏi trợ lý AI..."
              className="w-full bg-navy/80 border border-slate-dark rounded-lg pl-4 pr-10 py-2 text-sm text-slate-lightest placeholder-slate focus:outline-none focus:ring-2 focus:ring-accent-yellow/80 transition-all"
            />
            <button onClick={handleSend} disabled={isTyping} className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-slate hover:text-accent-yellow transition-colors disabled:opacity-50">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default AiAssistantPanel;