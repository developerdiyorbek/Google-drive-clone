import { create } from "zustand";

interface IPlan {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePlan = create<IPlan>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
