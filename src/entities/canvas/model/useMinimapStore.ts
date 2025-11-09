import { create } from 'zustand'

type MinimapState = {
  images: {
    id: string
    url: string
  }[]
}

type MinimapActions = {
  setImages: (images: { id: string; url: string }[]) => void
  addImage: (image: { id: string; url: string }) => void
  updateImage: (id: string, partial: Partial<{ id: string; url: string }>) => void
}

export type MinimapStore = MinimapState & MinimapActions

const initialImages: { id: string; url: string }[] = []

export const useMinimapStore = create<MinimapStore>((set) => ({
  images: initialImages,
  setImages: (images) => set({ images }),
  addImage: (image) =>
    set((state) => ({
      images: [...state.images, image],
    })),
  updateImage: (id, partial) =>
    set((state) => ({
      images: state.images.map((image) => (image.id === id ? { ...image, ...partial } : image)),
    })),
}))
