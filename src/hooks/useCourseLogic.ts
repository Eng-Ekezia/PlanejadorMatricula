import { useCallback } from 'react';
import type { Subject } from '@/types';
import { useCourseStore } from '@/store/useCourseStore';

export function useCourseLogic(courseSubjects: Subject[]) {
  const { completedIds, plannedIds } = useCourseStore();

  const getSubjectStatus = useCallback((subject: Subject): 'locked' | 'available' | 'completed' | 'planned' => {
    // 1. Estados absolutos (a "Memória" do aluno vence as regras)
    if (completedIds.includes(subject.id)) return 'completed';
    if (plannedIds.includes(subject.id)) return 'planned';

    // 2. Validação de Pré-requisitos (Obrigatório estar Concluído)
    const prereqs = subject.pre_requisitos || [];
    const hasPrereqs = prereqs.every(id => completedIds.includes(id));

    if (!hasPrereqs) return 'locked';

    // 3. Validação de Co-requisitos (Lógica "Legacy": Simultaneidade)
    const coreqs = subject.co_requisitos || [];
    
    if (coreqs.length > 0) {
      const allCoreqsOk = coreqs.every(coReqId => {
        // Condição A: O co-requisito já foi vencido ou já está no plano?
        if (completedIds.includes(coReqId) || plannedIds.includes(coReqId)) {
          return true;
        }

        // Condição B: O co-requisito está "Disponível" para ser pego agora?
        // (Isso resolve o deadlock de co-requisitos mútuos)
        const coReqSubject = courseSubjects.find(s => s.id === coReqId);
        
        // Se não achou a matéria (erro de dados), não bloqueia por segurança
        if (!coReqSubject) return true; 

        // Verifica se os pré-requisitos DO CO-REQUISITO estão atendidos
        const coReqPrereqs = coReqSubject.pre_requisitos || [];
        const coReqPrereqsMet = coReqPrereqs.every(id => completedIds.includes(id));
        
        return coReqPrereqsMet;
      });

      if (!allCoreqsOk) return 'locked';
    }

    return 'available';
  }, [completedIds, plannedIds, courseSubjects]);

  return {
    getSubjectStatus
  };
} 