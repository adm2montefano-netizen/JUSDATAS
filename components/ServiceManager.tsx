
import React, { useState } from 'react';
import { Plus, Briefcase, DollarSign, Tag, X, Check, Trash2 } from 'lucide-react';
import { Service } from '../types';

const ServiceManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Consultoria Jurídica', description: 'Consultoria especializada em direito civil.', fee: 350, category: 'Consultivo' },
    { id: '2', name: 'Elaboração de Contrato', description: 'Redação e revisão de contratos comerciais.', fee: 1200, category: 'Contratual' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fee: '',
    category: 'Cível'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      description: formData.description,
      fee: parseFloat(formData.fee) || 0,
      category: formData.category
    };
    setServices([newService, ...services]);
    setIsModalOpen(false);
    setFormData({ name: '', description: '', fee: '', category: 'Cível' });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Catálogo de Serviços</h2>
          <p className="text-gray-500 font-medium">Defina seus serviços e honorários padrão.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-accent shadow-lg transition-all active:scale-95 self-start"
        >
          <Plus size={20} /> Novo Serviço
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
              <Briefcase size={80} />
            </div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center text-primary">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{service.name}</h3>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{service.category}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6 line-clamp-2 relative z-10">{service.description}</p>
            <div className="pt-4 border-t border-gray-50 flex justify-between items-center relative z-10">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Honorário Sugerido</span>
                <span className="text-lg font-black text-primary">R$ {service.fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <button 
                onClick={() => setServices(services.filter(s => s.id !== service.id))}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-slideUp">
            <header className="bg-primary p-8 text-white flex justify-between items-center">
              <h3 className="text-2xl font-black tracking-tight">Novo Serviço</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>
            <form onSubmit={handleSave} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nome do Serviço</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Descrição</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Honorário (R$)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      required
                      type="number" 
                      className="w-full pl-10 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                      value={formData.fee}
                      onChange={e => setFormData({...formData, fee: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Categoria</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Cível">Cível</option>
                    <option value="Trabalhista">Trabalhista</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Empresarial">Empresarial</option>
                    <option value="Família">Família</option>
                  </select>
                </div>
              </div>
              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-5 rounded-2xl border border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-all text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-primary text-white px-6 py-5 rounded-2xl font-bold hover:bg-accent shadow-xl transition-all flex items-center justify-center gap-3 text-sm"
                >
                  <Check size={20} /> Salvar Serviço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManager;
