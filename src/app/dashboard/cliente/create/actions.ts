'use server';
import { revalidatePath } from 'next/cache';

import { routes } from '@/utils/routes';
import { ClienteRequest } from '@/utils/types';

export async function createNewCliente(
  payload: ClienteRequest
): Promise<ClienteRequest> {
  const data: ClienteRequest = {
    nome: payload.nome,
    cpf: payload.cpf,
    telefone: payload.telefone,
    email: payload.email,
    enderecoRequest: {
      logradouro: payload.enderecoRequest.logradouro,
      numero: payload.enderecoRequest.numero,
      bairro: payload.enderecoRequest.bairro,
      cep: payload.enderecoRequest.cep,
      cidade: payload.enderecoRequest.cidade,
      estado: payload.enderecoRequest.estado,
      complemento: payload.enderecoRequest.complemento ?? "",
    },
    authRequest: {
      login: payload.authRequest.login,
      password: payload.authRequest.password,
    },
  };

  const response = await fetch('http://localhost:8080/cliente/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro ao cadastrar cliente:", response.status, errorText);
    throw new Error('Erro ao cadastrar cliente');
  }

  let result: ClienteRequest;
  try {
    result = await response.json();
  } catch {
    console.warn("Resposta sem JSON, retornando o payload enviado");
    result = data;
  }

  console.log("Resultado do cadastro:", result);

  revalidatePath(routes.cliente.search, 'page');

  return result;
}

// export async function editCliente(
//   id: number,
//   payload: ClienteRequest
// ): Promise<Cliente> {
//   const data: ClienteRequest = {
//     nome: payload.nome,
//     cpf: payload.cpf,
//     telefone: payload.telefone,
//     email: payload.email,
//     enderecoRequest: {
//       logradouro: payload.enderecoRequest.logradouro,
//       numero: payload.enderecoRequest.numero,
//       bairro: payload.enderecoRequest.bairro,
//       cep: payload.enderecoRequest.cep,
//       cidade: payload.enderecoRequest.cidade,
//       estado: payload.enderecoRequest.estado,
//       complemento: payload.enderecoRequest.complemento ?? ""
//     },
//     authRequest: {
//       login: payload.authRequest.login,
//       password: payload.authRequest.password
//     }
//   };

//   console.log(JSON.stringify(data));

//   const response = await updateCliente(String(id), data);

//   console.log(response);
//   revalidatePath(routes.cliente.search, 'page');
//   return response;
// }
