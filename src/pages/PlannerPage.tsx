import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '@/services/courseService';
import { useCourseStore } from '@/store/useCourseStore';
import { useCourseLogic } from '@/hooks/useCourseLogic';
import { SubjectCard } from '@/components/SubjectCard';
import { Button } from '@/components/ui/button';

export function PlannerPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? getCourseById(courseId) : undefined;
  
  const { toggleCompleted, togglePlanned, reset } = useCourseStore();
  const { getSubjectStatus } = useCourseLogic();

  if (!course) return <div className="p-4">Curso não encontrado</div>;

  // Cria array dinâmico baseado no total de períodos do JSON
  const periods = Array.from({ length: course.totalPeriods }, (_, i) => i + 1);

  const handleSubjectClick = (subjectId: string, currentStatus: string) => {
    if (currentStatus === 'completed') toggleCompleted(subjectId);
    else if (currentStatus === 'planned') toggleCompleted(subjectId);
    else if (currentStatus === 'available') togglePlanned(subjectId);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Barra de Ferramentas */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200 shadow-sm shrink-0 h-12">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-slate-400 hover:text-blue-600 transition-colors">
            &larr; Voltar
          </Link>
          <h1 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
            {course.name}
          </h1>
          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">
            {course.totalPeriods} Períodos
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={reset} className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-50">
          Resetar Progresso
        </Button>
      </div>

      {/* GRID DINÂMICO FULL WIDTH */}
      <div className="flex-grow p-2 overflow-x-auto">
        <div 
          className="grid gap-2 min-w-[1024px]" 
          style={{ 
            // AQUI ESTÁ A MÁGICA: Grid exato baseado no número de colunas
            gridTemplateColumns: `repeat(${course.totalPeriods}, minmax(0, 1fr))` 
          }}
        >
          {periods.map((period) => {
            const periodSubjects = course.subjects.filter(s => s.periodo === period);
            const isEmpty = periodSubjects.length === 0;

            return (
              <div key={period} className="flex flex-col gap-2">
                {/* Cabeçalho */}
                <div className={`text-center py-1 rounded border ${isEmpty ? 'bg-slate-50 border-slate-100' : 'bg-white border-blue-100'}`}>
                  <span className={`text-[10px] font-bold uppercase ${isEmpty ? 'text-slate-300' : 'text-blue-600'}`}>
                    {period}º P
                  </span>
                </div>

                {/* Cards */}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}