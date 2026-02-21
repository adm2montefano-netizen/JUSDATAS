
import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Users, 
  Clock, 
  Plus, 
  X, 
  Check, 
  Video, 
  Briefcase,
  AlertCircle,
  RefreshCcw,
  ExternalLink,
  Trash2,
  CalendarCheck2
} from 'lucide-react';
import { MOCK_PROCESSES } from '../constants';

interface Event {
  id: string;
  title: string;
  time: string;
  type: 'Audiência' | 'Reunião' | 'Diligência' | 'Interno';
  client: string;
  place: string;
  date: string; // ISO String (YYYY-MM-DD)
  color: string;
  source: 'Local' | 'Google';
}

const INITIAL_EVENTS: Event[] = [
  { id: '1', title: 'Audiência de Instrução', time: '14:00', type: 'Audiência', client: 'Carlos Silva', place: 'Fórum Central - Sala 302', date: new Date().toISOString().split('T')[0], color: 'bg-red-500', source: 'Local' },
  { id: '2', title: 'Reunião com Sócio', time: '10:00', type: 'Interno', client: '-', place: 'Escritório', date: new Date().toISOString().split('T')[0], color: 'bg-blue-500', source: 'Local' },
  { id: '3', title: 'Protocolo Prazo X', time: '18:00', type: 'Diligência', client: 'Maria Oliveira', place: 'Tribunal Online', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], color: 'bg-green-500', source: 'Google' },
];

const Agenda: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '09:00',
    type: 'Audiência' as Event['type'],
    client: '',
    place: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Calendar Logic
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));
    
    return days;
  }, [currentDate]);

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  const selectedDateEvents = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));
  }, [events, selectedDate]);

  const hasEvents = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.some(e => e.date === dateStr);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const colorMap = {
      'Audiência': 'bg-red-500',
      'Reunião': 'bg-blue-500',
      'Diligência': 'bg-green-500',
      'Interno': 'bg-purple-500'
    };

    const event: Event = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      color: colorMap[newEvent.type],
      source: 'Local'
    };

    setEvents(prev => [...prev, event]);
    setIsModalOpen(false);
    setNewEvent({ ...newEvent, title: '', client: '', place: '' });
  };

  const handleSyncGoogle = () => {
    if (!isGoogleConnected) {
      if (confirm('Deseja conectar sua conta Google para sincronizar a agenda?')) {
        setIsGoogleConnected(true);
      }
      return;
    }
    
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const googleEvent: Event = {
        id: 'google-' + Date.now(),
        title: 'Audiência (Google Cal)',
        time: '11:30',
        type: 'Audiência',
        client: 'Importado do Google',
        place: 'Link Virtual',
        date: selectedDate.toISOString().split('T')[0],
        color: 'bg-accent',
        source: 'Google'
      };
      setEvents(prev => [...prev, googleEvent]);
    }, 1500);
  };

  const deleteEvent = (id: string) => {
    if (confirm('Deseja remover este compromisso?')) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Agenda Jurídica</h2>
          <p className="text-gray-500 font-medium">Gestão centralizada de audiências, sustentações e compromissos.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSyncGoogle}
            className={`px-5 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 border ${
              isGoogleConnected 
                ? 'bg-white text-primary border-primary/20 hover:bg-secondary' 
                : 'bg-white text-gray-400 border-gray-100 hover:text-primary hover:border-primary/20'
            }`}
          >
            {isSyncing ? (
              <RefreshCcw size={18} className="animate-spin" />
            ) : (
              <CalendarCheck2 size={18} className={isGoogleConnected ? "text-accent" : ""} />
            )}
            {isGoogleConnected ? 'Sincronizar Google' : 'Conectar Google Calendar'}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-accent shadow-xl transition-all active:scale-95"
          >
            <Plus size={20} /> Novo Evento
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendário */}
        <div className="lg:col-span-7 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-primary capitalize tracking-tight">
              {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex items-center gap-2">
               <button onClick={() => changeMonth(-1)} className="p-3 bg-secondary/50 rounded-2xl hover:bg-secondary text-primary transition-all"><ChevronLeft size={20}/></button>
               <button onClick={() => setCurrentDate(new Date())} className="px-5 py-2.5 text-xs font-black text-primary hover:bg-secondary/50 rounded-2xl transition-all uppercase tracking-widest">Hoje</button>
               <button onClick={() => changeMonth(1)} className="p-3 bg-secondary/50 rounded-2xl hover:bg-secondary text-primary transition-all"><ChevronRight size={20}/></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4 text-center">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
              <span key={d} className="text-[10px] font-black text-gray-400 uppercase tracking-widest py-2">{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-3">
            {calendarDays.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} className="aspect-square"></div>;
              
              const isSelected = day.toDateString() === selectedDate.toDateString();
              const isToday = day.toDateString() === new Date().toDateString();
              const dayHasEvents = hasEvents(day);

              return (
                <button 
                  key={i} 
                  onClick={() => setSelectedDate(day)}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-[24px] transition-all group ${
                    isSelected 
                      ? 'bg-primary text-white shadow-2xl scale-110 z-10' 
                      : isToday 
                        ? 'bg-secondary/50 text-primary border-2 border-primary/10' 
                        : 'hover:bg-secondary/30 text-gray-600'
                  }`}
                >
                  <span className={`text-sm font-black ${isSelected ? 'text-white' : 'text-gray-700'}`}>{day.getDate()}</span>
                  {dayHasEvents && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-accent animate-pulse'}`}></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista de Compromissos do Dia */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm">
            <h3 className="font-black text-primary flex items-center gap-2">
              <Clock size={20} className="text-accent"/> 
              {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
            </h3>
            <span className="text-[10px] font-black text-accent bg-accent/10 px-4 py-1.5 rounded-full border border-accent/10 uppercase tracking-widest">
              {selectedDateEvents.length} Eventos
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {selectedDateEvents.length > 0 ? selectedDateEvents.map(event => (
              <div 
                key={event.id} 
                className={`bg-white p-6 rounded-[32px] border-l-[6px] ${event.color.replace('bg-', 'border-')} shadow-sm border-y border-r border-gray-100 hover:shadow-xl transition-all group animate-slideUp`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-xl uppercase tracking-widest border ${
                      event.type === 'Audiência' ? 'bg-red-50 text-red-600 border-red-100' :
                      event.type === 'Reunião' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-gray-50 text-gray-500 border-gray-100'
                    }`}>
                      {event.type}
                    </span>
                    {event.source === 'Google' && (
                       <span className="bg-accent/10 text-accent p-1 rounded-lg" title="Sincronizado via Google">
                          <RefreshCcw size={12} />
                       </span>
                    )}
                    <span className="text-[11px] font-black text-gray-400 flex items-center gap-1.5 ml-2">
                      <Clock size={12} className="text-primary/40"/> {event.time}
                    </span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-secondary rounded-xl transition-all">
                       <ExternalLink size={16} />
                    </button>
                    <button 
                      onClick={() => deleteEvent(event.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                       <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <h4 className="font-bold text-gray-800 text-lg mb-4 leading-tight group-hover:text-primary transition-colors">{event.title}</h4>
                
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase tracking-tighter">
                    <Users size={14} className="text-primary/30"/> {event.client || 'Geral'}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase tracking-tighter truncate">
                    <MapPin size={14} className="text-primary/30"/> {event.place}
                  </div>
                  {event.place.includes('http') && (
                    <div className="flex items-center gap-2 text-[11px] text-accent font-black uppercase tracking-widest">
                       <Video size={14} /> Entrar na Sala
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="py-24 bg-white rounded-[40px] border border-dashed border-gray-200 text-center flex flex-col items-center">
                 <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                    <CalendarIcon size={40} />
                 </div>
                 <h3 className="text-gray-400 font-bold text-lg">Sem compromissos hoje</h3>
                 <p className="text-gray-400 text-sm mt-2 max-w-[200px]">Aproveite o tempo livre para organizar seus processos.</p>
                 <button 
                  onClick={() => {
                    setNewEvent({...newEvent, date: selectedDate.toISOString().split('T')[0]});
                    setIsModalOpen(true);
                  }}
                  className="mt-8 text-primary font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2"
                 >
                   <Plus size={14} /> Agendar Evento
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Novo Evento */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-slideUp">
            <header className="bg-primary p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <CalendarIcon size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Agendar Compromisso</h3>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Novo Registro de Agenda</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>

            <form onSubmit={handleSaveEvent} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Título do Compromisso</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  placeholder="Ex: Audiência de Instrução e Julgamento..."
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Data</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      required
                      type="date" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                      value={newEvent.date}
                      onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Horário</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      required
                      type="time" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                      value={newEvent.time}
                      onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Tipo de Compromisso</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                    value={newEvent.type}
                    onChange={e => setNewEvent({...newEvent, type: e.target.value as any})}
                  >
                    <option value="Audiência">⚖️ Audiência</option>
                    <option value="Reunião">🤝 Reunião</option>
                    <option value="Diligência">🚗 Diligência</option>
                    <option value="Interno">🏢 Compromisso Interno</option>
                  </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Vincular Cliente/Processo</label>
                   <input 
                    type="text" 
                    placeholder="Nome ou Número..."
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={newEvent.client}
                    onChange={e => setNewEvent({...newEvent, client: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Local ou Link de Vídeo</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Endereço físico ou link do Meet/Zoom..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={newEvent.place}
                    onChange={e => setNewEvent({...newEvent, place: e.target.value})}
                  />
                </div>
              </div>

              <div className="bg-secondary/40 p-6 rounded-[32px] border border-primary/5 flex items-start gap-4">
                 <AlertCircle size={20} className="text-primary shrink-0 mt-0.5" />
                 <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                   Ao salvar, este compromisso será sincronizado automaticamente com seu Google Calendar caso a integração esteja ativa.
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

export default Agenda;
