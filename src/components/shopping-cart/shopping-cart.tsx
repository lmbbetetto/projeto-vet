"use client";

import { useState } from "react";
import {
  IconArrowNarrowRight,
  IconShoppingCart,
  IconX,
} from "@tabler/icons-react";
import { CartItem } from "@/utils/types";
import { Button } from "../ui/button";

type ShoppingCartProps = {
  itemCount?: number;
  items?: CartItem[];
};

export function ShoppingCart({ itemCount = 0, items = [] }: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeCart() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
        aria-label="Abrir carrinho"
      >
        <IconShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-40"
            onClick={closeCart}
          />
          <div className="fixed top-0 right-0 h-full w-150 bg-white shadow-lg z-50 animate-slide-in flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex gap-6 items-center">
                <h2 className="text-lg font-semibold">CARRINHO</h2>
                <p className="w-6 h-6 flex items-center justify-center font-semibold rounded-full bg-black text-white text-[15px]">
                  {items.length}
                </p>
              </div>
              <button onClick={closeCart}>
                <IconX size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {items.length === 0 ? (
                <p className="text-gray-500">Seu carrinho está vazio.</p>
              ) : (
                <>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-md flex items-center p-6 space-x-4 h-30"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">{item.quantity}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
            <footer className="border-t flex flex-col gap-4 p-6 pb-8">
              <div className="flex justify-between">
                <p className="text-md font-bold text-center">TOTAL</p>
                <p className="text-md font-bold text-center">
                  {items
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>
              <Button className="w-full bg-black rounded-4xl">
                <div className="flex items-center gap-3">
                  <p>Finalizar Compra</p>
                  <IconArrowNarrowRight />
                </div>
              </Button>
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
