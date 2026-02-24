
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Folder, 
  Search, 
  Plus, 
  Upload, 
  FileSearch, 
  Loader2, 
  X, 
  Check, 
  Trash2,
  FilePlus,
  Download,
  Filter,
  ChevronRight,
  AlertCircle,
  Clock,
  HardDrive,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { MOCK_DOCUMENTS } from '../constants';
import { Document } from '../types';
import { getLegalAdvice } from '../services/geminiService';

const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);
  const [activeFolder, setActiveFolder] = useState('Todas');
  const [ocrLoading, setOcrLoading] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);
  
  // Form State para Upload
  const [uploadData, setUploadData] = useState({
    name: '',
    folder: 'Processos',
    type: 'PDF' as 'PDF' | 'DOCX' | 'IMAGE'
  });

  const folders = ['Todas', 'Processos', 'Clientes', 'Empresarial', 'Modelos'];

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesFolder = activeFolder === 'Todas' || doc.folder === activeFolder;
      const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [documents, activeFolder, search]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.name) return;

    const extension = uploadData.type === 'PDF' ? '.pdf' : uploadData.type === 'DOCX' ? '.docx' : '.png';
    const finalName = uploadData.name.toLowerCase().endsWith(extension) ? uploadData.name : uploadData.name + extension;

    const newDoc: Document = {
      id: Math.random().toString(36).substr(2, 9),
      name: finalName,
      type: uploadData.type,
      folder: uploadData.folder,
      uploadDate: new Date().toLocaleDateString('pt-BR'),
    };

    setDocuments(prev => [newDoc, ...prev]);
    setIsUploadModalOpen(false);
    setUploadData({ name: '', folder: 'Processos', type: 'PDF' });
  };

  const deleteDocument = (id: string) => {
    if (confirm('Deseja realmente excluir este documento permanentemente da nuvem JUSDATAS?')) {
      setDocuments(prev => prev.filter(d => d.id !== id));
      if (viewingDoc?.id === id) setViewingDoc(null);
    }
  };

  const simulateOCR = async (doc: Document) => {
    setOcrLoading(doc.id);
    try {
      const result = await getLegalAdvice(`Analise este documento jurídico chamado "${doc.name}". Extraia os nomes das partes, o número do processo (se houver), os valores envolvidos e faça um resumo executivo dos pontos críticos para o advogado.`);
      alert(`Extração JUSDATAS AI (OCR Inteligente):\n\n${result}`);
    } catch {
      alert('Erro ao processar OCR via motor Gemini.');
    } finally {
      setOcrLoading(null);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-8 animate-fadeIn pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Gestão de Documentos</h2>
          <p className="text-gray-500 font-medium">Repositório em nuvem com análise inteligência JUSDATAS AI.</p>
        </div>
        <div className="flex gap-3">
           <button className="hidden sm:flex bg-white text-primary border border-primary/20 px-5 py-3 rounded-2xl font-bold hover:bg-secondary transition-all shadow-sm items-center gap-2 active:scale-95">
            <Plus size={20} /> Nova Pasta
          </button>
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:bg-accent shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
          >
            <Upload size={20} /> Novo Documento
          </button>
        </div>
      </header>

      {/* Estatísticas Rápidas de Storage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <HardDrive size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Espaço Utilizado</p>
            <p className="text-lg font-black text-gray-800">2.4 GB <span className="text-xs font-medium text-gray-400">/ 50 GB</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total de Arquivos</p>
            <p className="text-lg font-black text-gray-800">{documents.length} itens</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status da Nuvem</p>
            <p className="text-lg font-black text-gray-800">Sincronizado</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Sidebar de Pastas */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2 px-2">
              <Folder size={14} /> Categorias
            </h3>
            <div className="space-y-1">
              {folders.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFolder(f)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${
                    activeFolder === f 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' 
                      : 'text-gray-500 hover:bg-secondary/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Folder size={18} className={activeFolder === f ? 'text-white' : 'text-primary/60'} fill={activeFolder === f ? 'currentColor' : 'none'} />
                    {f}
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-lg font-black ${activeFolder === f ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>
                    {f === 'Todas' ? documents.length : documents.filter(d => d.folder === f).length}
                  </span>
                </button>
              ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-2xl border-2 border-dashed border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center gap-2">
              <Plus size={14} /> Criar Pasta
            </button>
          </div>
          
          <div className="bg-accent/10 p-6 rounded-[32px] border border-accent/10">
            <h4 className="text-xs font-bold text-accent mb-2 flex items-center gap-2">
              <Sparkles size={16} /> IA Documentos
            </h4>
            <p className="text-[11px] text-accent/80 leading-relaxed font-medium">
              Envie fotos de petições ou PDFs escaneados para que nossa IA extraia as informações automaticamente.
            </p>
          </div>
        </div>

        {/* Grade de Documentos */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Pesquisar por nome do arquivo ou conteúdo..." 
                className="w-full pl-14 pr-4 py-4 rounded-[28px] bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all text-sm font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="bg-white p-4 rounded-2xl border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 transition-all shadow-sm">
              <Filter size={20} />
            </button>
          </div>

          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map(doc => (
                <div 
                  key={doc.id} 
                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-secondary/50 rounded-2xl text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <FileText size={30} />
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => simulateOCR(doc)}
                        title="IA OCR"
                        className="p-2.5 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        {ocrLoading === doc.id ? <Loader2 size={18} className="animate-spin" /> : <FileSearch size={18} />}
                      </button>
                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        className="p-2.5 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-primary transition-colors pr-4">{doc.name}</h4>
                    <div className="flex items-center gap-3 mt-1.5">
                       <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-wider ${
                         doc.type === 'PDF' ? 'bg-red-50 text-red-500 border-red-100' : 
                         doc.type === 'DOCX' ? 'bg-blue-50 text-blue-500 border-blue-100' : 
                         'bg-yellow-50 text-yellow-600 border-yellow-100'
                       }`}>
                         {doc.type}
                       </span>
                       <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{doc.folder}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                       <Clock size={12} /> {doc.uploadDate}
                    </div>
                    <button 
                      onClick={() => setViewingDoc(doc)}
                      className="text-xs font-black text-primary hover:underline flex items-center gap-1.5 group/btn"
                    >
                      Visualizar <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <FileText size={40} />
              </div>
              <h3 className="text-gray-400 font-bold text-xl">Nenhum documento encontrado</h3>
              <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">Sua biblioteca está vazia nesta categoria ou a busca não retornou resultados.</p>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="mt-8 text-primary font-bold text-sm hover:underline flex items-center gap-2 mx-auto"
              >
                <Plus size={16} /> Fazer upload agora
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal / Popup de Novo Documento */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsUploadModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-slideUp">
            <header className="bg-primary p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Upload size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Novo Documento</h3>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-widest">Upload Seguro em Nuvem</p>
                </div>
              </div>
              <button onClick={() => setIsUploadModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </header>

            <form onSubmit={handleUpload} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Título do Documento</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  placeholder="Ex: Petição Inicial - Caso Silva..."
                  className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold"
                  value={uploadData.name}
                  onChange={e => setUploadData({...uploadData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Destino (Pasta)</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                    value={uploadData.folder}
                    onChange={e => setUploadData({...uploadData, folder: e.target.value})}
                  >
                    {folders.filter(f => f !== 'Todas').map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Formato do Arquivo</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-secondary/30 border border-transparent focus:border-primary/30 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
                    value={uploadData.type}
                    onChange={e => setUploadData({...uploadData, type: e.target.value as Document['type']})}
                  >
                    <option value="PDF">Documento PDF</option>
                    <option value="DOCX">Microsoft Word (DOCX)</option>
                    <option value="IMAGE">Imagem / Scan (JPG/PNG)</option>
                  </select>
                </div>
              </div>

              {/* Área de Seleção de Arquivo */}
              <div className="border-2 border-dashed border-primary/20 bg-secondary/20 rounded-[32px] p-10 flex flex-col items-center justify-center text-center group hover:bg-secondary/40 hover:border-primary/40 transition-all cursor-pointer">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <FilePlus size={28} />
                 </div>
                 <p className="text-sm font-bold text-primary/80">Clique ou arraste arquivos aqui</p>
                 <p className="text-[10px] text-gray-400 mt-2 uppercase font-black tracking-widest">Limite de 50MB • Criptografia AES-256</p>
              </div>

              <div className="bg-secondary/40 p-6 rounded-[32px] border border-primary/5 flex items-start gap-4">
                 <AlertCircle size={20} className="text-primary shrink-0 mt-0.5" />
                 <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                   Ao finalizar o upload, nosso motor de IA começará a indexar o conteúdo para facilitar suas buscas globais.
                 </p>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 px-6 py-5 rounded-2xl border border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-all text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-[2] bg-primary text-white px-6 py-5 rounded-2xl font-bold hover:bg-accent shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 text-sm group"
                >
                  <Check size={20} strokeWidth={4} className="group-hover:scale-110 transition-transform" /> 
                  Confirmar Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Viewer Modal (Simulado) */}
      {viewingDoc && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-xl" onClick={() => setViewingDoc(null)}></div>
          <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
             <header className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10 shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
                      <FileText size={24} />
                   </div>
                   <div>
                      <h3 className="font-bold text-gray-800">{viewingDoc.name}</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Modo Visualização • Nuvem JUSDATAS</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <button 
                     onClick={() => simulateOCR(viewingDoc)}
                     className="px-4 py-2 bg-accent/10 text-accent rounded-xl text-xs font-bold hover:bg-accent hover:text-white transition-all flex items-center gap-2"
                   >
                     <Sparkles size={14} /> Analisar com IA
                   </button>
                   <button className="p-2.5 bg-secondary/50 text-primary rounded-xl hover:bg-secondary transition-all">
                      <Download size={20} />
                   </button>
                   <button 
                     onClick={() => setViewingDoc(null)}
                     className="p-2.5 text-gray-400 hover:text-primary transition-all"
                   >
                      <X size={24} />
                   </button>
                </div>
             </header>
             <div className="flex-1 bg-softGray/50 p-12 overflow-y-auto flex flex-col items-center custom-scrollbar">
                {/* Placeholder para o documento */}
                <div className="w-full max-w-3xl bg-white aspect-[1/1.4] shadow-2xl rounded-sm p-16 border border-gray-200">
                   <div className="h-4 w-1/3 bg-gray-100 mb-8"></div>
                   <div className="space-y-4">
                      <div className="h-3 w-full bg-gray-50"></div>
                      <div className="h-3 w-full bg-gray-50"></div>
                      <div className="h-3 w-4/5 bg-gray-50"></div>
                      <div className="h-3 w-full bg-gray-50"></div>
                   </div>
                   <div className="h-40 w-full bg-gray-50/50 mt-20 border-2 border-dashed border-gray-100 flex items-center justify-center">
                      <p className="text-gray-300 font-black italic text-4xl opacity-20 rotate-[-15deg]">JUSDATAS DOCUMENT VIEW</p>
                   </div>
                   <div className="mt-20 space-y-4">
                      <div className="h-3 w-full bg-gray-50"></div>
                      <div className="h-3 w-full bg-gray-50"></div>
                      <div className="h-3 w-3/4 bg-gray-50"></div>
                   </div>
                </div>
                <p className="mt-8 text-gray-400 text-xs font-bold uppercase tracking-widest">Fim do Documento</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;
