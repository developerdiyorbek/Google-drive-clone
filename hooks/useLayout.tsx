import { create } from "zustand";

interface ILayout {
  layout: "list" | "grid";
  setLayout: (layout: "list" | "grid") => void;
}

export const useLayout = create<ILayout>((set) => ({
  layout: "list",
  setLayout: (layout) => set({ layout }),
}));
