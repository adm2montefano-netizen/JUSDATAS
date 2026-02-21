
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Trash2, 
  Sparkles, 
  Scale, 
  FileText, 
  Zap, 
  History,
  Copy,
  Check
} from 'lucide-react';
import { getLegalAdvice } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  { id: 'tese', label: 'Sugerir Tese', icon: <Scale size={14} />, prompt: 'Com base no Código Civil brasileiro, sugira uma tese defensiva para um caso de responsabilidade civil por dano moral em atraso de voo.' },
  { id: 'resumo', label: 'Resumir Decisão', icon: <FileText size={14} />, prompt: 'Como posso estruturar um resumo executivo de uma decisão de segunda instância para apresentar ao cliente?' },
  { id: 'risco', label: 'Análise de Risco', icon: <Zap size={14} />, prompt: 'Quais são os principais riscos processuais em uma ação trabalhista envolvendo horas extras sem controle de ponto?' },
];

const AIAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getLegalAdvice(textToSend);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText || 'Não consegui processar sua solicitação no momento.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>');
      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        return <li key={i} className="ml-4 mb-1" dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^[-•]\s*/, '') }} />;
      }
      return <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-[40px] shadow-2xl border border-white/50 overflow-hidden animate-fadeIn">
      {/* Header do Chat */}
      <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-primary text-white shadow-xl z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10">
              <Bot size={32} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent border-2 border-primary rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-black text-xl leading-tight tracking-tight">JUSDATAS AI</h3>
            <div className="flex items-center gap-2">
               <span className="flex h-2 w-2 rounded-full bg-accent"></span>
               <p className="text-[9px] text-white/50 uppercase font-bold tracking-[0.2em]">Neural Engine v4.0 Active</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMessages([])}
            className="p-3 hover:bg-white/10 rounded-2xl text-white/40 hover:text-white transition-all"
            title="Limpar Conversa"
          >
            <History size={20} />
          </button>
          <button 
            onClick={() => setMessages([])}
            className="p-3 hover:bg-accent/40 rounded-2xl text-white/40 hover:text-white transition-all"
            title="Excluir Histórico"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </header>

      {/* Área de Mensagens */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-softGray/50"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-10 animate-fadeIn">
            <div className="w-28 h-28 bg-white rounded-[48px] shadow-2xl flex items-center justify-center text-primary animate-pulse-slow border border-secondary">
              <Sparkles size={56} className="text-accent" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-primary tracking-tighter leading-tight">Como posso acelerar sua advocacia hoje?</h2>
              <p className="text-gray-500 font-medium text-lg">Sou sua inteligência jurídica de elite. Analiso legislações e jurisprudências para dar suporte técnico ao seu escritório.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              {QUICK_PROMPTS.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSend(item.prompt)}
                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="block font-bold text-primary text-sm mb-2">{item.label}</span>
                  <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed font-semibold">Baseado no novo CPC e tendências globais.</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}
            >
              <div className={`flex gap-5 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`shrink-0 w-12 h-12 rounded-[20px] flex items-center justify-center shadow-lg transform transition-transform hover:rotate-6 ${
                  msg.role === 'user' ? 'bg-primary text-white' : 'bg-white text-primary border border-gray-100'
                }`}>
                  {msg.role === 'user' ? <User size={22} /> : <Bot size={22} className="text-accent" />}
                </div>
                <div className="space-y-2">
                  <div className={`relative p-6 rounded-[32px] shadow-sm text-[15px] leading-relaxed group ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-blue max-w-none">
                        {renderContent(msg.content)}
                      </div>
                    ) : (
                      <p className="font-semibold">{msg.content}</p>
                    )}
                    
                    {msg.role === 'assistant' && (
                      <button 
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="absolute bottom-4 right-4 p-2.5 bg-softGray rounded-xl text-gray-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                      >
                        {copiedId === msg.id ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    )}
                  </div>
                  <p className={`text-[9px] font-black uppercase tracking-[0.1em] text-gray-400 px-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-5 max-w-[80%]">
              <div className="shrink-0 w-12 h-12 rounded-[20px] bg-white text-primary border border-gray-100 flex items-center justify-center shadow-lg">
                <Loader2 size={22} className="animate-spin text-accent" />
              </div>
              <div className="p-6 bg-white rounded-[32px] rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-4">
                 <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-accent/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-accent/30 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                 </div>
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Processando Inteligência Jurídica...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input de Mensagem */}
      <div className="p-8 bg-white border-t border-gray-50">
        <div className="max-w-4xl mx-auto flex gap-4 p-4 bg-secondary/20 rounded-[40px] border border-transparent focus-within:border-accent/30 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-accent/5 transition-all relative group">
          <textarea
            rows={1}
            placeholder="Descreva sua dúvida ou cole um trecho processual..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-5 text-[15px] font-semibold outline-none text-gray-700 placeholder:text-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            disabled={!input.trim() || isLoading}
            onClick={() => handleSend()}
            className="bg-primary text-white w-14 h-14 rounded-[24px] hover:bg-accent hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group-hover:shadow-accent/20"
          >
            <Send size={24} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-[0.15em]">
             <Zap size={12} className="text-accent fill-accent" /> Real-time Legal Analysis
          </div>
          <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
          <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-[0.15em]">
             <Scale size={12} className="text-primary" /> GPT-4 Turbo Optimized
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;
