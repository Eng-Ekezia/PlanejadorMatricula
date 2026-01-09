// src/pages/PlannerPage.tsx
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../services/courseService';

export function PlannerPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? getCourseById(courseId) : undefined;

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">Curso não encontrado!</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 block">Voltar para Home</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="text-gray-500 hover:text-blue-600">
          &larr; Voltar
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
      </div>

      <div className="p-10 bg-white rounded-lg shadow border border-gray-200 text-center">
        <p className="text-xl text-gray-600">
          Aqui será renderizada a grade do curso: <span className="font-bold text-blue-600">{courseId}</span>
        </p>
        <p className="mt-4 text-sm text-gray-400">
          Implementação na Fase 4 (Grid System).
        </p>
      </div>
    </div>
  );
}