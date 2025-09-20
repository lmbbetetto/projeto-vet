'use server';
import { revalidatePath } from 'next/cache';
import { routes } from '@/utils/routes';
import { ProdutoRequest } from '@/utils/types';

export async function createNewProduto(
  payload: ProdutoRequest & { imagem?: string }
): Promise<ProdutoRequest> {
  const data: ProdutoRequest = {
    nome: payload.nome,
    preco: payload.preco,
    qtdeEstoque: payload.qtdeEstoque,
    qtdeMinima: payload.qtdeMinima,
    idTipoProduto: payload.idTipoProduto,
  };

  const response = await fetch('http://localhost:8080/produto/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro ao cadastrar produto:", response.status, errorText);
    throw new Error('Erro ao cadastrar produto');
  }

  const result: ProdutoRequest = await response.json();
  console.log("Produto cadastrado:", result);

  if (payload.imagem) {
    try {
      const fotoResponse = await fetch(
        `http://localhost:8080/produto/atualizar-foto/${result.idTipoProduto}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ foto: payload.imagem }),
        }
      );

      if (!fotoResponse.ok) {
        const errorText = await fotoResponse.text();
        console.error("Erro ao atualizar foto:", fotoResponse.status, errorText);
      } else {
        console.log("Foto atualizada com sucesso");
      }
    } catch (err) {
      console.error("Erro na requisição de atualizar foto:", err);
    }
  }

  revalidatePath(routes.product.search, 'page');

  return result;
}

export async function updateProduto(
  id: number,
  payload: ProdutoRequest
): Promise<ProdutoRequest> {
  const data: ProdutoRequest = {
    nome: payload.nome,
    preco: payload.preco,
    qtdeEstoque: payload.qtdeEstoque,
    qtdeMinima: payload.qtdeMinima,
    idTipoProduto: payload.idTipoProduto,
  };

  const response = await fetch(`http://localhost:8080/produto/atualizar/${id}`, {
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

  let result: ProdutoRequest;
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