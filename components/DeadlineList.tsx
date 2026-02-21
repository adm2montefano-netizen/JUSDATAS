
import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  Filter, 
  Plus, 
  Calendar as CalendarIcon, 
  X, 
  Check, 
  ChevronRight,
  AlertCircle,
  Trash2,
  AlertTriangle,
  Scale,
  Search,
  CheckCircle2
} from 'lucide-react';
import { MOCK_DEADLINES, MOCK_PROCESSES } from '../constants';
import { Deadline, Priority } from '../types';

const DeadlineList: React.FC = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>(MOCK_DEADLINES);
  const [filter, setFilter] = useState<Priority | 'Todos'>('Todos');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State para Novo Prazo
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    priority: 'Média' as Priority,
    processId: '',
    source: 'Manual' as const
  });

  const toggleComplete = (id: string) => {
    setDeadlines(prev => prev.map(d => d.id === id ? { ...d, completed: !d.completed } : d));
  };

  const deleteDeadline = (id: string) => {
    if (confirm('Deseja realmente remover este prazo?')) {
      setDeadlines(prev => prev.filter(d => d.id !== id));
    }
  };

  const filtered = useMemo(() => {
    return deadlines.filter(d => {
      const matchesFilter = filter === 'Todos' || d.priority === filter;
      const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [deadlines, filter, search]);

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'Urgente': return 'text-red-600 bg-red-50 border-red-100';
      case 'Alta': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'Média': return 'text-accent bg-accent/5 border-accent/10';
      default: return 'text-primary bg-primary/5 border-primary/10';
    }
  };

  const calculateDaysRemaining = (dateString: string) => {
    const diff = new Date(dateString).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) return;

    const deadline: Deadline = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      dueDate: new Date(formData.dueDate).toISOString(),
      priority: formData.priority,
      processId: formData.processId || undefined,
      completed: false,
      source: 'Manual'
    };

    setDeadlines(prev => [deadline, ...prev]);
    setIsModalOpen(false);
    setFormData({ title: '', dueDate: '', priority: 'Média', processId: '', source: 'Manual' });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Controle de Prazos</h2>
          <p className="text-gray-500 font-medium">Gestão inteligente de vencimentos e compromissos processuais.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3.5 rounded-2xl flex items-center gap-2 font-bold hover:bg-accent shadow-xl transition-all active:scale-95 self-start"
        >
          <Plus size={20} /> Novo Prazo
        </button>
      </header>

      {/* Barra de Busca e Filtros */}
      <div className="flex flex-col lg:flex-row gap-6 items-center bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Filtrar por descrição do prazo..." 
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-secondary/20 border border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all text-sm font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 custom-scrollbar">
          <div className="flex items-center gap-2 bg-secondary/30 px-3 py-2 rounded-xl border border-gray-200/50 mr-2">
            <Filter size={16} className="text-primary/60 shrink-0" />
            <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest whitespace-nowrap">Prioridade</span>
          </div>
          {['Todos', 'Urgente', 'Alta', 'Média', 'Baixa'].map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                filter === p 
                  ? 'bg-primary text-white border-primary shadow-md transform scale-105' 
                  : 'bg-white text-gray-500 border-gray-100 hover:bg-secondary/50 hover:text-primary hover:border-primary/20'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Prazos */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.length > 0 ? filtered.map(deadline => {
          const daysRemaining = calculateDaysRemaining(deadline.dueDate);
          const isOverdue = daysRemaining < 0 && !deadline.completed;
          const isExpiringSoon = daysRemaining <= 2 && daysRemaining >= 0 && !deadline.completed;

          return (
            <div 
              key={deadline.id} 
              className={`bg-white p-6 rounded-[32px] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group ${
                deadline.completed 
                  ? 'opacity-60 border-gray-100 bg-gray-50/50' 
                  : isOverdue 
                    ? 'border-red-200 shadow-xl shadow-red-500/5 bg-red-50/30' 
                    : 'border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20'
              }`}
            >
              <div className="flex items-start gap-5 flex-1 min-w-0">
                <button 
                  onClick={() => toggleComplete(deadline.id)}
                  className={`mt-1.5 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all shrink-0 ${
                    deadline.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isOverdue 
                        ? 'border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white' 
                        : 'border-gray-200 text-transparent hover:border-primary hover:text-primary/30 bg-white'
                  }`}
                >
                  <Check size={18} strokeWidth={4} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-bold text-gray-800 text-lg leading-tight truncate ${deadline.completed ? 'line-through text-gray-400' : ''}`}>
                      {deadline.title}
                    </h4>
                    {deadline.source === 'Integração' && (
                      <span className="bg-accent/10 text-accent px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter">Automático</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                      <CalendarIcon size={14} className="text-primary" /> 
                      {new Date(deadline.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black border uppercase tracking-widest ${getPriorityColor(deadline.priority)}`}>
                      {deadline.priority}
                    </span>
                    {deadline.processId && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-secondary/30 text-[9px] font-bold text-primary/70 border border-primary/5">
                        <Scale size={12} /> Proc: {MOCK_PROCESSES.find(p => p.id === deadline.processId)?.number.split('.')[0] + '...'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                {!deadline.completed ? (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs shadow-sm ${
                    isOverdue 
                      ? 'bg-red-500 text-white' 
                      : isExpiringSoon 
                        ? 'bg-orange-100 text-orange-600 animate-pulse' 
                        : 'bg-secondary text-primary'
                  }`}>
                    {isOverdue ? (
                      <><AlertCircle size={14} /> Vencido</>
                    ) : (
                      <><Clock size={14} /> {daysRemaining === 0 ? 'Vence Hoje' : daysRemaining === 1 ? 'Vence Amanhã' : `Faltam ${daysRemaining} dias`}</>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs bg-green-50 text-green-600">
                    <CheckCircle2 size={14} /> Concluído
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => deleteDeadline(deadline.id)}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    title="Excluir Prazo"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button className="p-3 text-gray-300 hover:text-primary hover:bg-secondary rounded-2xl transition-all hidden sm:block">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Clock size={40} />
            </div>
            <h3 className="text-gray-400 font-bold text-xl">Nenhum prazo encontrado</h3>
            <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">Sua agenda está limpa! Descanse ou adicione novos compromissos para monitoramento.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 text-primary font-bold text-sm hover:underline flex items-center gap-2 mx-auto"
            >
              <Plus size={16} /> Cadastrar novo prazo
            </button>
          </div>
        )}
      </div>

      {/* Modal / Popup de Novo Prazo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-slideUp">
            <header className="bg-primary p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Novo Prazo</h3>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Agendamento Crítico</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>

            <form onSubmit={handleSave} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Descrição do Prazo / Ato Processual</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  placeholder="Ex: Protocolar Recurso de Apelação..."
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Vencimento (Data e Hora)</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      required
                      type="datetime-local" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                      value={formData.dueDate}
                      onChange={e => setFormData({...formData, dueDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nível de Prioridade</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                    value={formData.priority}
                    onChange={e => setFormData({...formData, priority: e.target.value as Priority})}
                  >
                    <option value="Urgente">🚨 Urgente (Fatal)</option>
                    <option value="Alta">🔴 Alta Prioridade</option>
                    <option value="Média">🟡 Média</option>
                    <option value="Baixa">🔵 Baixa</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Vincular a Processo</label>
                <div className="relative">
                  <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                    value={formData.processId}
                    onChange={e => setFormData({...formData, processId: e.target.value})}
                  >
                    <option value="">Nenhum processo vinculado (Administrativo)</option>
                    {MOCK_PROCESSES.map(p => (
                      <option key={p.id} value={p.id}>{p.number} - {p.parties}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-secondary/40 p-6 rounded-[32px] border border-primary/5 flex items-start gap-4">
                 <AlertTriangle size={20} className="text-orange-500 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                   <strong>Dica de Conformidade:</strong> Prazos marcados como 'Urgentes' aparecerão em destaque no Dashboard e enviarão notificações PUSH 24h antes do vencimento.
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
                  <Check size={20} strokeWidth={4} className="group-hover:scale-110 transition-transform" /> 
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeadlineList;
