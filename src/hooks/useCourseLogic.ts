// src/hooks/useCourseLogic.ts
import { useCallback } from 'react';
import type { Subject } from '@/types';
import { useCourseStore } from '@/store/useCourseStore';

export function useCourseLogic() {
  const { completedIds, plannedIds } = useCourseStore();

  const getSubjectStatus = useCallback((subject: Subject): 'locked' | 'available' | 'completed' | 'planned' => {
    // 1. Já cursou?
    if (completedIds.includes(subject.id)) return 'completed';
    
    // 2. Está planejada?
    if (plannedIds.includes(subject.id)) return 'planned';

    // 3. Pré-requisitos (Agora usando 'pre_requisitos')
    // Se a lista for vazia ou undefined, considera aprovado
    const prereqs = subject.pre_requisitos || [];
    const hasPrereqs = prereqs.every(prereqId => completedIds.includes(prereqId));

    if (hasPrereqs) {
      return 'available';
    }

    return 'locked';
  }, [completedIds, plannedIds]);

  return {
    getSubjectStatus
  };
}