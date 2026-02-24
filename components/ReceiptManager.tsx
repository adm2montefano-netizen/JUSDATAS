
import React, { useState } from 'react';
import { Plus, Receipt as ReceiptIcon, User, DollarSign, Calendar, X, Check, Trash2, Download } from 'lucide-react';
import { Receipt } from '../types';

const ReceiptManager: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([
    { id: '1', clientName: 'João Silva', amount: 5000, date: '2024-05-10', description: 'Honorários Processo 123' },
    { id: '2', clientName: 'Maria Oliveira', amount: 1200, date: '2024-05-12', description: 'Elaboração de Contrato' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newReceipt: Receipt = {
      id: Math.random().toString(36).substr(2, 9),
      clientName: formData.clientName,
      amount: parseFloat(formData.amount) || 0,
      date: formData.date,
      description: formData.description
    };
    setReceipts([newReceipt, ...receipts]);
    setIsModalOpen(false);
    setFormData({ clientName: '', amount: '', date: new Date().toISOString().split('T')[0], description: '' });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Emissão de Recibos</h2>
          <p className="text-gray-500 font-medium">Gere e organize recibos para seus clientes.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-accent shadow-lg transition-all active:scale-95 self-start"
        >
          <Plus size={20} /> Novo Recibo
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {receipts.map(receipt => (
          <div key={receipt.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform">
              <ReceiptIcon size={120} />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-secondary/30 rounded-2xl text-primary">
                <ReceiptIcon size={28} />
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-300 hover:text-primary hover:bg-secondary rounded-xl transition-all" title="Baixar PDF">
                  <Download size={18} />
                </button>
                <button 
                  onClick={() => setReceipts(receipts.filter(r => r.id !== receipt.id))}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Cliente</p>
                <h3 className="text-xl font-black text-primary">{receipt.clientName}</h3>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Descrição</p>
                <p className="text-sm text-gray-600 font-medium">{receipt.description}</p>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-gray-50">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Data de Emissão</p>
                  <p className="text-xs font-bold text-gray-800 flex items-center gap-2">
                    <Calendar size={14} className="text-primary/40" /> {receipt.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Valor Total</p>
                  <p className="text-2xl font-black text-primary">R$ {receipt.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
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
              <h3 className="text-2xl font-black tracking-tight">Novo Recibo</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>
            <form onSubmit={handleSave} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Nome do Cliente</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={formData.clientName}
                    onChange={e => setFormData({...formData, clientName: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Valor (R$)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      required
                      type="number" 
                      className="w-full pl-10 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                      value={formData.amount}
                      onChange={e => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Data</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      required
                      type="date" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Descrição do Pagamento</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
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
                  <Check size={20} /> Gerar Recibo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptManager;
