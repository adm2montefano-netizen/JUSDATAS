
import React from 'react';
import { 
  LayoutDashboard, 
  Scale, 
  Clock, 
  FileText, 
  Globe, 
  MessageSquare, 
  Calendar, 
  StickyNote, 
  UserPlus, 
  Link2,
  CreditCard,
  Users,
  Briefcase,
  Receipt as ReceiptIcon,
  ShoppingCart,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { Process, Deadline, Document, Note, CorrespondentDemand, CourtIntegration } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'processes', label: 'Processos', icon: <Scale size={20} /> },
  { id: 'clients', label: 'Clientes', icon: <Users size={20} /> },
  { id: 'services', label: 'Serviços', icon: <Briefcase size={20} /> },
  { id: 'financial', label: 'Financeiro', icon: <DollarSign size={20} /> },
  { id: 'cashflow', label: 'Fluxo de Caixa', icon: <TrendingUp size={20} /> },
  { id: 'receipts', label: 'Recibos', icon: <ReceiptIcon size={20} /> },
  { id: 'purchases', label: 'Compras', icon: <ShoppingCart size={20} /> },
  { id: 'deadlines', label: 'Prazos', icon: <Clock size={20} /> },
  { id: 'documents', label: 'Documentos', icon: <FileText size={20} /> },
  { id: 'comparative', label: 'Direito Comparado', icon: <Globe size={20} /> },
  { id: 'ai', label: 'IA Agente', icon: <MessageSquare size={20} /> },
  { id: 'agenda', label: 'Agenda', icon: <Calendar size={20} /> },
  { id: 'notes', label: 'Anotações', icon: <StickyNote size={20} /> },
  { id: 'correspondent', label: 'Correspondente', icon: <UserPlus size={20} /> },
  { id: 'integrations', label: 'Integrações', icon: <Link2 size={20} /> },
  { id: 'subscription', label: 'Assinatura', icon: <CreditCard size={20} /> },
];

export const MOCK_PROCESSES: Process[] = [
  { id: '1', number: '1023456-78.2023.8.26.0100', parties: 'João Silva vs. Banco S.A.', court: 'TJSP', subject: 'Danos Morais', value: 50000, status: 'Ativo', progress: 65, distributionDate: '2023-01-15' },
  { id: '2', number: '5049382-12.2022.4.03.6100', parties: 'Maria Oliveira vs. União', court: 'TRF3', subject: 'Previdenciário', value: 120000, status: 'Recurso', progress: 85, distributionDate: '2022-06-20' },
  { id: '3', number: '0039281-44.2024.5.02.0001', parties: 'Empresa X vs. Carlos Lima', court: 'TRT2', subject: 'Trabalhista', value: 35000, status: 'Suspenso', progress: 30, distributionDate: '2024-02-10' },
];

export const MOCK_DEADLINES: Deadline[] = [
  { id: 'd1', processId: '1', title: 'Réplica à Contestação', dueDate: '2024-05-20T23:59:00', priority: 'Urgente', completed: false, source: 'Integração', court: 'TJSP' },
  { id: 'd2', processId: '2', title: 'Prazo Recursal', dueDate: '2024-05-15T23:59:00', priority: 'Alta', completed: false, source: 'Integração', court: 'TRF3' },
  { id: 'd3', title: 'Assinatura Contrato Cliente Y', dueDate: '2024-05-25T18:00:00', priority: 'Média', completed: false, source: 'Manual' },
];

export const BRAZIL_STATES = [
  { acr: 'AC', name: 'Acre' }, { acr: 'AL', name: 'Alagoas' }, { acr: 'AP', name: 'Amapá' },
  { acr: 'AM', name: 'Amazonas' }, { acr: 'BA', name: 'Bahia' }, { acr: 'CE', name: 'Ceará' },
  { acr: 'DF', name: 'Distrito Federal' }, { acr: 'ES', name: 'Espírito Santo' }, { acr: 'GO', name: 'Goiás' },
  { acr: 'MA', name: 'Maranhão' }, { acr: 'MT', name: 'Mato Grosso' }, { acr: 'MS', name: 'Mato Grosso do Sul' },
  { acr: 'MG', name: 'Minas Gerais' }, { acr: 'PA', name: 'Pará' }, { acr: 'PB', name: 'Paraíba' },
  { acr: 'PR', name: 'Paraná' }, { acr: 'PE', name: 'Pernambuco' }, { acr: 'PI', name: 'Piauí' },
  { acr: 'RJ', name: 'Rio de Janeiro' }, { acr: 'RN', name: 'Rio Grande do Norte' }, { acr: 'RS', name: 'Rio Grande do Sul' },
  { acr: 'RO', name: 'Rondônia' }, { acr: 'RR', name: 'Roraima' }, { acr: 'SC', name: 'Santa Catarina' },
  { acr: 'SP', name: 'São Paulo' }, { acr: 'SE', name: 'Sergipe' }, { acr: 'TO', name: 'Tocantins' }
];

export const MOCK_INTEGRATIONS: CourtIntegration[] = [
  { id: 'int1', state: 'SP', court: 'TJSP', isActive: true, lastSync: '2024-05-15 10:30' },
  { id: 'int2', state: 'RJ', court: 'TJRJ', isActive: false },
  { id: 'int3', state: 'MG', court: 'TJMG', isActive: true, lastSync: '2024-05-14 15:00' },
];

export const MOCK_DOCUMENTS: Document[] = [
  { id: 'doc1', name: 'Petição Inicial.pdf', type: 'PDF', folder: 'Processos', uploadDate: '2024-01-01' },
  { id: 'doc2', name: 'Procuração.pdf', type: 'PDF', folder: 'Clientes', uploadDate: '2024-01-05' },
  { id: 'doc3', name: 'Contrato_Social.pdf', type: 'PDF', folder: 'Empresarial', uploadDate: '2023-12-15' },
];

export const MOCK_DEMANDS: CorrespondentDemand[] = [
  { id: 'dem1', officeName: 'Escritório Almeida & Associados', subject: 'Audiência de Conciliação', fee: 250, dueDate: '2024-06-01', status: 'Pendente' },
  { id: 'dem2', officeName: 'Oliveira Advogados', subject: 'Protocolo de Petição', fee: 100, dueDate: '2024-05-28', status: 'Concluída' },
];

export const MOCK_NOTES: Note[] = [
  { id: 'n1', title: 'Estratégia Caso João Silva', content: 'Focar na tese de responsabilidade objetiva conforme CDC.', isPinned: true, date: '2024-05-10' },
  { id: 'n2', title: 'Lembrete Reunião', content: 'Trazer cópia do RG do sócio majoritário.', isPinned: false, date: '2024-05-12' },
];
