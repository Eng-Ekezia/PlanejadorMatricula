import { useState } from 'react';
import { getAvailableCourses } from './services/courseService';
import type { Course } from './types'; // Correção 1: 'import type'

function App() {
  // Correção 2: Removemos o useEffect.
  // Passamos a função getAvailableCourses diretamente para o useState.
  // Isso se chama "Lazy Initialization": o React vai rodar essa função apenas
  // na primeira renderização para buscar o valor inicial. É mais limpo e performático.
  const [courses] = useState<Course[]>(getAvailableCourses);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Teste da Camada de Dados</h1>
      <div className="space-y-4">
        {courses.length === 0 ? (
          <p>Nenhum curso encontrado (Verifique se os JSONs estão na pasta data)</p>
        ) : (
          courses.map(course => (
            <div key={course.id} className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-blue-600">{course.name}</h2>
              <p className="text-gray-600">ID do arquivo: {course.id}</p>
              <p className="text-gray-600">Total de disciplinas: {course.subjects.length}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;