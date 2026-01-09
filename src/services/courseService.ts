// src/services/courseService.ts
import type { Course, Subject } from '../types';

// Importa todos os JSONs da pasta ../data
const courseFiles = import.meta.glob('../data/*.json', { eager: true });

export const getAvailableCourses = (): Course[] => {
  const courses: Course[] = [];

  for (const path in courseFiles) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawModule = courseFiles[path] as any;
    
    // 1. Tenta obter os dados (pode vir no 'default' ou direto, dependendo do Vite)
    let data = rawModule.default || rawModule;

    const fileName = path.split('/').pop()?.replace('.json', '') || 'Curso Desconhecido';
    
    // Log de Diagnóstico: Mostra no console exatamente o que foi lido
    console.groupCollapsed(`🔍 Analisando arquivo: ${fileName}`);
    console.log('Conteúdo Bruto:', data);

    // 2. CORREÇÃO DE ROBUSTEZ:
    // Se 'data' não for um array, procuramos se existe algum array dentro dele.
    // Isso resolve casos onde o JSON é { "subjects": [...] } ou { "matriz": [...] }
    if (!Array.isArray(data) && typeof data === 'object' && data !== null) {
        console.warn('O conteúdo raiz não é um array. Procurando array interno...');
        const values = Object.values(data);
        // Pega o primeiro valor que seja um Array
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundArray = values.find((val: any) => Array.isArray(val));
        
        if (foundArray) {
            console.log('Array interno encontrado e promovido a dados principais.');
            data = foundArray;
        }
    }

    console.log('É Array válido?', Array.isArray(data));
    console.groupEnd();

    // 3. Processamento Normal
    const cleanName = fileName
      .replace('Matriz_atualizada_completa_', '')
      .replace(/_/g, ' ');

    if (Array.isArray(data)) {
      courses.push({
        id: fileName,
        name: `Engenharia ${cleanName}`,
        subjects: data as Subject[]
      });
    } else {
      console.error(`ERRO CRÍTICO: O arquivo ${fileName} não possui uma lista de matérias identificável.`);
    }
  }

  return courses;
};

export const getCourseById = (id: string): Course | undefined => {
  const courses = getAvailableCourses();
  return courses.find(c => c.id === id);
};