import { create } from 'zustand'
import type { CanvasModule, CanvasTextNode } from '../types'
import type { CanvasImage } from '../types'
import { devtools } from 'zustand/middleware'

type ModuleState = {
  modules: CanvasModule[]
  selectedModuleId: string | null
}

type ModuleActions = {
  setModules: (
    modules: {
      id: string
      data: { texts: CanvasTextNode[]; images: CanvasImage[] }
      previewUrl: string
    }[],
  ) => void
  addModule: (module: {
    id: string
    data: { texts: CanvasTextNode[]; images: CanvasImage[] }
    previewUrl: string
  }) => void
  updateModule: (
    id: string,
    partial: Partial<{
      id: string
      data: { texts: CanvasTextNode[]; images: CanvasImage[] }
      previewUrl: string
    }>,
  ) => void
  setSelectedModuleId: (id: string | null) => void
}

export type ModuleStore = ModuleState & ModuleActions

export const useModuleStore = create<ModuleStore>()(
  devtools((set) => ({
    modules: [],
    selectedModuleId: null,
    setModules: (modules) => set({ modules }),
    addModule: (module) => set((state) => ({ modules: [...state.modules, module] })),
    updateModule: (id, partial) =>
      set((state) => ({
        modules: state.modules.map((module) =>
          module.id === id ? { ...module, ...partial } : module,
        ),
      })),
    setSelectedModuleId: (id) => set({ selectedModuleId: id }),
  })),
)
