import zukeeper from "zukeeper";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LayoutStore } from "@/types/store.d";

export const useLayoutStore = create<LayoutStore>()(
  persist(
    zukeeper((set: any) => ({
      sidebarCollapsed: false,
      theme: "light",

      SET_SIDEBAR_COLLAPSED: (sidebarCollapsed: boolean) => set({ sidebarCollapsed }),
      SET_THEME: (theme: LayoutStore["theme"]) => set({ theme }),
    })),
    {
      name: "layout-store",
    }
  )
);
