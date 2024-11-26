import type { User } from "./models";

export type Credentials = { email: string; password: string };

export type LoginResponse = {
  user: User;
  token: string;
};
