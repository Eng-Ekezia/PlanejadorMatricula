// src/types/index.ts

export interface Subject {
  id: string;
  name: string;
  abbr: string; // Abreviatura (ex: CDI 1)
  period: number;
  prereqs: string[]; // Lista de IDs
  coreqs: string[]; // Lista de IDs
  hours: number;
  credits: number;
  minCredits?: number; // Opcional, para matérias como estágio/TCC
}

export interface Course {
  id: string; // ex: 'civil', 'energia'
  name: string; // Nome legível do curso
  subjects: Subject[];
}

export interface StudentProgress {
  plannedIds: string[];
  completedIds: string[];
}