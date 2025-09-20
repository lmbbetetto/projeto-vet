'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pedido } from "@/utils/types";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function SalesCountCard() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    async function fetchPedidos() {
        try {
            const token = document.cookie
                .split("; ")
                .find(row => row.startsWith("token="))
                ?.split("=")[1];

            const response = await fetch("http://localhost:8080/pedido/listar-dashboard", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Erro HTTP:", response.status, text);
                throw new Error(`HTTP ${response.status}`);
            }

            const data: Pedido[] = await response.json();
            setPedidos(data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    }

    useEffect(() => {
        fetchPedidos();
    }, []);

    return (
        <Card>
            <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">Vendas</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent className="space-y-1">
                <span className="text-2xl font-bold tracking-tight">
                    {pedidos.length}
                </span>
                <p className="text-xs text-muted-foreground">
                    Quantidade de vendas cadastrados
                </p>
            </CardContent>
        </Card>
    )
}