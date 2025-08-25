'use server';
import { revalidatePath } from 'next/cache';

import { routes } from '@/utils/routes';
import { ServicoRequest } from '@/utils/types';

export async function createNewServico(
  payload: ServicoRequest
): Promise<ServicoRequest> {
  const data: ServicoRequest = {
    nome: payload.nome,
    descricao: payload.descricao,
    preco: payload.preco,
  };

  const response = await fetch('http://localhost:8080/servico/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro ao cadastrar serviço:", response.status, errorText);
    throw new Error('Erro ao cadastrar serviço');
  }

  let result: ServicoRequest;
  try {
    result = await response.json();
  } catch {
    console.warn("Resposta sem JSON, retornando o payload enviado");
    result = data;
  }

  console.log("Resultado do cadastro:", result);

  revalidatePath(routes.service.search, 'page');

  return result;
}

export async function updateServico(
  id: number,
  payload: ServicoRequest
): Promise<ServicoRequest> {
  const data: ServicoRequest = {
    nome: payload.nome,
    descricao: payload.descricao,
    preco: payload.preco
  };

  const response = await fetch(`http://localhost:8080/servico/atualizar/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro ao editar produto:", response.status, errorText);
    throw new Error('Erro ao editar produto');
  }

  let result: ServicoRequest;
  try {
    result = await response.json();
  } catch {
    console.warn("Resposta sem JSON, retornando o payload enviado");
    result = data;
  }

  console.log("Resultado da edição:", result);
  revalidatePath(routes.product.search, 'page');

  return result;
}