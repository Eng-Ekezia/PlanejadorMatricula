// src/pages/PlannerPage.tsx
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

  if (!course) {
    return <div className="p-10 text-center">Curso não encontrado.</div>;
  }

  // Define os períodos (1 ao 10)
  const periods = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleSubjectClick = (subjectId: string, currentStatus: string) => {
    if (currentStatus === 'completed') toggleCompleted(subjectId);
    else if (currentStatus === 'planned') toggleCompleted(subjectId);
    else if (currentStatus === 'available') togglePlanned(subjectId);
  };

  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <Link to="/" className="text-sm text-slate-500 hover:text-blue-600 font-medium flex items-center gap-1">
            &larr; Seleção de Cursos
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{course.name}</h1>
        </div>
        <Button variant="outline" onClick={reset} size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
          Limpar Tudo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {periods.map((period) => {
          // AQUI: Usa 's.periodo' vindo direto do JSON
          const periodSubjects = course.subjects.filter(s => s.periodo === period);
          const isEmpty = periodSubjects.length === 0;

          return (
            <div key={period} className={`space-y-3 ${isEmpty ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 rounded-full">
                  {period}º Período
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
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
  );
}