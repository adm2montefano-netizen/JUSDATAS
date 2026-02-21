
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  Search,
  LayoutDashboard,
  Scale,
  Clock,
  FileText,
  Globe,
  MessageSquare,
  Calendar as CalendarIcon,
  StickyNote,
  UserPlus,
  Link2,
  CreditCard,
  LogOut
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProcessList from './components/ProcessList';
import AIAgent from './components/AIAgent';
import LawComparator from './components/LawComparator';
import Correspondent from './components/Correspondent';
import DeadlineList from './components/DeadlineList';
import DocumentManager from './components/DocumentManager';
import Agenda from './components/Agenda';
import NotesManager from './components/NotesManager';
import Integrations from './components/Integrations';
import Subscription from './components/Subscription';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificação de autenticação ao carregar o app
  useEffect(() => {
    const auth = localStorage.getItem('jusdatas_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('jusdatas_auth', 'true');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    // Diálogo de confirmação para evitar cliques acidentais
    if (confirm('Deseja realmente encerrar sua sessão na plataforma JUSDATAS?')) {
      setIsAuthenticated(false);
      localStorage.removeItem('jusdatas_auth');
      setIsMobileMenuOpen(false);
      // Redireciona para o topo da landing page ao deslogar
      window.scrollTo(0, 0);
    }
  };

  // Se não estiver autenticado, exibe apenas a Landing Page
  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'processes': return <ProcessList />;
      case 'deadlines': return <DeadlineList />;
      case 'documents': return <DocumentManager />;
      case 'ai': return <AIAgent />;
      case 'comparative': return <LawComparator />;
      case 'correspondent': return <Correspondent />;
      case 'agenda': return <Agenda />;
      case 'notes': return <NotesManager />;
      case 'integrations': return <Integrations />;
      case 'subscription': return <Subscription />;
      default: return <Dashboard />;
    }
  };

  const mobileNavItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'processes', icon: <Scale size={20} /> },
    { id: 'ai', icon: <MessageSquare size={20} /> },
    { id: 'deadlines', icon: <Clock size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-secondary text-gray-900 overflow-hidden font-sans animate-fadeIn">
      {/* Sidebar Desktop */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 flex flex-col min-w-0 bg-softGray md:rounded-l-[40px] shadow-2xl relative overflow-hidden transition-all duration-500">
        {/* Navbar Superior */}
        <header className="h-20 bg-white/60 backdrop-blur-xl flex items-center justify-between px-6 border-b border-white/20 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-xl transition-all" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Busca global JUSDATAS..." 
                className="pl-10 pr-4 py-2 bg-secondary/30 rounded-full text-xs outline-none focus:ring-2 focus:ring-primary/20 w-80 transition-all font-medium border border-transparent focus:border-white/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white shadow-sm"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-800">Dr. Ricardo Almeida</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Advogado Sócio</p>
              </div>
              {/* Botão de Logout Rápido na Navbar */}
              <button 
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-md hover:bg-red-500 hover:scale-105 active:scale-95 transition-all group"
                title="Sair do Sistema"
              >
                <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        {/* Área de Scroll Dinâmica */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar scroll-smooth">
          {renderContent()}
        </div>

        {/* Navegação Inferior Mobile */}
        <nav className="md:hidden h-16 bg-white/80 backdrop-blur-lg border-t border-gray-100 flex items-center justify-around px-2 pb-safe">
          {mobileNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all ${
                activeTab === item.id ? 'text-primary scale-110 font-bold' : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-[9px] font-black uppercase tracking-tighter">{item.id}</span>
            </button>
          ))}
          <button 
            className="flex flex-col items-center justify-center text-gray-400"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Mais</span>
          </button>
        </nav>

        {/* Botão Flutuante IA */}
        {activeTab !== 'ai' && (
          <button 
            onClick={() => setActiveTab('ai')}
            className="fixed bottom-24 right-6 md:bottom-12 md:right-12 w-16 h-16 bg-accent text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <MessageSquare size={28} className="relative z-10 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow-sm animate-bounce">IA</div>
          </button>
        )}
      </main>

      {/* Menu Lateral Mobile (Overlay) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-all" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute left-0 top-0 h-full w-4/5 max-w-xs bg-primary p-6 animate-slideRight shadow-2xl flex flex-col" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-primary font-black text-lg">J</span>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tighter">JUSDATAS</h1>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-1 flex-1 overflow-y-auto custom-scrollbar">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
                { id: 'processes', label: 'Processos', icon: <Scale size={20} /> },
                { id: 'deadlines', label: 'Prazos', icon: <Clock size={20} /> },
                { id: 'documents', label: 'Documentos', icon: <FileText size={20} /> },
                { id: 'ai', label: 'IA Agente', icon: <MessageSquare size={20} /> },
                { id: 'comparative', label: 'Direito Comparado', icon: <Globe size={20} /> },
                { id: 'agenda', label: 'Agenda', icon: <CalendarIcon size={20} /> },
                { id: 'notes', label: 'Anotações', icon: <StickyNote size={20} /> },
                { id: 'correspondent', label: 'Correspondente', icon: <UserPlus size={20} /> },
                { id: 'integrations', label: 'Integrações', icon: <Link2 size={20} /> },
                { id: 'subscription', label: 'Assinatura', icon: <CreditCard size={20} /> },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-bold transition-all ${
                    activeTab === item.id ? 'bg-white text-primary shadow-xl' : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </nav>

            {/* Rodapé do Menu Mobile com Botão de Sair */}
            <div className="pt-6 border-t border-white/10 mt-4">
               <div className="flex items-center gap-3 px-4 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs">RA</div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">Ricardo Almeida</p>
                    <p className="text-[10px] text-white/40 font-medium">OAB/SP 123.456</p>
                  </div>
               </div>
               <button 
                 onClick={handleLogout}
                 className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-black text-red-400 hover:bg-red-500/20 transition-all border border-red-500/10"
               >
                 <LogOut size={20} /> Sair do Sistema
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Estilos Globais para Animações */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideRight { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slideRight { animation: slideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
    </div>
  );
};

export default App;
