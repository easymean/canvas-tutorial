import { create } from 'zustand'

type ModuleState = {
  modules: {
    id: string
    data: object
    previewUrl: string
  }[]
}

type ModuleActions = {
  setModules: (modules: { id: string; data: object; previewUrl: string }[]) => void
  addModule: (module: { id: string; data: object; previewUrl: string }) => void
  updateModule: (
    id: string,
    partial: Partial<{ id: string; data: object; previewUrl: string }>,
  ) => void
}

export type ModuleStore = ModuleState & ModuleActions

export const useModuleStore = create<ModuleStore>((set) => ({
  modules: [],
  setModules: (modules) => set({ modules }),
  addModule: (module) => set((state) => ({ modules: [...state.modules, module] })),
  updateModule: (id, partial) =>
    set((state) => ({
      modules: state.modules.map((module) =>
        module.id === id ? { ...module, ...partial } : module,
      ),
    })),
}))
