
import React, { useState, useMemo } from 'react';
import { 
  Link2, 
  Search, 
  ShieldCheck, 
  RefreshCcw, 
  CheckCircle2, 
  Info,
  Zap,
  Globe
} from 'lucide-react';
import { BRAZIL_STATES, MOCK_INTEGRATIONS } from '../constants';
import { CourtIntegration } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<CourtIntegration[]>(MOCK_INTEGRATIONS);
  const [search, setSearch] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [oabInfo, setOabInfo] = useState({ number: '123.456', state: 'SP' });

  const filteredStates = useMemo(() => {
    return BRAZIL_STATES.filter(s => 
      s.name.toLowerCase().includes(search.toLowerCase()) || 
      s.acr.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const toggleIntegration = (stateAcr: string) => {
    const existing = integrations.find(i => i.state === stateAcr);
    if (existing) {
      setIntegrations(prev => prev.map(i => i.state === stateAcr ? { ...i, isActive: !i.isActive } : i));
    } else {
      const newInt: CourtIntegration = {
        id: generateId(),
        state: stateAcr,
        court: `TJ${stateAcr}`,
        isActive: true,
        lastSync: new Date().toLocaleString('pt-BR').slice(0, 16)
      };
      setIntegrations(prev => [...prev, newInt]);
    }
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Sincronização concluída! Novos prazos foram adicionados ao seu painel.');
      setIntegrations(prev => prev.map(i => i.isActive ? { ...i, lastSync: new Date().toLocaleString('pt-BR').slice(0, 16) } : i));
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Integrações Inteligentes</h2>
          <p className="text-gray-500 font-medium">Conecte sua OAB aos Tribunais para automação de prazos e publicações.</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
            isSyncing ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-deepRed'
          }`}
        >
          <RefreshCcw size={20} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Sincronizando...' : 'Sincronizar Agora'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Painel de Configuração OAB */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <ShieldCheck size={24} />
              <h3 className="font-bold text-lg">Credenciais de Monitoramento</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Número da OAB</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                  value={oabInfo.number}
                  onChange={e => setOabInfo({...oabInfo, number: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Seccional (Estado)</label>
                <select 
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none"
                  value={oabInfo.state}
                  onChange={e => setOabInfo({...oabInfo, state: e.target.value})}
                >
                  {BRAZIL_STATES.map(s => (
                    <option key={s.acr} value={s.acr}>{s.acr} - {s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex items-start gap-3">
              <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                Sua OAB será monitorada diariamente em todos os tribunais ativos. Publicações encontradas gerarão prazos automaticamente no módulo <strong>Prazos</strong>.
              </p>
            </div>
          </div>

          <div className="bg-primary text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={20} className="text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Status da Automação</span>
              </div>
              <h4 className="text-2xl font-bold mb-2">Monitoramento Ativo</h4>
              <p className="text-white/70 text-sm leading-relaxed mb-6">Você possui {integrations.filter(i => i.isActive).length} tribunais conectados com varredura em tempo real.</p>
              <div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-4 py-2 rounded-xl w-fit">
                <CheckCircle2 size={14} className="text-green-400" /> Sistema 100% Operacional
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <Link2 size={200} />
            </div>
          </div>
        </div>

        {/* Seleção de Tribunais */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              {/* Fix: Added Globe to lucide-react imports */}
              <Globe size={20} className="text-primary" /> Tribunais dos Estados
            </h3>
            <div className="relative w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Filtrar por estado..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-100 text-xs font-medium focus:ring-2 focus:ring-primary/10 outline-none"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredStates.map(state => {
              const integration = integrations.find(i => i.state === state.acr);
              const isActive = integration?.isActive || false;

              return (
                <div 
                  key={state.acr} 
                  className={`p-6 rounded-[32px] border transition-all flex items-center justify-between group ${
                    isActive 
                      ? 'bg-white border-primary/20 shadow-md ring-1 ring-primary/5' 
                      : 'bg-white border-gray-100 shadow-sm hover:border-primary/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-colors ${
                      isActive ? 'bg-primary text-white shadow-lg' : 'bg-secondary text-primary'
                    }`}>
                      {state.acr}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{state.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">TJ{state.acr}</p>
                      {isActive && integration?.lastSync && (
                        <p className="text-[9px] text-green-600 font-bold mt-1 flex items-center gap-1">
                          <RefreshCcw size={10} /> Sinc: {integration.lastSync}
                        </p>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => toggleIntegration(state.acr)}
                    className={`w-12 h-6 rounded-full transition-all relative ${isActive ? 'bg-primary' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${isActive ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
