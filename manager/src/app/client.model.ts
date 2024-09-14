import { Suporte } from "./suporte.model";

export interface Client {
    id: number;
    email: string;
    telefone: string;
    name: string;
    date: string;
    observation: string;
    plan: string;
    passToPass: string;
    suporte_name?: string;
    checklist?: string;
    suporte?: Suporte;
  }
  