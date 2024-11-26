import type { SharedFields } from "./shared";

export type User = {
  account_no: string;
  name: string;
  email: string;
  account_type: string;
  remember_token: any;
} & SharedFields;
