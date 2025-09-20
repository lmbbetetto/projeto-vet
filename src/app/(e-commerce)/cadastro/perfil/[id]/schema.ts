import { StatusCliente } from "@/utils/enum";
import { z } from "zod";

export const clienteSchema = z.object({
  id: z.number(),
  nome: z.string().min(2, { message: "Nome é obrigatório" }),
  cpf: z.string().min(11, { message: "CPF inválido" }),
  telefone: z.string().min(8, { message: "Telefone é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),

  enderecoResponse: z.object({
    id: z.number(),
    logradouro: z.string(),
    numero: z.string(),
    bairro: z.string(),
    cep: z.string(),
    cidade: z.string(),
    estado: z.string(),
    complemento: z.string().optional()
  }),

  status: z.nativeEnum(StatusCliente)
});

export type ClienteSchema = z.infer<typeof clienteSchema>;

export const clienteDefaultValues: ClienteSchema = {
  id: 0,
  nome: "",
  cpf: "",
  telefone: "",
  email: "",
  enderecoResponse: {
    id: 0,
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
    complemento: ""
  },
  status: StatusCliente.ATIVO
};