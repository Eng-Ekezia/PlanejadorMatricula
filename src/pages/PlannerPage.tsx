import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById } from '@/services/courseService';
import { useCourseStore } from '@/store/useCourseStore';
import { useCourseLogic } from '@/hooks/useCourseLogic';
import { SubjectCard } from '@/components/SubjectCard';
import { Button } from '@/components/ui/button';

export function PlannerPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  // Busca síncrona do curso (os dados já estão carregados pelo import.meta.glob)
  const course = courseId ? getCourseById(courseId) : undefined;
  
  // Ações da Store
  const { toggleCompleted, togglePlanned, reset } = useCourseStore();

  // ------------------------------------------------------------------
  // AQUI ESTÁ A CORREÇÃO CRÍTICA DE LÓGICA:
  // Passamos as matérias para o hook poder calcular Co-requisitos
  // ------------------------------------------------------------------
  const { getSubjectStatus } = useCourseLogic(course ? course.subjects : []);

  if (!course) {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-xl text-slate-600">Curso não encontrado</h1>
            <Button onClick={() => navigate('/')}>Voltar ao Início</Button>
        </div>
    );
  }

  // Gera o array de períodos dinamicamente baseado no curso (ou 10 se falhar)
  const periods = Array.from({ length: course.totalPeriods || 10 }, (_, i) => i + 1);

  // Lógica de Clique: Ciclo Inteligente
  const handleSubjectClick = (subjectId: string, currentStatus: string) => {
    // Se está BLOQUEADO, não faz nada
    if (currentStatus === 'locked') return;

    // Se Concluído -> Remove (Volta a Neutro/Disponível)
    if (currentStatus === 'completed') {
        toggleCompleted(subjectId);
        return;
    }
    
    // Se Planejado -> Vira Concluído
    if (currentStatus === 'planned') {
        toggleCompleted(subjectId);
        return;
    }

    // Se Disponível -> Vira Planejado
    if (currentStatus === 'available') {
        togglePlanned(subjectId);
        return;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Ultra Compacto (Visual Preservado) */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-slate-400 hover:text-blue-600 transition-colors">
            &larr;
          </Link>
          <h1 className="text-sm font-bold text-slate-800 uppercase tracking-tight truncate max-w-[200px] md:max-w-none">
            {course.name}
          </h1>
        </div>
        <div className="flex gap-2">
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={reset} 
                className="h-6 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
            >
            Resetar
            </Button>
        </div>
      </div>

      {/* GRID PANORÂMICO (Preservado) */}
      <div className="flex-grow p-2 overflow-x-auto">
        {/* Nota: Mantivemos o grid-cols-10 para desktop. 
            Se o curso tiver 12 períodos, os extras irão para a linha de baixo (wrap),
            o que é o comportamento esperado em grids CSS.
        */}
        <div className="grid grid-cols-2 md:grid-cols-10 gap-2 items-start min-w-[600px] md:min-w-0">
          
          {periods.map((period) => {
            const periodSubjects = course.subjects.filter(s => s.periodo === period);
            const isEmpty = periodSubjects.length === 0;

            return (
              <div key={period} className="flex flex-col gap-2 min-w-0">
                {/* Cabeçalho da Coluna */}
                <div className={`text-center py-1 rounded ${isEmpty ? 'bg-slate-100' : 'bg-blue-50'}`}>
                  <span className={`text-[10px] font-bold uppercase ${isEmpty ? 'text-slate-400' : 'text-blue-700'}`}>
                    {period}º P
                  </span>
                </div>

                {/* Lista de Matérias */}
                <div className="flex flex-col gap-2">
                  {periodSubjects.map(subject => {
                    const status = getSubjectStatus(subject);
                    return (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        status={status}
                        onClick={() => handleSubjectClick(subject.id, status)}
                      />
                    );
                  })}
                  
                  {/* Placeholder Visual para colunas vazias */}
                  {isEmpty && <div className="h-20 border border-dashed border-slate-200 rounded opacity-50"></div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}