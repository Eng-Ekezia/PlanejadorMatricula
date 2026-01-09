// src/types/index.ts

export interface Subject {
  id: string;
  nome: string;           // Antes: name
  codigo: string;         // Usaremos como sigla/abreviação
  periodo: number;        // Antes: period
  pre_requisitos: string[]; // Antes: prereqs
  co_requisitos: string[];  // Antes: coreqs
  carga_horaria: number;  // Antes: hours
  creditos: number;       // Antes: credits
  
  // Campos opcionais que podem ou não existir no JSON
  tipo?: string; 
  eixo?: string;
}

export interface Course {
  id: string;
  name: string; // Este nome nós geramos baseado no nome do arquivo
  subjects: Subject[];
}