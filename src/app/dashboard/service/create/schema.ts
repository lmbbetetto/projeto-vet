import { z } from "zod";

export const servicoSchema = z.object({
  nome: z.string().min(2, { message: "Nome é obrigatório" }),
  descricao: z.string().min(2, { message: "Descrição é obrigatória" }),
  preco: z.number().min(0, { message: "Preço deve ser maior ou igual a 0" }),
});

export type ServicoSchema = z.infer<typeof servicoSchema>;

export const servicoDefaultValues: ServicoSchema = {
  nome: "",
  descricao: "",
  preco: 0,
};
