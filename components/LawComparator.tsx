
import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  ArrowRightLeft, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Loader2,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { getComparativeLaw } from '../services/geminiService';

const SUGGESTED_THEMES = [
  "LGPD vs GDPR",
  "Direito do Consumidor",
  "Divórcio e Custódia",
  "Propriedade Intelectual",
  "Contratos Digitais",
  "Direito Tributário"
];

const LawComparator: React.FC = () => {
  const [theme, setTheme] = useState('');
  const [country, setCountry] = useState('Portugal');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCompare = async (selectedTheme?: string) => {
    const activeTheme = selectedTheme || theme;
    if (!activeTheme) return;
    
    setLoading(true);
    setResult('');
    try {
      const comparison = await getComparativeLaw(activeTheme, [country]);
      setResult(comparison || 'Nenhum resultado detalhado pôde ser gerado no momento.');
    } catch (error) {
      setResult('Erro ao conectar com o motor de IA. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Módulo Global</span>
          </div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Inteligência em Direito Comparado</h2>
          <p className="text-gray-500 max-w-2xl">
            Análises transnacionais instantâneas. Compare institutos jurídicos brasileiros com legislações de outros países para fundamentação de teses e consultoria internacional.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
           <button className="p-2 text-gray-400 hover:text-primary transition-colors"><Download size={20}/></button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Painel de Configuração */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Tema da Análise</label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Ex: Responsabilidade Civil..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Jurisdição de Destino</label>
                <select 
                  className="w-full px-4 py-3.5 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {["Portugal", "Itália", "Espanha", "Estados Unidos", "Alemanha", "França", "Reino Unido", "Argentina"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Sugestões Rápidas</label>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_THEMES.map(t => (
                  <button 
                    key={t}
                    onClick={() => { setTheme(t); handleCompare(t); }}
                    className="px-3 py-1.5 rounded-xl bg-gray-50 text-[11px] font-bold text-gray-500 border border-gray-100 hover:border-primary/30 hover:text-primary transition-all"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => handleCompare()}
              disabled={loading || !theme}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-deepRed shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 size={20} className="animate-spin" /> Processando Análise...</>
              ) : (
                <><ArrowRightLeft size={20} /> Iniciar Comparação Internacional</>
              )}
            </button>
          </div>

          <div className="bg-secondary/40 p-6 rounded-[32px] border border-primary/5 flex items-start gap-4">
             <div className="p-2 bg-white rounded-xl text-primary shadow-sm shrink-0">
                <Sparkles size={20} />
             </div>
             <div>
                <h4 className="text-xs font-bold text-primary mb-1">Dica JUSDATAS</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Utilize temas específicos para obter tabelas mais detalhadas. A IA JUSDATAS cruza dados de tratados internacionais e legislações locais atualizadas.
                </p>
             </div>
          </div>
        </div>

        {/* Área de Resultados */}
        <div className="lg:col-span-8">
          {loading ? (
            <div className="h-full min-h-[500px] bg-white rounded-[40px] border border-gray-100 flex flex-col items-center justify-center space-y-4 animate-pulse">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                 <Globe size={32} className="text-primary animate-bounce" />
              </div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Consultando Bases Internacionais...</p>
            </div>
          ) : result ? (
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden animate-slideUp">
              <header className="bg-primary px-8 py-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Relatório Comparativo</h3>
                    <p className="text-white/60 text-[10px] uppercase font-bold tracking-tighter">Brasil vs {country} • {theme}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleCopy}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                  <button className="p-2.5 bg-white text-primary hover:bg-secondary rounded-xl transition-all shadow-md">
                    <Download size={16} />
                  </button>
                </div>
              </header>

              <div className="p-10">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-medium text-[15px] space-y-4">
                    {/* Renderização inteligente baseada no retorno da IA */}
                    {result.split('\n').map((line, i) => {
                      if (line.startsWith('###') || line.startsWith('**')) {
                        return <h4 key={i} className="text-primary font-bold text-lg mt-6 mb-2">{line.replace(/[#*]/g, '')}</h4>;
                      }
                      if (line.includes('|')) {
                        // Simples visualização de tabela se a IA retornar markdown
                        return <div key={i} className="font-mono text-[13px] bg-gray-50 p-2 rounded border-x border-gray-200">{line}</div>;
                      }
                      return <p key={i} className="mb-2">{line}</p>;
                    })}
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                     <AlertCircle size={12}/> Nota de Isenção: Conteúdo gerado via IA. Valide fontes oficiais.
                  </div>
                  <img src="https://api.dicebear.com/7.x/identicon/svg?seed=jusdatas" className="w-8 h-8 opacity-10 grayscale" alt="JusDatas Watermark" />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] bg-white rounded-[40px] border border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center group hover:bg-white/50 transition-all">
              <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe size={48} className="text-primary opacity-20 group-hover:opacity-40" />
              </div>
              <h3 className="text-xl font-bold text-gray-400">Pronto para a Próxima Análise</h3>
              <p className="text-gray-400 text-sm mt-2 max-w-sm">
                Selecione um tema jurídico e um país para gerar instantaneamente uma análise comparativa profunda baseada em IA.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawComparator;
