
import React, { useState, useMemo } from 'react';
import { 
  UserPlus, 
  Wallet, 
  FileCheck, 
  ExternalLink, 
  Plus, 
  X, 
  Check, 
  Calendar, 
  Briefcase, 
  Trash2,
  AlertCircle,
  Star,
  Printer,
  FileDown
} from 'lucide-react';
import { MOCK_DEMANDS } from '../constants';
import { CorrespondentDemand } from '../types';

const Correspondent: React.FC = () => {
  const [demands, setDemands] = useState<CorrespondentDemand[]>(MOCK_DEMANDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [filter, setFilter] = useState<'Todas' | 'Pendente' | 'Concluída' | 'Paga'>('Todas');

  // Form State
  const [formData, setFormData] = useState({
    subject: '',
    officeName: '',
    fee: '',
    dueDate: '',
    status: 'Pendente' as CorrespondentDemand['status']
  });

  const filteredDemands = useMemo(() => {
    return demands.filter(d => filter === 'Todas' || d.status === filter);
  }, [demands, filter]);

  const totalToReceive = useMemo(() => {
    return demands
      .filter(d => d.status !== 'Paga')
      .reduce((acc, curr) => acc + curr.fee, 0);
  }, [demands]);

  const totalPaid = useMemo(() => {
    return demands
      .filter(d => d.status === 'Paga')
      .reduce((acc, curr) => acc + curr.fee, 0);
  }, [demands]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.officeName || !formData.fee || !formData.dueDate) return;

    const newDemand: CorrespondentDemand = {
      id: Math.random().toString(36).substr(2, 9),
      subject: formData.subject,
      officeName: formData.officeName,
      fee: parseFloat(formData.fee),
      dueDate: formData.dueDate,
      status: formData.status
    };

    setDemands(prev => [newDemand, ...prev]);
    setIsModalOpen(false);
    setFormData({ subject: '', officeName: '', fee: '', dueDate: '', status: 'Pendente' });
  };

  const deleteDemand = (id: string) => {
    if (confirm('Deseja excluir esta demanda de correspondência?')) {
      setDemands(prev => prev.filter(d => d.id !== id));
    }
  };

  const updateStatus = (id: string, status: CorrespondentDemand['status']) => {
    setDemands(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Advocacia Correspondente</h2>
          <p className="text-gray-500 font-medium">Controle de diligências, audiências e repasses financeiros.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="hidden sm:flex bg-white text-primary border border-primary/20 px-5 py-3 rounded-2xl font-bold hover:bg-secondary transition-all shadow-sm items-center gap-2 active:scale-95"
          >
            <Printer size={20} /> Relatório de Repasses
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-deepRed shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
          >
            <Plus size={20} /> Nova Demanda
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lado Esquerdo: Lista de Demandas */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Briefcase size={20} className="text-primary" /> Demandas Ativas
            </h3>
            <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                  {['Todas', 'Pendente', 'Concluída', 'Paga'].map(s => (
                    <button
                      key={s}
                      onClick={() => setFilter(s as CorrespondentDemand['status'] | 'Todas')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    filter === s ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredDemands.length > 0 ? filteredDemands.map((demand) => (
              <div 
                key={demand.id} 
                className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-xl transition-all group"
              >
                <div className="flex gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    demand.status === 'Concluída' ? 'bg-green-50 text-green-600' : 
                    demand.status === 'Paga' ? 'bg-blue-50 text-blue-600' : 
                    demand.status === 'Pendente' ? 'bg-orange-50 text-orange-600' : 'bg-secondary text-primary'
                  }`}>
                    {demand.status === 'Concluída' ? <FileCheck size={28} /> : 
                     demand.status === 'Paga' ? <Wallet size={28} /> : <UserPlus size={28} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg group-hover:text-primary transition-colors">{demand.subject}</h4>
                    <p className="text-sm text-gray-500 font-medium">{demand.officeName}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg flex items-center gap-1.5">
                        <Wallet size={12} /> R$ {demand.fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-xs text-gray-400 font-bold flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-300" /> Prazo: {new Date(demand.dueDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                  <div className="flex gap-2">
                    {demand.status === 'Pendente' && (
                      <button 
                        onClick={() => updateStatus(demand.id, 'Concluída')}
                        className="p-2.5 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all shadow-sm"
                        title="Marcar como Concluída"
                      >
                        <Check size={18} strokeWidth={3} />
                      </button>
                    )}
                    {demand.status === 'Concluída' && (
                      <button 
                        onClick={() => updateStatus(demand.id, 'Paga')}
                        className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"
                        title="Marcar como Paga"
                      >
                        <Wallet size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteDemand(demand.id)}
                      className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="h-8 w-[1px] bg-gray-100 hidden sm:block mx-1"></div>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                    demand.status === 'Concluída' ? 'bg-green-50 text-green-700 border-green-200' : 
                    demand.status === 'Paga' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                    'bg-orange-50 text-orange-700 border-orange-200'
                  }`}>
                    {demand.status}
                  </span>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                   <Briefcase size={40} />
                </div>
                <h3 className="text-gray-400 font-bold text-lg">Sem demandas encontradas</h3>
                <p className="text-gray-400 text-sm mt-1">Experimente mudar o filtro de visualização.</p>
              </div>
            )}
          </div>
        </div>

        {/* Lado Direito: Resumo e Métricas */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-primary text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Honorários Pendentes</p>
              <h4 className="text-4xl font-bold tracking-tight">R$ {totalToReceive.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
              <div className="mt-8 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-tighter">Ganhos Totais (Pagos)</p>
                    <p className="text-sm font-bold flex items-center gap-1 mt-0.5">
                       R$ {totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                 </div>
                 <button className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all backdrop-blur-md">
                    <ExternalLink size={20} />
                 </button>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Wallet size={180} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 text-lg mb-6 flex items-center gap-2">
               <Star size={18} className="text-yellow-500 fill-yellow-500" /> Performance Profissional
            </h4>
            <div className="space-y-6">
              <div className="space-y-2">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Pontualidade</span>
                    <span className="font-bold text-green-600">98.5%</span>
                 </div>
                 <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[98.5%] rounded-full"></div>
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wider">Eficiência de Pagamento</span>
                    <span className="font-bold text-blue-600">92%</span>
                 </div>
                 <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[92%] rounded-full"></div>
                 </div>
              </div>
              
              <div className="pt-4 border-t border-gray-50 grid grid-cols-2 gap-4">
                 <div className="text-center p-4 bg-secondary/30 rounded-2xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Diligências/Mês</p>
                    <p className="text-xl font-bold text-primary mt-1">24</p>
                 </div>
                 <div className="text-center p-4 bg-secondary/30 rounded-2xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Avaliação</p>
                    <p className="text-xl font-bold text-primary mt-1">4.9</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Relatório de Repasses */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsReportModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden animate-slideUp print:shadow-none print:w-full print:h-full print:m-0 print:rounded-none">
            <header className="bg-primary p-7 text-white flex justify-between items-center print:hidden">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <FileDown size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Relatório de Repasses</h3>
                  <p className="text-white/70 text-xs font-medium">Visualização para exportação e impressão.</p>
                </div>
              </div>
              <button onClick={() => setIsReportModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>

            <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar print:overflow-visible print:max-h-none print:p-0">
               <div id="printable-report" className="space-y-8">
                  <div className="flex justify-between items-start border-b pb-8 border-gray-100">
                     <div>
                        <h2 className="text-3xl font-bold text-primary mb-1">JUSDATAS</h2>
                        <p className="text-sm font-bold text-gray-400">Plataforma Jurídica Inteligente</p>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-gray-800">Relatório de Correspondência</p>
                        <p className="text-xs text-gray-500 mt-1">Gerado em: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                     <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total de Demandas</p>
                        <p className="text-2xl font-bold text-gray-800">{demands.length}</p>
                     </div>
                     <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Recebido (Pagas)</p>
                        <p className="text-2xl font-bold text-green-600">R$ {totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                     </div>
                     <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Pendente</p>
                        <p className="text-2xl font-bold text-orange-600">R$ {totalToReceive.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                     </div>
                  </div>

                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="border-b-2 border-primary/10">
                           <th className="py-4 text-[10px] font-bold text-primary uppercase tracking-widest">Objeto / Cliente</th>
                           <th className="py-4 text-[10px] font-bold text-primary uppercase tracking-widest">Solicitante</th>
                           <th className="py-4 text-[10px] font-bold text-primary uppercase tracking-widest">Vencimento</th>
                           <th className="py-4 text-[10px] font-bold text-primary uppercase tracking-widest">Honorários</th>
                           <th className="py-4 text-right text-[10px] font-bold text-primary uppercase tracking-widest">Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        {demands.map(d => (
                           <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
                              <td className="py-5">
                                 <p className="text-sm font-bold text-gray-800">{d.subject}</p>
                                 <p className="text-[10px] text-gray-400">Ref: #{d.id.toUpperCase()}</p>
                              </td>
                              <td className="py-5 text-sm font-medium text-gray-600">{d.officeName}</td>
                              <td className="py-5 text-sm font-medium text-gray-600">{new Date(d.dueDate).toLocaleDateString('pt-BR')}</td>
                              <td className="py-5 text-sm font-bold text-gray-800">R$ {d.fee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                              <td className="py-5 text-right">
                                 <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase border ${
                                    d.status === 'Paga' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                    d.status === 'Concluída' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'
                                 }`}>
                                    {d.status}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>

                  <div className="pt-8 text-center border-t border-gray-100">
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Documento gerado automaticamente pela Plataforma JUSDATAS</p>
                     <p className="text-[9px] text-gray-300 mt-1">Este relatório tem caráter exclusivamente informativo de controle interno.</p>
                  </div>
               </div>
            </div>

            <footer className="p-8 border-t border-gray-100 flex gap-4 bg-gray-50/50 print:hidden">
               <button 
                  onClick={handlePrint}
                  className="flex-1 bg-primary text-white px-6 py-4 rounded-2xl font-bold hover:bg-deepRed shadow-lg transition-all flex items-center justify-center gap-2"
               >
                  <Printer size={20} /> Imprimir Relatório
               </button>
               <button 
                  onClick={handlePrint} // No browser, Imprimir -> Salvar como PDF é o padrão.
                  className="flex-1 bg-white text-primary border border-primary px-6 py-4 rounded-2xl font-bold hover:bg-secondary transition-all flex items-center justify-center gap-2"
               >
                  <FileDown size={20} /> Salvar como PDF
               </button>
            </footer>
          </div>
        </div>
      )}

      {/* Modal de Nova Demanda */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-slideUp">
            <header className="bg-primary p-7 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Nova Demanda de Correspondência</h3>
                  <p className="text-white/70 text-xs font-medium">Gestão de diligências de escritórios parceiros.</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Objeto da Diligência</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  placeholder="Ex: Audiência de Conciliação, Cópia de Processo..."
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Escritório Solicitante</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="Ex: Almeida & Advogados Associados..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={formData.officeName}
                    onChange={e => setFormData({...formData, officeName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Honorários (R$)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">R$</span>
                    <input 
                      required
                      type="number" 
                      step="0.01"
                      placeholder="0,00"
                      className="w-full pl-10 pr-4 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                      value={formData.fee}
                      onChange={e => setFormData({...formData, fee: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Data Limite</label>
                  <input 
                    required
                    type="date" 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                    value={formData.dueDate}
                    onChange={e => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="bg-secondary/40 p-5 rounded-2xl border border-primary/5 flex items-start gap-3">
                 <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
                 <p className="text-[10px] text-gray-600 leading-relaxed font-medium">
                   Certifique-se de anexar as guias e documentos necessários após salvar esta demanda no módulo de Documentos.
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
                  <Check size={20} strokeWidth={3} /> Salvar Demanda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSS para Impressão */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-report, #printable-report * {
            visibility: visible;
          }
          #printable-report {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Correspondent;
