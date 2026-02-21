
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

const CashFlow: React.FC = () => {
  const data = [
    { name: 'Jan', receitas: 4000, despesas: 2400, saldo: 1600 },
    { name: 'Fev', receitas: 3000, despesas: 1398, saldo: 1602 },
    { name: 'Mar', receitas: 2000, despesas: 9800, saldo: -7800 },
    { name: 'Abr', receitas: 2780, despesas: 3908, saldo: -1128 },
    { name: 'Mai', receitas: 1890, despesas: 4800, saldo: -2910 },
    { name: 'Jun', receitas: 2390, despesas: 3800, saldo: -1410 },
    { name: 'Jul', receitas: 3490, despesas: 4300, saldo: -810 },
  ];

  const stats = [
    { label: 'Total Receitas', value: 'R$ 25.400', icon: <TrendingUp className="text-green-500" />, trend: '+12%' },
    { label: 'Total Despesas', value: 'R$ 18.200', icon: <TrendingDown className="text-red-500" />, trend: '+5%' },
    { label: 'Saldo Acumulado', value: 'R$ 7.200', icon: <DollarSign className="text-primary" />, trend: '+8%' },
    { label: 'Projeção Próximo Mês', value: 'R$ 8.500', icon: <Calendar className="text-accent" />, trend: '+15%' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <header>
        <h2 className="text-3xl font-black text-primary tracking-tight">Fluxo de Caixa</h2>
        <p className="text-gray-500 font-medium">Visualize a saúde financeira do seu escritório em tempo real.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-secondary/30 rounded-2xl">
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-primary">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <h3 className="text-lg font-black text-primary mb-8">Receitas vs Despesas</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f3f4f6' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="receitas" fill="#2E446B" radius={[4, 4, 0, 0]} name="Receitas" />
                <Bar dataKey="despesas" fill="#2C5F9E" radius={[4, 4, 0, 0]} name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <h3 className="text-lg font-black text-primary mb-8">Evolução do Saldo</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E446B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2E446B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="saldo" stroke="#2E446B" strokeWidth={3} fillOpacity={1} fill="url(#colorSaldo)" name="Saldo" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlow;
