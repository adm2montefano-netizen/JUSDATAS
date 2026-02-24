
import React, { useState } from 'react';
import { Plus, ArrowUpCircle, ArrowDownCircle, X, Check, Trash2 } from 'lucide-react';
import { FinancialTransaction } from '../types';

const FinancialManager: React.FC = () => {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([
    { id: '1', type: 'Receita', description: 'Honorários Processo 123', amount: 5000, date: '2024-05-10', category: 'Honorários', status: 'Pago' },
    { id: '2', type: 'Despesa', description: 'Aluguel Escritório', amount: 2500, date: '2024-05-05', category: 'Infraestrutura', status: 'Pago' },
    { id: '3', type: 'Receita', description: 'Consultoria Cliente X', amount: 350, date: '2024-05-12', category: 'Consultoria', status: 'Pendente' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'Todos' | 'Receita' | 'Despesa'>('Todos');
  const [formData, setFormData] = useState({
    type: 'Receita' as 'Receita' | 'Despesa',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Honorários',
    status: 'Pago' as 'Pago' | 'Pendente'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: FinancialTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: formData.type,
      description: formData.description,
      amount: parseFloat(formData.amount) || 0,
      date: formData.date,
      category: formData.category,
      status: formData.status
    };
    setTransactions([newTransaction, ...transactions]);
    setIsModalOpen(false);
    setFormData({
      type: 'Receita',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Honorários',
      status: 'Pago'
    });
  };

  const filtered = transactions.filter(t => filter === 'Todos' || t.type === filter);

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Gestão Financeira</h2>
          <p className="text-gray-500 font-medium">Controle suas receitas e despesas em um só lugar.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-accent shadow-lg transition-all active:scale-95 self-start"
        >
          <Plus size={20} /> Novo Lançamento
        </button>
      </header>

      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit">
        {['Todos', 'Receita', 'Despesa'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type as 'Todos' | 'Receita' | 'Despesa')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === type ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/20">
              <th className="p-6 text-[10px] font-black text-primary uppercase tracking-widest">Data</th>
              <th className="p-6 text-[10px] font-black text-primary uppercase tracking-widest">Descrição</th>
              <th className="p-6 text-[10px] font-black text-primary uppercase tracking-widest">Categoria</th>
              <th className="p-6 text-[10px] font-black text-primary uppercase tracking-widest">Status</th>
              <th className="p-6 text-[10px] font-black text-primary uppercase tracking-widest text-right">Valor</th>
              <th className="p-6 text-[10px] font-black text-primary uppercase tracking-widest text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(t => (
              <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-6 text-xs font-bold text-gray-500">{t.date}</td>
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    {t.type === 'Receita' ? (
                      <ArrowUpCircle size={20} className="text-green-500" />
                    ) : (
                      <ArrowDownCircle size={20} className="text-red-500" />
                    )}
                    <span className="text-sm font-bold text-gray-800">{t.description}</span>
                  </div>
                </td>
                <td className="p-6">
                  <span className="text-[10px] bg-secondary/50 text-primary px-2 py-1 rounded-lg font-bold uppercase tracking-widest">{t.category}</span>
                </td>
                <td className="p-6">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-lg border uppercase tracking-wider ${
                    t.status === 'Pago' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className={`p-6 text-right font-black text-sm ${t.type === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'Receita' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td className="p-6 text-center">
                  <button 
                    onClick={() => setTransactions(transactions.filter(item => item.id !== t.id))}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-slideUp">
            <header className="bg-primary p-8 text-white flex justify-between items-center">
              <h3 className="text-2xl font-black tracking-tight">Novo Lançamento</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>
            <form onSubmit={handleSave} className="p-10 space-y-6">
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'Receita'})}
                  className={`flex-1 p-4 rounded-2xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${
                    formData.type === 'Receita' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-100 text-gray-400'
                  }`}
                >
                  <ArrowUpCircle size={20} /> Receita
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'Despesa'})}
                  className={`flex-1 p-4 rounded-2xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${
                    formData.type === 'Despesa' ? 'bg-red-50 border-red-500 text-red-700' : 'border-gray-100 text-gray-400'
                  }`}
                >
                  <ArrowDownCircle size={20} /> Despesa
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Descrição</label>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Categoria</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Status</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as FinancialTransaction['status']})}
                  >
                    <option value="Pago">Pago</option>
                    <option value="Pendente">Pendente</option>
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
                  <Check size={20} /> Salvar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialManager;
