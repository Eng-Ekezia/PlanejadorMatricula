import type { Course, Subject } from '../types';

const courseFiles = import.meta.glob('../data/*.json', { eager: true });

export const getAvailableCourses = (): Course[] => {
  const courses: Course[] = [];

  for (const path in courseFiles) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawModule = courseFiles[path] as any;
    let rawData = rawModule.default || rawModule;
    
    // Tenta pegar o número de períodos da raiz
    let totalPeriods = rawData.totalPeriods || 0; 

    // Lógica de extração do array de cursos (lidando com diferentes estruturas)
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
      // MAPEAMENTO ROBUSTO: JSON -> Aplicação
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const subjects: Subject[] = rawData.map((s: any) => ({
        id: s.id,
        nome: s.nome,
        codigo: s.Sigla,                       // JSON: Sigla -> App: codigo
        periodo: s.periodo,
        pre_requisitos: s.prerequisitos || [], // JSON: prerequisitos -> App: pre_requisitos
        co_requisitos: s.corequisitos || [],   // JSON: corequisitos -> App: co_requisitos
        carga_horaria: s.horas,                // JSON: horas (Relógio) -> App: carga_horaria
        horas_aula: parseInt(s.ch?.replace('h', '') || '0'), // JSON: ch ("90h") -> App: horas_aula (90)
        creditos: s.creditos,
        tipo: s.tipo,
        eixo: s.eixo
      }));
      
      // Fallback para totalPeriods se não veio no JSON
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