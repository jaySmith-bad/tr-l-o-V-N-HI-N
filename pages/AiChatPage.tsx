import React, { useState, useRef, useEffect } from 'react';
import { Send, BrainCircuit, Loader2 } from 'lucide-react';
import { Message } from '../types';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { Chat, GenerateContentResponse } from '@google/genai';

const AiChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Chào bạn, tôi là trợ lý AI thông minh của bạn. Hãy bắt đầu hành trình học tập của chúng ta nhé!", sender: 'ai' }
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      setMessages(prev => [...prev, { id: Date.now(), text: "Xin lỗi, có lỗi xảy ra khi kết nối với AI.", sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="animate-page-transition h-full flex flex-col items-center">
        <div className="bg-navy border border-slate-dark/30 rounded-lg w-full max-w-4xl h-[calc(100vh-6rem)] flex flex-col shadow-2xl relative overflow-hidden">
          <div className="p-4 border-b border-slate-dark/30 flex items-center justify-center text-center flex-col bg-navy-dark">
            <div className="relative mb-2">
                <BrainCircuit className="w-12 h-12 text-accent-yellow relative z-10" />
                <div className="absolute inset-0 bg-accent-yellow blur-lg opacity-20"></div>
            </div>
            <h2 className="text-xl font-bold text-slate-lightest">Trợ lý AI Toàn Màn Hình</h2>
            <p className="text-sm text-slate">Người bạn đồng hành thông minh cho hành trình học tập của bạn.</p>
          </div>

          <div className="flex-grow p-6 overflow-y-auto space-y-6 custom-scrollbar bg-navy/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'ai' && <img className="w-10 h-10 rounded-full border-2 border-accent-cyan/50 shadow-md" src={aiAvatar} alt="AI Avatar"/>}
                <div className={`flex flex-col max-w-[80%] lg:max-w-xl leading-relaxed p-4 rounded-2xl shadow-md ${msg.sender === 'user' ? 'bg-accent-yellow text-navy-dark rounded-br-none' : 'bg-navy-light text-slate-lightest rounded-bl-none border border-slate-dark/30'}`}>
                  <p className="text-base whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
             {isTyping && (
             <div className="flex items-start gap-4">
                <img className="w-10 h-10 rounded-full border-2 border-accent-cyan/50 shadow-md" src={aiAvatar} alt="AI Avatar"/>
                <div className="bg-navy-light p-4 rounded-2xl rounded-bl-none border border-slate-dark/30">
                  <Loader2 className="w-6 h-6 text-accent-yellow animate-spin" />
                </div>
             </div>
          )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-dark/30 bg-navy-dark">
            <div className="bg-navy p-2 rounded-xl border border-slate-dark/50 flex items-center gap-2 focus-within:ring-2 focus-within:ring-accent-yellow/50 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Nhập câu hỏi của bạn ở đây (Vd: Giải thích giải thuật sắp xếp?)..."
                  className="flex-grow bg-transparent focus:outline-none text-slate-lightest placeholder-slate-dark px-4 py-2"
                  disabled={isTyping}
                />
                <button onClick={handleSend} disabled={isTyping} className="bg-accent-yellow text-navy-dark rounded-lg p-2 hover:bg-accent-yellow-dark transition-colors disabled:opacity-50 shadow-lg">
                  <Send className="w-6 h-6" />
                </button>
            </div>
            <p className="text-xs text-center text-slate-dark mt-3">AI có thể mắc lỗi. Hãy cân nhắc kiểm tra các thông tin quan trọng.</p>
          </div>
        </div>
    </div>
  );
};

export default AiChatPage;