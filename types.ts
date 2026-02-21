
export type ProcessStatus = 'Ativo' | 'Em Andamento' | 'Arquivado' | 'Suspenso' | 'Recurso';
export type Priority = 'Baixa' | 'Média' | 'Alta' | 'Urgente';

export interface Process {
  id: string;
  number: string;
  parties: string;
  court: string;
  subject: string;
  value: number;
  status: ProcessStatus;
  progress: number;
  distributionDate: string;
}

export interface Deadline {
  id: string;
  processId?: string;
  title: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  source?: 'Manual' | 'Integração';
  court?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'IMAGE';
  folder: string;
  uploadDate: string;
  content?: string;
}

export interface CorrespondentDemand {
  id: string;
  officeName: string;
  subject: string;
  fee: number;
  dueDate: string;
  status: 'Pendente' | 'Concluída' | 'Paga';
}

export interface Note {
  id: string;
  processId?: string;
  title: string;
  content: string;
  isPinned: boolean;
  date: string;
}

export interface CourtIntegration {
  id: string;
  state: string;
  court: string;
  isActive: boolean;
  lastSync?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'mês' | 'ano';
  features: string[];
  isPopular?: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Pago' | 'Pendente' | 'Cancelado';
  downloadUrl: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string; // CPF/CNPJ
  address: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  fee: number;
  category: string;
}

export interface Receipt {
  id: string;
  clientName: string;
  amount: number;
  date: string;
  description: string;
  serviceId?: string;
}

export interface Purchase {
  id: string;
  supplier: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'Receita' | 'Despesa';
  description: string;
  amount: number;
  date: string;
  category: string;
  status: 'Pago' | 'Pendente';
}
