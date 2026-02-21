
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  StickyNote, 
  Pin, 
  Trash2, 
  Search, 
  Edit3, 
  X, 
  Check, 
  Tag, 
  Calendar,
  AlertCircle,
  Hash
} from 'lucide-react';
import { MOCK_NOTES } from '../constants';
import { Note } from '../types';

const NotesManager: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isPinned: false
  });

  const filteredNotes = useMemo(() => {
    return notes
      .filter(n => 
        n.title.toLowerCase().includes(search.toLowerCase()) || 
        n.content.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [notes, search]);

  const togglePin = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const deleteNote = (id: string) => {
    if (confirm('Deseja excluir esta anotação permanentemente?')) {
      setNotes(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleOpenModal = (note?: Note) => {
    if (note) {
      setEditingNote(note);
      setFormData({ title: note.title, content: note.content, isPinned: note.isPinned });
    } else {
      setEditingNote(null);
      setFormData({ title: '', content: '', isPinned: false });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    if (editingNote) {
      setNotes(prev => prev.map(n => n.id === editingNote.id ? { 
        ...n, 
        title: formData.title, 
        content: formData.content, 
        isPinned: formData.isPinned 
      } : n));
    } else {
      const newNote: Note = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        content: formData.content,
        isPinned: formData.isPinned,
        date: new Date().toLocaleDateString('pt-BR')
      };
      setNotes(prev => [newNote, ...prev]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Bloco de Notas</h2>
          <p className="text-gray-500">Organize rascunhos, estratégias e lembretes rápidos.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-deepRed shadow-lg transition-all active:scale-95 self-start"
        >
          <Plus size={20} /> Nova Anotação
        </button>
      </header>

      <div className="relative group max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Pesquisar em suas notas e rascunhos..." 
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all text-sm font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNotes.map(note => (
            <div 
              key={note.id} 
              className={`bg-white p-7 rounded-[32px] border transition-all relative group flex flex-col h-full ${
                note.isPinned ? 'border-primary/30 shadow-xl shadow-primary/5' : 'border-gray-100 shadow-sm'
              } hover:shadow-2xl hover:-translate-y-1`}
            >
              {note.isPinned && (
                <div className="absolute -top-3 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg animate-bounce">
                  <Pin size={14} fill="white" />
                </div>
              )}

              <div className="flex justify-between items-start mb-5">
                <div className={`p-3 rounded-2xl text-primary ${note.isPinned ? 'bg-primary/10' : 'bg-secondary'}`}>
                  <StickyNote size={24} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => togglePin(note.id)}
                    className={`p-2 rounded-xl transition-all ${note.isPinned ? 'text-primary bg-primary/10' : 'text-gray-300 hover:text-primary hover:bg-secondary'}`}
                    title={note.isPinned ? "Desafixar" : "Fixar no topo"}
                  >
                    <Pin size={18} fill={note.isPinned ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={() => handleOpenModal(note)}
                    className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => deleteNote(note.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-lg mb-3 line-clamp-1">{note.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-5 leading-relaxed font-medium mb-6">
                  {note.content}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <Calendar size={12} /> {note.date}
                </div>
                <div className="flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-primary/20"></span>
                   <span className="text-[10px] font-bold text-gray-300 uppercase">Anotação Interna</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
            <StickyNote size={40} />
          </div>
          <h3 className="text-gray-400 font-bold text-lg">Nenhuma anotação disponível</h3>
          <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">
            Utilize as notas para salvar teses rápidas, lembretes de casos ou rascunhos de petições.
          </p>
          <button 
            onClick={() => handleOpenModal()}
            className="mt-6 text-primary font-bold text-sm hover:underline flex items-center gap-2 mx-auto"
          >
            <Plus size={16} /> Criar primeira nota
          </button>
        </div>
      )}

      {/* Modal de Nova/Editar Nota */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-slideUp">
            <header className="bg-primary p-7 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <StickyNote size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{editingNote ? 'Editar Anotação' : 'Nova Anotação'}</h3>
                  <p className="text-white/70 text-xs font-medium">Capture insights jurídicos instantaneamente.</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Título da Nota</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    autoFocus
                    required
                    type="text" 
                    placeholder="Ex: Estratégia Recursal - Caso XPTO"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Conteúdo Jurídico</label>
                <textarea 
                  required
                  rows={6}
                  placeholder="Descreva aqui sua tese, lembrete ou anotação importante..."
                  className="w-full px-5 py-4 rounded-3xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-medium leading-relaxed resize-none"
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                />
              </div>

              <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${formData.isPinned ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <Pin size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-700">Fixar no Topo</p>
                    <p className="text-[10px] text-gray-400 font-medium">Manter visibilidade prioritária</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, isPinned: !formData.isPinned})}
                  className={`w-12 h-6 rounded-full transition-all relative ${formData.isPinned ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isPinned ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="bg-secondary/40 p-5 rounded-2xl border border-primary/5 flex items-start gap-3">
                 <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
                 <p className="text-[10px] text-gray-600 leading-relaxed font-medium">
                   Estas notas são privadas e criptografadas. Você pode vincular anotações a processos específicos no módulo de Gestão de Processos.
                 </p>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-2xl border border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-all text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-primary text-white px-6 py-4 rounded-2xl font-bold hover:bg-deepRed shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Check size={20} strokeWidth={3} /> {editingNote ? 'Atualizar Nota' : 'Criar Anotação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesManager;
