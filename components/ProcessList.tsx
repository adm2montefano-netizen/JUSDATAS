
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Scale, 
  X, 
  Check, 
  Calendar, 
  DollarSign, 
  Building2, 
  FileText,
  AlertCircle,
  ExternalLink,
  Trash2,
  Users
} from 'lucide-react';
import { MOCK_PROCESSES } from '../constants';
import { Process, ProcessStatus } from '../types';

const ProcessList: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>(MOCK_PROCESSES);
  const [filter, setFilter] = useState<ProcessStatus | 'Todos'>('Todos');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State para Novo Processo
  const [formData, setFormData] = useState({
    number: '',
    parties: '',
    court: 'TJSP',
    subject: '',
    value: '',
    status: 'Ativo' as ProcessStatus,
    distributionDate: new Date().toISOString().split('T')[0]
  });

  const filtered = useMemo(() => {
    return processes.filter(p => {
      const matchesSearch = 
        p.number.toLowerCase().includes(search.toLowerCase()) || 
        p.parties.toLowerCase().includes(search.toLowerCase()) ||
        p.subject.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'Todos' || p.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [processes, search, filter]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.number || !formData.parties) return;

    const newProcess: Process = {
      id: Math.random().toString(36).substr(2, 9),
      number: formData.number,
      parties: formData.parties,
      court: formData.court,
      subject: formData.subject || 'Não especificado',
      value: parseFloat(formData.value) || 0,
      status: formData.status,
      progress: 5, // Processo novo começa com pouco progresso
      distributionDate: formData.distributionDate
    };

    setProcesses(prev => [newProcess, ...prev]);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      number: '',
      parties: '',
      court: 'TJSP',
      subject: '',
      value: '',
      status: 'Ativo',
      distributionDate: new Date().toISOString().split('T')[0]
    });
  };

  const deleteProcess = (id: string) => {
    if (confirm('Deseja realmente remover este processo da sua base de dados?')) {
      setProcesses(prev => prev.filter(p => p.id !== id));
    }
  };

  const getStatusStyle = (status: ProcessStatus) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-700 border-green-200';
      case 'Em Andamento': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Recurso': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Suspenso': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Arquivado': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Gestão de Processos</h2>
          <p className="text-gray-500 font-medium">Controle total da sua carteira processual com inteligência de dados.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-accent shadow-lg transition-all active:scale-95 self-start"
        >
          <Plus size={20} /> Novo Processo
        </button>
      </header>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col lg:flex-row gap-6 items-center bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por número, partes ou assunto..." 
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-secondary/20 border border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all text-sm font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 custom-scrollbar">
          <div className="flex items-center gap-2 bg-secondary/30 px-3 py-2 rounded-xl border border-gray-200/50 mr-2">
            <Filter size={16} className="text-primary/60 shrink-0" />
            <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest whitespace-nowrap">Status</span>
          </div>
          {['Todos', 'Ativo', 'Em Andamento', 'Recurso', 'Suspenso', 'Arquivado'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as ProcessStatus | 'Todos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                filter === s 
                  ? 'bg-primary text-white border-primary shadow-md transform scale-105' 
                  : 'bg-white text-gray-500 border-gray-100 hover:bg-secondary/50 hover:text-primary hover:border-primary/20'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Listagem em Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((process) => (
            <div 
              key={process.id} 
              className="bg-white p-7 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              {/* Overlay Decorativo Discreto */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                <Scale size={120} />
              </div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-secondary/50 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Scale size={24} />
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-300 hover:text-primary hover:bg-secondary rounded-xl transition-all">
                    <ExternalLink size={18} />
                  </button>
                  <button 
                    onClick={() => deleteProcess(process.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="mb-6 relative z-10">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{process.number}</h4>
                <p className="font-bold text-gray-800 text-lg line-clamp-2 leading-tight group-hover:text-primary transition-colors min-h-[3rem]">
                  {process.parties}
                </p>
                <div className="mt-3 flex items-center gap-2">
                   <FileText size={14} className="text-accent" />
                   <span className="text-xs font-semibold text-gray-500">{process.subject}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tribunal / Comarca</p>
                  <p className="text-xs font-black text-gray-700 flex items-center gap-2">
                    <Building2 size={14} className="text-primary/40" /> {process.court}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status Processual</p>
                  <span className={`text-[9px] font-black px-3 py-1 rounded-lg border uppercase tracking-wider ${getStatusStyle(process.status)}`}>
                    {process.status}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 relative z-10">
                <div className="flex justify-between items-end mb-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Valor da Causa</span>
                    <span className="text-sm font-black text-primary">R$ {process.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Progresso</span>
                    <span className="text-xs font-black text-accent">{process.progress}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out" 
                    style={{ width: `${process.progress}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <Scale size={40} />
          </div>
          <h3 className="text-gray-400 font-bold text-xl">Nenhum processo encontrado</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">Tente ajustar seus filtros de busca ou adicione um novo processo para começar.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-8 text-primary font-bold text-sm hover:underline flex items-center gap-2 mx-auto"
          >
            <Plus size={16} /> Cadastrar novo processo
          </button>
        </div>
      )}

      {/* Modal / Popup de Novo Processo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-slideUp">
            <header className="bg-primary p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Scale size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Novo Processo</h3>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Cadastro Estruturado</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>

            <form onSubmit={handleSave} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Número Unificado (CNJ)</label>
                  <input 
                    autoFocus
                    required
                    type="text" 
                    placeholder="0000000-00.0000.0.00.0000"
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={formData.number}
                    onChange={e => setFormData({...formData, number: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Tribunal / Instância</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                    value={formData.court}
                    onChange={e => setFormData({...formData, court: e.target.value})}
                  >
                    <option value="TJSP">TJSP - São Paulo</option>
                    <option value="TJRJ">TJRJ - Rio de Janeiro</option>
                    <option value="TJMG">TJMG - Minas Gerais</option>
                    <option value="TRF3">TRF3 - Federal</option>
                    <option value="TRT2">TRT2 - Trabalho</option>
                    <option value="STJ">STJ</option>
                    <option value="STF">STF</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Partes (Autor vs. Réu)</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="Ex: João das Couves vs. Seguradora Global S.A."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={formData.parties}
                    onChange={e => setFormData({...formData, parties: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Assunto Principal</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Danos Morais, Cobrança..."
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Valor da Causa (R$)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="number" 
                      placeholder="0,00"
                      className="w-full pl-10 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                      value={formData.value}
                      onChange={e => setFormData({...formData, value: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Status Inicial</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as ProcessStatus})}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Recurso">Recurso</option>
                    <option value="Suspenso">Suspenso</option>
                    <option value="Arquivado">Arquivado</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Data de Distribuição</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      required
                      type="date" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                      value={formData.distributionDate}
                      onChange={e => setFormData({...formData, distributionDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-secondary/40 p-6 rounded-[32px] border border-primary/5 flex items-start gap-4">
                 <AlertCircle size={20} className="text-primary shrink-0 mt-0.5" />
                 <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                   Ao salvar, este processo será monitorado automaticamente caso você tenha as integrações ativas com o tribunal selecionado. Novas movimentações aparecerão no seu Dashboard.
                 </p>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-5 rounded-2xl border border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-all text-sm"
                >
                  Descartar
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-primary text-white px-6 py-5 rounded-2xl font-bold hover:bg-accent shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 text-sm group"
                >
                  <Check size={20} strokeWidth={3} className="group-hover:scale-110 transition-transform" /> 
                  Cadastrar Processo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessList;
