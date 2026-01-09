import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Animações
import { BookOpen, ArrowRight, GraduationCap } from 'lucide-react'; // Ícones

// Dados e Tipos
import { getAvailableCourses } from '../services/courseService';
import type { Course } from '../types';

// Componentes Shadcn UI
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function LandingPage() {
  const [courses] = useState<Course[]>(getAvailableCourses);

  // Configuração da animação (Fade In para cima)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Um card aparece depois do outro
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-5xl mx-auto py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-medium">
            v2.0 Beta
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Planeje sua <span className="text-blue-600">Graduação</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-4">
            A ferramenta interativa para alunos do CEFET-MG organizarem sua grade curricular, 
            verificarem pré-requisitos e otimizarem sua matrícula.
          </p>
        </motion.div>
      </div>

      {/* Grid de Cursos */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course) => (
          <motion.div key={course.id} variants={itemVariants}>
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <GraduationCap size={32} />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Bacharelado
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800">
                  {course.name}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Grade completa com {course.subjects.length} disciplinas mapeadas.
                </CardDescription>
              </CardHeader>
              
              <div className="flex-grow p-6 pt-0">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <BookOpen size={16} />
                  <span>Visualização de grade interativa</span>
                </div>
              </div>

              <CardFooter className="bg-slate-50/50 pt-6 border-t border-slate-100">
                <Button asChild className="w-full" size="lg">
                  <Link to={`/planner/${course.id}`} className="flex items-center justify-center gap-2">
                    Iniciar Planejamento <ArrowRight size={18} />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {courses.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="p-12 text-center border-2 border-dashed border-slate-300 rounded-xl bg-slate-50"
        >
          <h3 className="text-lg font-semibold text-slate-700">Nenhum curso encontrado</h3>
          <p className="text-slate-500">
            Adicione arquivos .json na pasta <code>src/data</code> para começar.
          </p>
        </motion.div>
      )}
    </div>
  );
}