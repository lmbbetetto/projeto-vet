import { z } from "zod";

export const horaSchema = z.object({
  hour: z.number().min(0).max(23, { message: "Hora inválida" }),
  minute: z.number().min(0).max(59, { message: "Minuto inválido" }),
  second: z.number().min(0).max(59, { message: "Segundo inválido" }),
  nano: z.number().optional().default(0),
});

export const servicoAgendamentoSchema = z.object({
  id: z.number().min(1, { message: "Serviço inválido" }),
  nome: z.string().min(1, { message: "Nome é obrigatório" }),
  descricao: z.string().min(1, { message: "Descrição é obrigatória" }),
  preco: z.number().min(0, { message: "Preço inválido" }),
  status: z.enum(["ATIVO", "INATIVO"]),
});

export const agendamentoSchema = z.object({
  data: z.string().min(1, { message: "Data é obrigatória" }),
  hora: horaSchema,
  listaDeServico: z.array(servicoAgendamentoSchema).min(1, { message: "Selecione pelo menos um serviço" }),
});

export type HoraSchema = z.infer<typeof horaSchema>;
export type ServicoAgendamentoSchema = z.infer<typeof servicoAgendamentoSchema>;
export type AgendamentoSchema = z.infer<typeof agendamentoSchema>;

export const agendamentoDefaultValues: AgendamentoSchema = {
  data: "",
  hora: { hour: 0, minute: 0, second: 0, nano: 0 },
  listaDeServico: [],
};
