import { StatusCliente, StatusSale } from "./enum";

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

export type Pedido = {
  id: number,
  dataHora: string,
  statusPedido: StatusSale
  cliente: string,
  valorDaVenda: number
}

export type EnderecoRequest = {
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  complemento?: string;
};

export type AuthRequest = {
  login: string;
  password: string;
};

export type ClienteRequest = {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  enderecoRequest: EnderecoRequest;
  authRequest: AuthRequest;
};

export type EnderecoResponse = {
  id: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  complemento?: string;
};

export type ClienteResponse = {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  enderecoResponse: EnderecoResponse;
  status: StatusCliente;
};

export type ProdutoRequest = {
  nome: string;
  preco: number;
  qtdeEstoque: number;
  qtdeMinima: number;
  idTipoProduto: number;
};

export type ProdutoResponseID = {
  id: number;
  nome: string;
  preco: number;
  qtdeEstoque: number;
  qtdeMinima: number;
  tipoProdutoResponse: {
    id: number;
    nome: string;
    descricao: string;
    status: StatusCliente;
  };
  status: string;
};

export type TipoProdutoRequest = {
  nome: string,
  descricao: string
}

export type TipoProdutoResponse = {
  id: number
  nome: string
  descricao: string
  status: StatusCliente
}

export type ProdutoResponse = {
  id: number
  nome: string
  preco: number
  qtdeEstoque: number
  qtdeMinima: number
  tipoProdutoResponse: TipoProdutoResponse
  status: StatusCliente
}

export type ServicoRequest = {
  nome: string;
  descricao: string;
  preco: number;
};

export type ServicoResponse = {
    id: number,
    nome: string,
    descricao: string,
    preco: number,
    status: StatusCliente
}

export type ProdutoCarrinhoResponse = {
  id: number
  nome: string
  preco: number
  qtdeEstoque: number
  qtdeMinima: number
  tipoProdutoResponse: TipoProdutoResponse
  status: StatusCliente
  urlImagem: string;
}

export interface ListaProdutoResponse {
  produto: ProdutoCarrinhoResponse;
  qtde: number;
}

export interface CarrinhoResponse {
  id: number;
  listaDeProduto: ListaProdutoResponse[];
  total: number;
}

export type TokenPayload = {
  sub: string;
  exp: number;
  iat?: number;
  ["auth-id"]: number;
};

export type HoraResponse = {
  hour: number
  minute: number
  second: number
  nano: number
}

export type ServicoAgendamentoResponse = {
  id: number
  nome: string
  descricao: string
  preco: number
  status: StatusCliente
}

export type AgendamentoResponse = {
  data: string
  hora: HoraResponse
  listaDeServico: ServicoAgendamentoResponse[]
}

export interface AgendamentoRequest {
  id: number
  dataHora: string
  status: "AGENDADO" | "CANCELADO" | "CONCLUIDO" | string
  total: number
  cliente: ClienteResponse
  listaDeServicos: ServicoAgendamentoResponse[]
}