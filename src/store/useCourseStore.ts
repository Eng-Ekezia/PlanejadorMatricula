// src/store/useCourseStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CourseState {
  // Estado
  completedIds: string[]; // IDs das matérias já cursadas (Cinza)
  plannedIds: string[];   // IDs das matérias planejadas para o próximo semestre (Amarelo)

  // Ações
  toggleCompleted: (id: string) => void;
  togglePlanned: (id: string) => void;
  
  // Helpers (Verificadores)
  isCompleted: (id: string) => boolean;
  isPlanned: (id: string) => boolean;
  
  // Reset (Útil para trocar de curso ou limpar dados)
  reset: () => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      completedIds: [],
      plannedIds: [],

      toggleCompleted: (id) => set((state) => {
        const isAlreadyCompleted = state.completedIds.includes(id);
        
        // Se já estava concluída, removemos (volta para neutro)
        if (isAlreadyCompleted) {
          return { completedIds: state.completedIds.filter((i) => i !== id) };
        }

        // Se vamos marcar como concluída, garantimos que NÃO esteja nos planejados
        return {
          completedIds: [...state.completedIds, id],
          plannedIds: state.plannedIds.filter((i) => i !== id), // Remove do planejado
        };
      }),

      togglePlanned: (id) => set((state) => {
        const isAlreadyPlanned = state.plannedIds.includes(id);

        // Se já estava planejada, removemos (volta para neutro)
        if (isAlreadyPlanned) {
          return { plannedIds: state.plannedIds.filter((i) => i !== id) };
        }

        // Se vamos marcar como planejada, garantimos que NÃO esteja nos concluídos
        return {
          plannedIds: [...state.plannedIds, id],
          completedIds: state.completedIds.filter((i) => i !== id), // Remove do concluído
        };
      }),

      // Getters para facilitar o uso na UI
      isCompleted: (id) => get().completedIds.includes(id),
      isPlanned: (id) => get().plannedIds.includes(id),

      reset: () => set({ completedIds: [], plannedIds: [] }),
    }),
    {
      name: 'cefet-planner-storage', // Nome da chave no localStorage
      storage: createJSONStorage(() => localStorage), // Define explicitamente o storage
    }
  )
);