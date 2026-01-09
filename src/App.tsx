// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { PlannerPage } from './pages/PlannerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pai (Layout) */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Rota Index (Home/Landing Page) */}
          <Route index element={<LandingPage />} />
          
          {/* Rota Dinâmica (Planejador) */}
          <Route path="planner/:courseId" element={<PlannerPage />} />
          
          {/* Rota 404 (Opcional, captura qualquer outra coisa) */}
          <Route path="*" element={
             <div className="p-10 text-center">Página não encontrada</div> 
          } />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;