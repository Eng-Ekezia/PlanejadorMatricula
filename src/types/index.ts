export interface Subject {
  id: string;
  nome: string;           
  codigo: string;         // Mapeado de "Sigla"
  periodo: number;        
  pre_requisitos: string[]; // Mapeado de "prerequisitos"
  co_requisitos: string[];  // Mapeado de "corequisitos"
  carga_horaria: number;  // Mapeado de "horas" (Relógio)
  horas_aula: number;     // Mapeado de "ch" (Acadêmica)
  creditos: number;       
  
  tipo?: string; 
  eixo?: string;
}

export interface Course {
  id: string;
  name: string; 
  totalPeriods: number; 
  subjects: Subject[];
}