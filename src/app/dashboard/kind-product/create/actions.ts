'use server';
import { revalidatePath } from 'next/cache';
import { routes } from '@/utils/routes';
import { TipoProdutoRequest } from '@/utils/types';

export async function createNewTipoProduto(
  payload: TipoProdutoRequest
): Promise<TipoProdutoRequest> {
  const data: TipoProdutoRequest = {
    nome: payload.nome,
    descricao: payload.descricao,
  };

  const response = await fetch('http://localhost:8080/tipo-produto/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro ao cadastrar tipo de produto:", response.status, errorText);
    throw new Error('Erro ao cadastrar tipo de produto');
  }

  let result: TipoProdutoRequest;
  try {
    result = await response.json();
  } catch {
    console.warn("Resposta sem JSON, retornando o payload enviado");
    result = data;
  }

  console.log("Resultado do cadastro:", result);

  revalidatePath(routes.kindProduct.search, 'page');

  return result;
}

export async function updateTipoProduto(
  id: number,
  payload: TipoProdutoRequest
): Promise<TipoProdutoRequest> {
  const data: TipoProdutoRequest = {
    nome: payload.nome,
    descricao: payload.descricao,
  };
  const response = await fetch(`http://localhost:8080/tipo-produto/atualizar/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error('Erro ao editar tipo de produto');
  }

  let result: TipoProdutoRequest;
  try {
    result = await response.json();
  } catch {
    console.warn("Resposta sem JSON, retornando o payload enviado");
    result = data;
  }

  revalidatePath(routes.product.search, 'page');

  return result;
}
