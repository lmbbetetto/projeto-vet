"use client";

import { useState } from "react";
import { IconArrowNarrowRight, IconShoppingCart, IconX } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { ShoppingCartProps } from "./types";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useCarrinho } from "@/providers/shopping-cart/cart-provider";

export function ShoppingCart({ items }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchCarrinho } = useCarrinho();

  const closeCart = () => setIsOpen(false);

  const handleDeleteTipoProduto = async (idProduto: number, qtde: number) => {
    console.log(idProduto, qtde)
    try {
      const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];
      const response = await fetch("http://localhost:8080/carrinho/remover", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          idProduto,
          qtde,
        }),
      });

      const text = await response.text();
      console.log("Resposta do servidor:", text);

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Produto removido com sucesso.",
        });
        await fetchCarrinho();
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível remover o produto.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o produto.",
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="relative p-2 transition-colors z-50"
        aria-label="Abrir carrinho"
        variant={"outline"}
      >
        <IconShoppingCart size={30} />
        {items?.listaDeProduto.length! > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items?.listaDeProduto.length!}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-40" onClick={closeCart} />

          <div className="fixed top-0 right-0 h-full w-150 bg-white shadow-lg z-50 animate-slide-in flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex gap-6 items-center">
                <h2 className="text-lg font-semibold">CARRINHO</h2>
                <p className="w-6 h-6 flex items-center justify-center font-semibold rounded-full bg-black text-white text-[15px]">
                  {items?.listaDeProduto.length! ?? 0}
                </p>
              </div>
              <button onClick={closeCart}>
                <IconX size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {(!items?.listaDeProduto || items?.listaDeProduto.length! === 0) ? (
                <p className="text-gray-500">Seu carrinho está vazio.</p>
              ) : (
                items.listaDeProduto.map((item) => (
                  <div
                    key={item.produto.id}
                    className="bg-white rounded-2xl shadow-md flex items-center p-6 space-x-4 h-30"
                  >
                    <Image
                      src={`http://localhost:8080/produto/buscar-imagem/${item.produto.id}`}
                      alt={item.produto.nome}
                      width={80}
                      height={80}
                      className="object-cover rounded-2xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.produto.nome}</h3>
                      <p className="text-sm text-gray-500">
                        R$ {(item.produto.preco * item.qtde).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{item.qtde}</p>
                    <Button
                      className="bg-red-700 hover:bg-red-800"
                      onClick={() =>
                        handleDeleteTipoProduto(item.produto.id, item.qtde)
                      }
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))
              )}
            </div>

            <footer className="border-t flex flex-col gap-4 p-6 pb-8">
              <div className="flex justify-between">
                <p className="text-md font-bold text-center">TOTAL</p>
                <p className="text-md font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(items?.total ?? 0)}
                </p>
              </div>
              <Link href={"/checkout"} onClick={closeCart}>
                <Button className="w-full bg-black rounded-4xl">
                  <div className="flex items-center gap-3">
                    <p>Finalizar Compra</p>
                    <IconArrowNarrowRight />
                  </div>
                </Button>
              </Link>
            </footer>
          </div>

          <style jsx>{`
            @keyframes slide-in {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0%);
              }
            }
            .animate-slide-in {
              animation: slide-in 0.3s ease-out;
            }
          `}</style>
        </>
      )}
    </>
  );
}
