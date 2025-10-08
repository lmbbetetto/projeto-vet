'use client'
import { useEffect, useState } from "react";
import { ShoppingCart } from "../shopping-cart";
import UserLogin from "../user-login";
import Image from "next/image";
import { CarrinhoResponse } from "@/utils/types";
import Link from "next/link";
import { Button } from "../ui/button";
import { routes } from "@/utils/routes";

export function HeaderEcommerce() {
  const [carrinho, setCarrinho] = useState<CarrinhoResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenValue = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1] ?? null;
    setToken(tokenValue);
  }, []);

  useEffect(() => {
    if (token) {
      fetchCarrinho();
    }
  }, [token]);

  async function fetchCarrinho() {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8080/carrinho/buscar", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Erro no backend:", response.status);
        return;
      }

      const data = await response.json();
      setCarrinho(data);
    } catch (error) {
      console.error("Erro de conexão:", error);
    }
  }

  return (
    <div className="h-5 p-30 pt-9 pb-9 flex items-center justify-between z-50 relative bg-white">
      <Link href="/" className="mt-[3rem]">
        <Image src="/bellla-pet.png" alt="Logo Bella Pet" width={150} height={150} />
      </Link>
      <div className="flex items-center gap-3">
        <Link href={routes.agendamento.new}>
          <Button variant="outline">Agendamento</Button>
        </Link>
        <UserLogin />
        <ShoppingCart items={carrinho ?? undefined} />
      </div>
    </div>
  );
}
