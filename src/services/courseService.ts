// src/services/courseService.ts
import type { Course, Subject } from '../types';

const courseFiles = import.meta.glob('../data/*.json', { eager: true });

export const getAvailableCourses = (): Course[] => {
  const courses: Course[] = [];

  for (const path in courseFiles) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawModule = courseFiles[path] as any;
    let rawData = rawModule.default || rawModule;

    // Lógica apenas para extrair o array de dentro do envelope "courses": [...]
    // Isso mantém a validação básica, mas sem alterar os nomes das chaves.
    if (!Array.isArray(rawData) && rawData.courses && Array.isArray(rawData.courses)) {
        rawData = rawData.courses;
    } else if (!Array.isArray(rawData) && typeof rawData === 'object') {
        // Fallback: procura qualquer array dentro do objeto
        const values = Object.values(rawData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundArray = values.find((val: any) => Array.isArray(val));
        if (foundArray) rawData = foundArray;
    }

    const fileName = path.split('/').pop()?.replace('.json', '') || 'Curso Desconhecido';
    const cleanName = fileName.replace('Matriz_atualizada_completa_', '').replace(/_/g, ' ');

    if (Array.isArray(rawData)) {
      courses.push({
        id: fileName,
        name: `Engenharia ${cleanName}`,
        subjects: rawData as Subject[] // O TypeScript agora garante que o JSON bate com a interface
      });
    } else {
      console.error(`O arquivo ${fileName} não possui um array de matérias válido.`);
    }
  }

  return courses;
};

export const getCourseById = (id: string): Course | undefined => {
  const courses = getAvailableCourses();
  return courses.find(c => c.id === id);
};