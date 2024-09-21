import { create } from "zustand";

interface IFolder {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useFolder = create<IFolder>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
