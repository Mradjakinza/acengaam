
import React, { useState, useRef } from 'react';
import { Bot, Send, X, Sparkles, MessageSquare, Loader2, ShieldCheck, Camera, ScanText } from 'lucide-react';
import { askAI } from '../lib/gemini';

interface AIAssistantProps {
  context: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const lastCallTime = useRef<number>(0);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim()) return;

    // Security: Rate Limiting (1 request per 3 seconds)
    const now = Date.now();
    if (now - lastCallTime.current < 3000) {
      setMessages(prev => [...prev, { role: 'ai', text: "Slow down, bestie! Jangan nge-spam, literally sistem gue butuh nafas." }]);
      return;
    }
    lastCallTime.current = now;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setLoading(true);
    
    const response = await askAI(textToSend, context);
    setMessages(prev => [...prev, { role: 'ai', text: response || '' }]);
    setLoading(false);
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleSend("Gue baru aja scan soal ini pake Google Lens: 'Tentukan akar x dari x^2 - 5x + 6 = 0'. Bantuin dong!");
    }, 2000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[550px] rounded-[32px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="p-6 bg-slate-900 text-white flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <div>
                <span className="font-bold uppercase tracking-widest text-xs block">AAM-AI Mentor</span>
                <span className="text-[10px] text-emerald-400 font-bold">Secure Tunnel Active</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-10 space-y-4">
                <Bot className="mx-auto text-blue-200" size={64} />
                <div className="space-y-2">
                  <p className="text-slate-800 font-bold text-sm">Glow-up Akademik mu di sini!</p>
                  <p className="text-slate-500 text-xs px-6 italic">"Nanya soal, resume simulasi, atau curhat soal karir? Literally gue dengerin."</p>
                </div>
                <div className="pt-4 flex justify-center gap-2">
                  <button onClick={simulateScan} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold border border-blue-100 hover:bg-blue-100 transition-all">
                    <Camera size={14} /> Scan Soal (Mock)
                  </button>
                </div>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white border border-slate-200 text-slate-700 shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            
            {isScanning && (
              <div className="flex flex-col items-center justify-center py-4 space-y-2 text-blue-600 animate-pulse">
                <ScanText size={32} />
                <span className="text-[10px] font-black uppercase tracking-widest">Scanning Document...</span>
              </div>
            )}
            
            {loading && (
              <div className="flex justify-start items-center gap-2 text-slate-400">
                <Loader2 className="animate-spin" size={16} />
                <span className="text-[10px] font-bold">AAM-AI is thinking...</span>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 space-y-3">
            <div className="flex gap-2">
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Nanya dong, literally..."
                className="flex-1 p-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none text-sm transition-all"
              />
              <button 
                onClick={() => handleSend()} 
                disabled={loading || !input.trim()}
                className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-center text-slate-400 font-medium">AAM Security Engine v2.5 Protected • No data logs saved.</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group p-5 bg-blue-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 active:scale-95"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm">Need Help, Bestie?</span>
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
