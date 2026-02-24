
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// Add Clock to the imports from lucide-react
import { TrendingUp, AlertCircle, FileCheck, Users, ArrowUpRight, Clock } from 'lucide-react';
import { MOCK_PROCESSES, MOCK_DEADLINES } from '../constants';

const data = [
  { name: 'Seg', qty: 4 },
  { name: 'Ter', qty: 7 },
  { name: 'Qua', qty: 5 },
  { name: 'Qui', qty: 8 },
  { name: 'Sex', qty: 6 },
];

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, trend }) => (
  <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-xl transition-all group">
    <div className="flex justify-between items-start">
      <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
          <ArrowUpRight size={10} /> {trend}
        </span>
      )}
    </div>
    <div>
      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{label}</span>
      <p className="text-3xl font-black text-primary tracking-tight">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-3xl font-black text-primary tracking-tight">Insights Diários</h2>
        <p className="text-gray-500 font-medium">Bem-vindo de volta! Aqui está a inteligência do seu escritório hoje.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<TrendingUp size={22} />} 
          label="Processos Ativos" 
          value={MOCK_PROCESSES.length} 
          color="bg-primary" 
          trend="+12%"
        />
        <StatCard 
          icon={<AlertCircle size={22} />} 
          label="Prazos Pendentes" 
          value={MOCK_DEADLINES.filter(d => !d.completed).length} 
          color="bg-accent" 
        />
        <StatCard 
          icon={<FileCheck size={22} />} 
          label="Audiências Hoje" 
          value="02" 
          color="bg-deepPrimary" 
          trend="Novo"
        />
        <StatCard 
          icon={<Users size={22} />} 
          label="Clientes Novos" 
          value="05" 
          color="bg-slate-400" 
          trend="+5"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-primary mb-8 flex items-center gap-2">
            <TrendingUp size={18} className="text-accent"/> Produtividade Semanal
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip cursor={{ fill: '#F2F4F6' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="qty" fill="#2E446B" radius={[10, 10, 10, 10]} barSize={35}>
                   {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#2C5F9E' : '#2E446B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-primary">Próximos Prazos</h3>
            <span className="p-2 bg-secondary/50 text-primary rounded-xl"><Clock size={16}/></span>
          </div>
          <div className="space-y-4">
            {MOCK_DEADLINES.map(d => (
              <div key={d.id} className="flex items-center gap-4 p-4 rounded-[24px] bg-softGray hover:bg-secondary/20 transition-colors border border-transparent hover:border-primary/10 cursor-pointer">
                <div className={`w-2 h-10 rounded-full ${
                  d.priority === 'Urgente' ? 'bg-accent' : 'bg-primary/30'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800 line-clamp-1">{d.title}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{new Date(d.dueDate).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                  d.priority === 'Urgente' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                }`}>
                  {d.priority}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-secondary/50 text-primary rounded-2xl text-xs font-bold hover:bg-primary hover:text-white transition-all">
            Visualizar Agenda Completa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
