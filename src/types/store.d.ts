import type { User } from "./models";

export type AuthStore = {
  authToken?: string;
  authUser?: User;
  SET_USER: (user: any) => void;
  SET_TOKEN: (token: string) => void;
  GET_USER: () => any;
  GET_TOKEN: () => string;
  IS_AUTHENTICATED: () => boolean;
  CLEAR_AUTH: () => void;
};

export type LayoutStore = {
  sidebarCollapsed: boolean;
  theme: "light" | "dark";
  SET_SIDEBAR_COLLAPSED: (isCollapsed: boolean) => void;
  SET_THEME: (theme: "light" | "dark") => void;
};
