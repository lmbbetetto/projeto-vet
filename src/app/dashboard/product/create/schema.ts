import { z } from "zod";

export const produtoSchema = z.object({
  nome: z.string().min(2, { message: "Nome é obrigatório" }),
  preco: z.number().min(0, { message: "Preço inválido" }),
  qtdeEstoque: z.number().min(0, { message: "Quantidade em estoque inválida" }),
  qtdeMinima: z.number().min(0, { message: "Quantidade mínima inválida" }),
  idTipoProduto: z.number().min(1, { message: "Tipo de produto é obrigatório" })
});

export type ProdutoSchema = z.infer<typeof produtoSchema>;

export const produtoDefaultValues: ProdutoSchema = {
  nome: "",
  preco: 0,
  qtdeEstoque: 0,
  qtdeMinima: 0,
  idTipoProduto: 0
};
