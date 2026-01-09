// src/components/SubjectCard.tsx
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Lock, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Subject } from '@/types';

export type SubjectStatus = 'locked' | 'available' | 'completed' | 'planned';

interface SubjectCardProps {
  subject: Subject;
  status: SubjectStatus;
  onClick: () => void;
}

export function SubjectCard({ subject, status, onClick }: SubjectCardProps) {
  
  const variants = {
    locked: {
      bg: 'bg-slate-100 border-slate-200 text-slate-400',
      icon: <Lock size={14} />,
    },
    available: {
      bg: 'bg-white border-emerald-500 hover:bg-emerald-50 cursor-pointer shadow-sm hover:shadow-md',
      icon: <BookOpen size={14} className="text-emerald-600" />,
    },
    completed: {
      bg: 'bg-slate-800 border-slate-900 text-slate-200 shadow-inner',
      icon: <CheckCircle2 size={14} className="text-emerald-400" />,
    },
    planned: {
      bg: 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200 cursor-pointer shadow-sm',
      icon: <Clock size={14} className="text-amber-700" />,
    }
  };

  const currentVariant = variants[status];

  return (
    <motion.div
      whileHover={status !== 'locked' ? { scale: 1.02 } : {}}
      whileTap={status !== 'locked' ? { scale: 0.98 } : {}}
      onClick={status !== 'locked' ? onClick : undefined}
      className={cn(
        "relative flex flex-col justify-between p-3 rounded-lg border-l-4 transition-all duration-200 h-28 select-none",
        currentVariant.bg
      )}
    >
      <div className="flex justify-between items-start">
        <span className={cn(
          "font-bold text-xs uppercase tracking-wider", 
          status === 'completed' ? "text-slate-400" : "text-slate-500"
        )}>
          {/* Agora usa 'codigo' (ex: CIV101) */}
          {subject.codigo} 
        </span>
        <div className="opacity-80">
          {currentVariant.icon}
        </div>
      </div>

      <div className="flex-grow flex items-center py-1">
        <p className={cn(
          "text-sm font-semibold leading-tight line-clamp-3",
          status === 'locked' && "opacity-50"
        )}>
          {/* Agora usa 'nome' */}
          {subject.nome}
        </p>
      </div>

      <div className="flex items-center justify-between text-[10px] font-medium opacity-70 mt-1">
        {/* Agora usa 'creditos' e 'carga_horaria' */}
        <span>{subject.creditos} Créditos</span>
        <span>{subject.carga_horaria}h</span>
      </div>
    </motion.div>
  );
}