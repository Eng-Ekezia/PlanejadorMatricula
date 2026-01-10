import type { Course, Subject } from '../types';

const courseFiles = import.meta.glob('../data/*.json', { eager: true });

export const getAvailableCourses = (): Course[] => {
  const courses: Course[] = [];

  for (const path in courseFiles) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawModule = courseFiles[path] as any;
    let rawData = rawModule.default || rawModule;
    
    // Tenta pegar o número de períodos da raiz antes de navegar para 'courses'
    let totalPeriods = rawData.totalPeriods || 10; // Default 10 se falhar

    // Lógica de extração do array (mesma de antes)
    if (!Array.isArray(rawData) && rawData.courses && Array.isArray(rawData.courses)) {
        rawData = rawData.courses;
    } else if (!Array.isArray(rawData) && typeof rawData === 'object') {
        const values = Object.values(rawData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundArray = values.find((val: any) => Array.isArray(val));
        if (foundArray) rawData = foundArray;
    }

    const fileName = path.split('/').pop()?.replace('.json', '') || 'Curso Desconhecido';
    const cleanName = fileName.replace('Matriz_atualizada_completa_', '').replace(/_/g, ' ');

    if (Array.isArray(rawData)) {
      const subjects = rawData as Subject[];
      
      // Fallback: Se não achou totalPeriods na raiz, calcula pelo maior período nas matérias
      if (!totalPeriods) {
        totalPeriods = subjects.reduce((max, s) => Math.max(max, s.periodo || 0), 0) || 10;
      }

      courses.push({
        id: fileName,
        name: `Engenharia ${cleanName}`,
        totalPeriods: Number(totalPeriods),
        subjects: subjects
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