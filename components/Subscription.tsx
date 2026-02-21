
import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  Zap, 
  History, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Download,
  AlertCircle,
  Plus,
  MoreVertical,
  CheckCircle2,
  // Added missing ChevronRight icon import
  ChevronRight
} from 'lucide-react';
import { Plan, Invoice } from '../types';

const PLANS: Plan[] = [
  {
    id: 'p1',
    name: 'Essencial',
    price: 99.90,
    period: 'mês',
    features: ['Até 50 processos ativos', '1 usuário', 'IA Assistente Limitada', 'Integração TJSP e TJRJ', '5GB de armazenamento'],
  },
  {
    id: 'p2',
    name: 'Profissional',
    price: 199.90,
    period: 'mês',
    features: ['Processos ilimitados', 'Até 5 usuários', 'IA Assistente Full', 'Todas Integrações Estaduais', '50GB de armazenamento', 'Módulo Correspondente'],
    isPopular: true
  },
  {
    id: 'p3',
    name: 'Enterprise',
    price: 499.90,
    period: 'mês',
    features: ['Usuários ilimitados', 'Suporte Prioritário 24/7', 'Treinamento de Equipe', 'Storage Customizado', 'API de Integração', 'Relatórios Customizados'],
  }
];

const INVOICES: Invoice[] = [
  { id: 'inv-001', date: '10/05/2024', amount: 199.90, status: 'Pago', downloadUrl: '#' },
  { id: 'inv-002', date: '10/04/2024', amount: 199.90, status: 'Pago', downloadUrl: '#' },
  { id: 'inv-003', date: '10/03/2024', amount: 199.90, status: 'Pago', downloadUrl: '#' },
];

const Subscription: React.FC = () => {
  const [activePlanId, setActivePlanId] = useState('p2');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const activePlan = PLANS.find(p => p.id === activePlanId);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-tight">Gestão de Assinatura</h2>
          <p className="text-gray-500 font-medium">Controle seu plano, pagamentos e recursos da plataforma.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
           <button 
             onClick={() => setBillingCycle('monthly')}
             className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-primary'}`}
           >
             Mensal
           </button>
           <button 
             onClick={() => setBillingCycle('yearly')}
             className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-primary'}`}
           >
             Anual <span className="bg-green-100 text-green-600 px-1.5 py-0.5 rounded text-[10px]">-20%</span>
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Painel do Plano Atual */}
        <div className="lg:col-span-12">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck size={160} className="text-primary" />
             </div>
             <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                   <Zap size={40} fill="currentColor" />
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-bold text-gray-800">Plano {activePlan?.name}</h3>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-200">Ativo</span>
                   </div>
                   <p className="text-gray-500 font-medium">Próximo faturamento em 10 de Junho de 2024</p>
                </div>
             </div>
             <div className="flex flex-col items-center md:items-end gap-2 relative z-10">
                <p className="text-4xl font-black text-primary">R$ {activePlan?.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<span className="text-sm font-bold text-gray-400">/mês</span></p>
                <button className="text-primary font-bold text-sm hover:underline flex items-center gap-2">
                   Alterar método de pagamento <ChevronRight size={16} />
                </button>
             </div>
          </div>
        </div>

        {/* Escolha de Planos */}
        <div className="lg:col-span-12 space-y-6">
           <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Star size={20} className="text-yellow-500 fill-yellow-500" /> Planos JUSDATAS
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANS.map(plan => (
                <div 
                  key={plan.id}
                  className={`bg-white p-8 rounded-[40px] border transition-all flex flex-col relative ${
                    plan.id === activePlanId 
                      ? 'border-primary ring-4 ring-primary/5' 
                      : 'border-gray-100 hover:border-primary/20 shadow-sm'
                  } ${plan.isPopular ? 'shadow-xl' : ''}`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                       Mais Escolhido
                    </div>
                  )}
                  
                  <div className="mb-6">
                     <h4 className="text-lg font-bold text-gray-800">{plan.name}</h4>
                     <p className="text-gray-400 text-xs font-medium">Ideal para seu crescimento.</p>
                  </div>

                  <div className="mb-8">
                     <p className="text-3xl font-black text-gray-800">R$ {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                     <p className="text-xs text-gray-400 font-bold uppercase">por {plan.period}</p>
                  </div>

                  <div className="flex-1 space-y-4 mb-8">
                     {plan.features.map((feature, i) => (
                       <div key={i} className="flex items-start gap-3 text-sm font-medium text-gray-600">
                          <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                          {feature}
                       </div>
                     ))}
                  </div>

                  <button 
                    disabled={plan.id === activePlanId}
                    className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${
                      plan.id === activePlanId 
                        ? 'bg-gray-100 text-gray-400 cursor-default' 
                        : 'bg-primary text-white hover:bg-deepRed shadow-primary/20'
                    }`}
                  >
                    {plan.id === activePlanId ? 'Plano Atual' : 'Migrar Plano'}
                  </button>
                </div>
              ))}
           </div>
        </div>

        {/* Pagamento e Histórico */}
        <div className="lg:col-span-5 space-y-6">
           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <CreditCard size={20} className="text-primary" /> Cartões Salvos
           </h3>
           <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
              <div className="p-5 bg-secondary/30 rounded-2xl border border-primary/5 flex items-center justify-between group">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-white font-bold italic text-xs">
                       VISA
                    </div>
                    <div>
                       <p className="text-sm font-bold text-gray-800">•••• •••• •••• 4567</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Exp: 12/28 • Padrão</p>
                    </div>
                 </div>
                 <button className="p-2 text-gray-300 hover:text-primary transition-colors">
                    <MoreVertical size={18} />
                 </button>
              </div>
              <button className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-100 text-gray-400 font-bold text-sm hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center gap-2">
                 <Plus size={18} /> Adicionar Novo Cartão
              </button>
           </div>

           <div className="bg-primary text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-green-400" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Economia Anual</p>
                 </div>
                 <h4 className="text-xl font-bold">Pague anualmente e economize R$ 480,00</h4>
                 <p className="text-white/70 text-xs mt-2 font-medium">Troque seu ciclo de faturamento para o plano anual hoje mesmo.</p>
                 <button className="mt-6 bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-secondary transition-all">
                    Migrar para Anual
                 </button>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                 <Star size={120} fill="white" />
              </div>
           </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <History size={20} className="text-primary" /> Histórico de Faturamento
           </h3>
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-gray-50/50">
                       <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID Fatura</th>
                       <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Data</th>
                       <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Valor</th>
                       <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                       <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Ação</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {INVOICES.map(invoice => (
                       <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-8 py-5 text-sm font-bold text-gray-800">{invoice.id}</td>
                          <td className="px-8 py-5 text-sm font-medium text-gray-500">{invoice.date}</td>
                          <td className="px-8 py-5 text-sm font-bold text-gray-800">R$ {invoice.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                          <td className="px-8 py-5">
                             <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-green-100">
                                {invoice.status}
                             </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                             <button className="p-2 text-primary hover:bg-secondary rounded-lg transition-colors">
                                <Download size={18} />
                             </button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
              <div className="p-6 bg-gray-50/30 text-center border-t border-gray-50">
                 <button className="text-xs font-bold text-gray-400 hover:text-primary transition-colors">Ver todas as faturas anteriores</button>
              </div>
           </div>

           <div className="bg-secondary/40 p-6 rounded-[32px] border border-primary/5 flex items-start gap-4">
              <AlertCircle size={20} className="text-primary shrink-0 mt-0.5" />
              <div>
                 <p className="text-xs font-bold text-gray-800">Segurança de Dados Financeiros</p>
                 <p className="text-[11px] text-gray-500 leading-relaxed font-medium mt-1">
                    Não armazenamos dados completos de seus cartões em nossos servidores. Todos os pagamentos são processados via Gateway de pagamento seguro com certificação PCI-DSS.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
