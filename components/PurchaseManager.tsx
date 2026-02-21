
import React, { useState } from 'react';
import { Plus, ShoppingCart, Tag, DollarSign, Calendar, X, Check, Trash2, Building2 } from 'lucide-react';
import { Purchase } from '../types';

const PurchaseManager: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: '1', supplier: 'Papelaria Central', description: 'Materiais de Escritório', amount: 450, date: '2024-05-08', category: 'Suprimentos' },
    { id: '2', supplier: 'Dell Technologies', description: 'Monitor 27"', amount: 1800, date: '2024-05-15', category: 'Equipamentos' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplier: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Suprimentos'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newPurchase: Purchase = {
      id: Math.random().toString(36).substr(2, 9),
      supplier: formData.supplier,
      description: formData.description,
      amount: parseFloat(formData.amount) || 0,
      date: formData.date,
      category: formData.category
    };
    setPurchases([newPurchase, ...purchases]);
    setIsModalOpen(false);
    setFormData({ supplier: '', description: '', amount: '', date: new Date().toISOString().split('T')[0], category: 'Suprimentos' });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Gestão de Compras</h2>
          <p className="text-gray-500 font-medium">Controle suas aquisições e fornecedores.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-accent shadow-lg transition-all active:scale-95 self-start"
        >
          <Plus size={20} /> Nova Compra
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchases.map(purchase => (
          <div key={purchase.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center text-primary">
                <ShoppingCart size={24} />
              </div>
              <button 
                onClick={() => setPurchases(purchases.filter(p => p.id !== purchase.id))}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="mb-4">
              <h3 className="font-bold text-gray-800">{purchase.description}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Building2 size={12} className="text-primary/40" /> {purchase.supplier}
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Valor</span>
                <span className="text-lg font-black text-primary">R$ {purchase.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Data</span>
                <span className="text-xs font-bold text-gray-700">{purchase.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-slideUp">
            <header className="bg-primary p-8 text-white flex justify-between items-center">
              <h3 className="text-2xl font-black tracking-tight">Nova Compra</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>
            <form onSubmit={handleSave} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Fornecedor</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                  value={formData.supplier}
                  onChange={e => setFormData({...formData, supplier: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Descrição do Item/Serviço</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Valor (R$)</label>
                  <input 
                    required
                    type="number" 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Data</label>
                  <input 
                    required
                    type="date" 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
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
                  <option value="Suprimentos">Suprimentos</option>
                  <option value="Equipamentos">Equipamentos</option>
                  <option value="Serviços">Serviços</option>
                  <option value="Software">Software</option>
                  <option value="Outros">Outros</option>
                </select>
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
                  <Check size={20} /> Salvar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseManager;
