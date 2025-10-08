'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { CarrinhoResponse } from "@/utils/types";

interface CartContextProps {
    carrinho: CarrinhoResponse | null;
    fetchCarrinho: () => Promise<void>;
}

const CartContext = createContext<CartContextProps>({
    carrinho: null,
    fetchCarrinho: async () => { },
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [carrinho, setCarrinho] = useState<CarrinhoResponse | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenValue = document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1] ?? null;

        setToken(tokenValue);
    }, []);

    async function fetchCarrinho() {
        if (!token) return;

        try {
            const response = await fetch("http://localhost:8080/carrinho/buscar", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCarrinho(data);
            }
        } catch (error) {
            console.error("Erro ao buscar carrinho:", error);
        }
    }

    useEffect(() => {
        if (token) fetchCarrinho();
    }, [token]);

    return (
        <CartContext.Provider value={{ carrinho, fetchCarrinho }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
