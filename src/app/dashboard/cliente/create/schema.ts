import { z } from "zod";

export const clienteSchema = z.object({
  nome: z.string().min(2, { message: "Nome é obrigatório" }),
  cpf: z.string().min(11, { message: "CPF inválido" }),
  telefone: z.string().min(8, { message: "Telefone é obrigatório" }),
  email: z.string().email({ message: "E-mail inválido" }),

  enderecoRequest: z.object({
    logradouro: z.string(),
    numero: z.string(),
    bairro: z.string(),
    cep: z.string(),
    cidade: z.string(),
    estado: z.string(),
    complemento: z.string().optional()
  }),

  authRequest: z.object({
    login: z.string().min(4, { message: "Login é obrigatório" }),
    password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
  })
});

export type ClienteSchema = z.infer<typeof clienteSchema>;

export const clienteDefaultValues: ClienteSchema = {
  nome: "",
  cpf: "",
  telefone: "",
  email: "",
  enderecoRequest: {
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
    complemento: ""
  },
  authRequest: {
    login: "",
    password: ""
  }
};
