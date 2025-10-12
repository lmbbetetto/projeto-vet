'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { CarrinhoResponse } from '@/utils/types';

interface CarrinhoContextType {
    carrinho: CarrinhoResponse | null;
    fetchCarrinho: () => Promise<void>;
    atualizarCarrinho: () => Promise<void>;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
    const [carrinho, setCarrinho] = useState<CarrinhoResponse | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenValue =
            document.cookie
                .split('; ')
                .find((row) => row.startsWith('token='))?.split('=')[1] ?? null;
        setToken(tokenValue);
    }, []);

    const fetchCarrinho = useCallback(async () => {
        if (!token) return;

        try {
            const response = await fetch('http://localhost:8080/carrinho/buscar', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error('Erro ao buscar carrinho:', response.status);
                return;
            }

            const data = await response.json();
            setCarrinho(data);
        } catch (error) {
            console.error('Erro de conexão com o carrinho:', error);
        }
    }, [token]);

    const atualizarCarrinho = useCallback(async () => {
        await fetchCarrinho();
    }, [fetchCarrinho]);

    useEffect(() => {
        if (token) fetchCarrinho();
    }, [token, fetchCarrinho]);

    return (
        <CarrinhoContext.Provider value={{ carrinho, fetchCarrinho, atualizarCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    const context = useContext(CarrinhoContext);
    if (!context) throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
    return context;
}
