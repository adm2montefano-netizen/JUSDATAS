
import React from 'react';
import { LogOut, Settings, HelpCircle } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-primary text-white h-screen shadow-2xl z-30">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
          <span className="text-primary font-black text-xl">J</span>
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tighter">JUSDATAS</h1>
          <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] -mt-1">Intelligent Law</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-secondary text-primary font-bold shadow-xl translate-x-2' 
                : 'hover:bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            <div className={`${activeTab === item.id ? 'scale-110' : ''} transition-transform`}>
              {item.icon}
            </div>
            <span className="text-xs font-semibold tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-4">
        {/* Atalhos Rápidos */}
        <div className="flex justify-around px-2 text-white/40">
           <button className="hover:text-white transition-colors" title="Configurações"><Settings size={18} /></button>
           <button className="hover:text-white transition-colors" title="Ajuda"><HelpCircle size={18} /></button>
           <button 
             onClick={onLogout} 
             className="text-white/40 hover:text-red-400 transition-all hover:scale-110 active:scale-90" 
             title="Sair do Sistema"
           >
              <LogOut size={18} />
           </button>
        </div>

        {/* Perfil do Usuário com Logout Integrado */}
        <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3 border border-white/5 hover:border-white/10 transition-all cursor-pointer group relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
            RA
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold truncate">Dr. Ricardo Almeida</p>
            <p className="text-[9px] text-white/40 font-medium">OAB/SP 123.456</p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onLogout();
            }}
            className="absolute right-2 opacity-0 group-hover:opacity-100 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
            title="Sair"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
