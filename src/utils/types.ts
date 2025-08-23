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
