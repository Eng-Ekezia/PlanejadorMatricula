import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lock, ArrowRightCircle, CircleDashed } from 'lucide-react'; 
import { cn } from '@/lib/utils';
import type { Subject } from '@/types';

interface SubjectCardProps {
  subject: Subject;
  status: 'locked' | 'available' | 'completed' | 'planned';
  onClick: () => void;
}

export function SubjectCard({ subject, status, onClick }: SubjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const statusStyles = {
    locked: 'bg-slate-100 border-slate-200 text-slate-400',
    available: 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-md',
    planned: 'bg-yellow-100 border-yellow-300 text-yellow-800 shadow-sm',
    completed: 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-sm',
  };

  const StatusIcon = {
    locked: Lock,
    available: CircleDashed,
    planned: ArrowRightCircle,
    completed: CheckCircle2,
  }[status];

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative h-24 w-full perspective-1000">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer transition-colors duration-200"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "backOut" }}
        onContextMenu={handleContextMenu}
        onClick={!isFlipped ? onClick : undefined} 
      >
        {/* ================= FRENTE DO CARD ================= */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden flex flex-col items-center justify-center p-2 rounded-lg border-2 text-center select-none",
            statusStyles[status]
          )}
        >
          <span className="text-xs font-black uppercase tracking-wider opacity-60 mb-1">
            {subject.codigo}
          </span>
          <h3 className="text-xs font-bold leading-tight line-clamp-3 px-1">
            {subject.nome}
          </h3>
          <div className="absolute bottom-1 right-1 opacity-20 scale-75">
            <StatusIcon size={16} />
          </div>
        </div>

        {/* ================= VERSO DO CARD (DETALHES) ================= */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 bg-white border-2 border-slate-200 rounded-lg p-3 flex flex-col justify-between text-left shadow-inner"
        >
          <div className="space-y-2">
             {/* ID substituindo o Código, mantendo padrão visual (10px) */}
             <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-100 pb-1">
                <span>ID:</span>
                <span className="font-mono font-bold text-slate-700 truncate max-w-[120px]" title={subject.id}>
                  {subject.id}
                </span>
             </div>
            
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-600">
              <span className="text-right pr-1 border-r border-slate-100">Créditos:</span>
              <span className="font-mono font-bold">{subject.creditos}</span>
              
              <span className="text-right pr-1 border-r border-slate-100">Horas:</span>
              <span className="font-mono font-bold">{subject.carga_horaria}h</span>

              <span className="text-right pr-1 border-r border-slate-100">H. Aula:</span>
              <span className="font-mono font-bold">{subject.horas_aula}</span>
            </div>
          </div>
          
          <div className="text-[9px] text-slate-400 text-center italic mt-auto">
            {status === 'locked' ? 'Bloqueado' : 'Clique dir. p/ voltar'}
          </div>
        </div>
      </motion.div>
    </div>
  );
}