
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  BarChart3, 
  Scale, 
  Zap, 
  Clock, 
  Globe, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Sparkles,
  LayoutDashboard,
  Menu,
  X,
  Smartphone,
  Server,
  Activity
} from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simula um delay de autenticação
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  const benefits = [
    { 
      title: "Análise Jurídica Inteligente", 
      desc: "Nossa IA processa milhões de dados jurisprudenciais para sugerir as melhores teses.", 
      icon: <Sparkles className="text-accent" size={24} /> 
    },
    { 
      title: "Monitoramento Automatizado", 
      desc: "Vigilância 24/7 sobre todos os diários oficiais e sistemas de tribunais do Brasil.", 
      icon: <Activity className="text-accent" size={24} /> 
    },
    { 
      title: "Gestão Estratégica", 
      desc: "Dashboards executivos que transformam processos em indicadores de performance.", 
      icon: <LayoutDashboard className="text-accent" size={24} /> 
    },
    { 
      title: "Conformidade LGPD", 
      desc: "Segurança de nível bancário com criptografia de ponta a ponta e total privacidade.", 
      icon: <ShieldCheck className="text-accent" size={24} /> 
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#E0E1DD] selection:bg-accent selection:text-white font-sans overflow-x-hidden">
      {/* Background Decorativo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full"></div>
      </div>

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <span className="text-[#0D1B2A] font-black text-xl">J</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white">JUSDATAS</h1>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Recursos', 'Diferenciais', 'Segurança', 'Preços'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">{item}</a>
            ))}
            <button 
              onClick={() => document.getElementById('login-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 rounded-xl border border-white/10 font-bold text-sm hover:bg-white/5 transition-all"
            >
              Acessar Conta
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest">
              <Zap size={14} fill="currentColor" /> Inteligência Jurídica v4.0 Ativa
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
              A Inteligência que <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-softBlue">Vence Processos.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-lg">
              A plataforma definitiva para análise estratégica, monitoramento unificado e automação inteligente para advogados de elite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('login-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-accent text-white rounded-[20px] font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 group"
              >
                Começar Agora <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex -space-x-3 items-center ml-4">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} className="w-12 h-12 rounded-full border-4 border-[#0D1B2A] bg-white/10" alt="Usuário" />
                ))}
                <div className="pl-6">
                  <p className="text-sm font-black text-white">+5.000</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Advogados Ativos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form de Login na Hero */}
          <div id="login-form" className="animate-slideUp">
            <div className="bg-[#1B263B]/50 backdrop-blur-2xl p-10 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                  <Lock size={120} />
               </div>
               
               <header className="mb-10 relative z-10">
                  <h3 className="text-2xl font-black text-white tracking-tight mb-2">Acesso Restrito</h3>
                  <p className="text-gray-400 text-sm font-medium">Entre com suas credenciais JUSDATAS.</p>
               </header>

               <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">E-mail Corporativo</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        required
                        type="email" 
                        placeholder="nome@escritorio.com"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#0D1B2A]/50 border border-white/5 focus:border-accent outline-none transition-all text-sm font-bold text-white"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Senha de Acesso</label>
                      <button type="button" className="text-[10px] text-accent font-bold uppercase hover:underline">Esqueci a senha</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        required
                        type="password" 
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#0D1B2A]/50 border border-white/5 focus:border-accent outline-none transition-all text-sm font-bold text-white"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full py-5 bg-white text-[#0D1B2A] rounded-2xl font-black text-lg hover:bg-softGray transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? <div className="w-6 h-6 border-4 border-[#0D1B2A]/20 border-t-[#0D1B2A] rounded-full animate-spin"></div> : "Entrar na Plataforma"}
                  </button>

                  <div className="pt-4 text-center">
                     <p className="text-xs text-gray-500 font-medium">Não tem uma conta? <button type="button" className="text-white font-bold hover:underline">Solicite uma demonstração</button></p>
                  </div>
               </form>
            </div>
            
            {/* Selos de Segurança */}
            <div className="flex items-center justify-center gap-8 mt-10 opacity-40 grayscale hover:grayscale-0 transition-all">
               <div className="flex items-center gap-2"><Lock size={16}/> <span className="text-[10px] font-black uppercase tracking-tighter">SSL 256-bit</span></div>
               <div className="flex items-center gap-2"><Server size={16}/> <span className="text-[10px] font-black uppercase tracking-tighter">Cloud Enterprise</span></div>
               <div className="flex items-center gap-2"><Smartphone size={16}/> <span className="text-[10px] font-black uppercase tracking-tighter">Cross Platform</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Problemas */}
      <section className="py-32 bg-[#1B263B]/20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
             <h2 className="text-4xl font-black text-white tracking-tight">O custo da desorganização é <span className="text-accent">fatal</span>.</h2>
             <p className="text-gray-400 font-medium text-lg">Advogados perdem em média 30% do tempo produtivo com tarefas manuais e monitoramento ineficiente. A JUSDATAS elimina esse gargalo.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Clock size={32} />, title: "Perda de Prazos", desc: "Esquecer um prazo fatal pode custar uma carreira. JUSDATAS nunca esquece." },
              { icon: <BarChart3 size={32} />, title: "Dados Fragmentados", desc: "Chega de planilhas. Tenha todos os seus processos centralizados em um único lugar." },
              { icon: <Scale size={32} />, title: "Falta de Estratégia", desc: "Pare de atuar no escuro. Use dados reais para prever decisões e riscos processuais." }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-[#1B263B]/40 rounded-[32px] border border-white/5 hover:border-accent/20 transition-all group">
                <div className="text-accent mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{item.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Solução / Mockup */}
      <section id="recursos" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-accent/20 blur-[80px] rounded-full opacity-30"></div>
              <div className="bg-[#1B263B] p-4 rounded-[40px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700">
                 <div className="bg-[#0D1B2A] rounded-[32px] overflow-hidden aspect-video relative">
                    {/* Simulação de Interface */}
                    <div className="absolute inset-0 p-8 space-y-6">
                       <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="w-24 h-4 bg-white/5 rounded-full"></div>
                       </div>
                       <div className="grid grid-cols-3 gap-4">
                          <div className="h-20 bg-accent/20 rounded-2xl animate-pulse"></div>
                          <div className="h-20 bg-white/5 rounded-2xl"></div>
                          <div className="h-20 bg-white/5 rounded-2xl"></div>
                       </div>
                       <div className="h-32 bg-white/5 rounded-[24px]"></div>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-accent rounded-xl"></div>
                          <div className="space-y-2">
                             <div className="w-32 h-2 bg-white/20 rounded-full"></div>
                             <div className="w-20 h-2 bg-white/10 rounded-full"></div>
                          </div>
                       </div>
                    </div>
                    {/* IA Overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent p-6 rounded-3xl shadow-2xl flex items-center gap-4 animate-bounce">
                       <Sparkles size={24} className="text-white"/>
                       <span className="text-white font-black text-xs uppercase tracking-widest">JUSDATAS AI Analisando...</span>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="order-1 lg:order-2 space-y-10">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                A tecnologia que o seu escritório <span className="text-accent">sempre precisou.</span>
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-6 group">
                     <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                        {benefit.icon}
                     </div>
                     <div>
                        <h4 className="text-lg font-bold text-white mb-1">{benefit.title}</h4>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">{benefit.desc}</p>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="py-32 bg-[#1B263B]/20 relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                 <p className="text-5xl font-black text-white mb-2 tracking-tighter">1.5M+</p>
                 <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Processos Monitorados</p>
              </div>
              <div>
                 <p className="text-5xl font-black text-accent mb-2 tracking-tighter">99.9%</p>
                 <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Precisão em Prazos</p>
              </div>
              <div>
                 <p className="text-5xl font-black text-white mb-2 tracking-tighter">R$ 500M+</p>
                 <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Valores Recuperados</p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-accent to-primary p-16 rounded-[48px] text-center shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:scale-110 transition-transform">
              <Scale size={300} />
           </div>
           <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">Pronto para elevar sua performance jurídica?</h2>
              <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto">Junte-se a milhares de advogados que já transformaram seus escritórios com inteligência de dados estratégica.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                 <button className="px-10 py-5 bg-white text-primary rounded-2xl font-black text-lg hover:bg-softGray transition-all shadow-xl">Começar Teste Grátis</button>
                 <button className="px-10 py-5 bg-transparent border-2 border-white/30 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all">Falar com Consultor</button>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-[#0D1B2A] font-black">J</span>
                 </div>
                 <h1 className="text-xl font-black tracking-tighter text-white">JUSDATAS</h1>
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">A inteligência que transforma dados brutos em vitórias processuais e decisões seguras.</p>
           </div>
           <div>
              <h4 className="text-white font-bold mb-6">Plataforma</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                 <li><a href="#" className="hover:text-white">Gestão de Processos</a></li>
                 <li><a href="#" className="hover:text-white">Inteligência Artificial</a></li>
                 <li><a href="#" className="hover:text-white">Prazos e Agenda</a></li>
                 <li><a href="#" className="hover:text-white">Documentos</a></li>
              </ul>
           </div>
           <div>
              <h4 className="text-white font-bold mb-6">Institucional</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                 <li><a href="#" className="hover:text-white">Sobre Nós</a></li>
                 <li><a href="#" className="hover:text-white">Carreiras</a></li>
                 <li><a href="#" className="hover:text-white">Contato</a></li>
                 <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
           </div>
           <div>
              <h4 className="text-white font-bold mb-6">Jurídico</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                 <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                 <li><a href="#" className="hover:text-white">Privacidade</a></li>
                 <li><a href="#" className="hover:text-white">LGPD Compliance</a></li>
                 <li><a href="#" className="hover:text-white">Segurança</a></li>
              </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
           <p>© 2024 JUSDATAS INC. TODOS OS DIREITOS RESERVADOS.</p>
           <div className="flex gap-8">
              <span>Linkedin</span>
              <span>Instagram</span>
              <span>Twitter (X)</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
