import { z } from "zod";

export const tipoProdutoSchema = z.object({
  nome: z.string().min(2, { message: "Nome é obrigatório" }),
  descricao: z.string().min(2, { message: "Descrição é obrigatória" }),
});

export type TipoProdutoSchema = z.infer<typeof tipoProdutoSchema>;

export const tipoProdutoDefaultValues: TipoProdutoSchema = {
  nome: "",
  descricao: "",
};
