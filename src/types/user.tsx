import { z } from "zod";

export interface User {
    id: number;
    nome: string;
    dataInicial: string;
    dataFinal: string;
    propriedades: number;
    laboratorio: number;
    observacoes?: string;
}

export const userFormSchema = z.object({
    id:  z.number().optional(),
    nome: z.string().min(1, "Campo obrigatório"),
    dataInicial: z.string().datetime(),
    dataFinal: z.string().datetime(),
    propriedades: z.number().min(1, "Selecione pelo menos uma propriedade"),
    laboratorio: z.number().min(1, "Selecione pelo menos uma propriedade"),
    observacoes: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
