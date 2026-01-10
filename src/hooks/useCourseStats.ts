import { useMemo } from 'react';
import { useCourseStore } from '@/store/useCourseStore';
import type { Course, Subject } from '@/types';

interface CourseStats {
  completed: {
    hours: number;
    credits: number;
    count: number;
  };
  planned: {
    hours: number;
    credits: number;
    count: number;
  };
  progressPercentage: number;
}

export function useCourseStats(course: Course | undefined) {
  const { completedIds, plannedIds } = useCourseStore();

  const stats = useMemo<CourseStats>(() => {
    const initialStats = {
      completed: { hours: 0, credits: 0, count: 0 },
      planned: { hours: 0, credits: 0, count: 0 },
      progressPercentage: 0,
    };

    if (!course) return initialStats;

    // Helper para somar
    const accumulate = (target: 'completed' | 'planned', subject: Subject) => {
      initialStats[target].hours += subject.carga_horaria;
      initialStats[target].credits += subject.creditos;
      initialStats[target].count += 1;
    };

    course.subjects.forEach((subject) => {
      if (completedIds.includes(subject.id)) {
        accumulate('completed', subject);
      } else if (plannedIds.includes(subject.id)) {
        accumulate('planned', subject);
      }
    });

    // Cálculo simples de progresso (baseado em horas totais do curso seria o ideal, 
    // mas aqui faremos uma estimativa ou usaremos o total somado se disponível no JSON)
    // Para simplificar agora: 3600h é uma estimativa de curso de engenharia, 
    // mas idealmente somaríamos todas as matérias do curso.
    const totalCourseHours = course.subjects.reduce((acc, s) => acc + s.carga_horaria, 0);
    initialStats.progressPercentage = totalCourseHours > 0 
      ? Math.round((initialStats.completed.hours / totalCourseHours) * 100) 
      : 0;

    return initialStats;
  }, [course, completedIds, plannedIds]);

  return stats;
}