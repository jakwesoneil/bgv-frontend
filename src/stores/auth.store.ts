import zukeeper from "zukeeper";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthStore } from "@/types/store.d";

export const useAuthStore = create<AuthStore>()(
  persist(
    zukeeper((set: any) => ({
      authUser: undefined,
      authToken: undefined,

      SET_USER: (authUser: AuthStore["authUser"]) => set({ authUser: authUser }),
      SET_TOKEN: (authToken: AuthStore["authToken"]) => set({ authToken: authToken }),
      GET_USER() {
        return this.authUser;
      },
      GET_TOKEN() {
        return this.authToken;
      },
      IS_AUTHENTICATED() {
        return this.authUser !== undefined && this.authToken !== undefined;
      },
      CLEAR_AUTH: () => set({ authUser: undefined, authToken: undefined }),
    })),
    {
      name: "auth-store",
    }
  )
);
