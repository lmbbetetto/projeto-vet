'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pedido, ServicoResponse } from "@/utils/types";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function ServiceCountCard() {
    const [servicos, setServicos] = useState<ServicoResponse[]>([]);

    async function fetchServicos() {
        try {
            const token = document.cookie
                .split("; ")
                .find(row => row.startsWith("token="))
                ?.split("=")[1];

            const response = await fetch("http://localhost:8080/servico/listar", {
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

            const data: ServicoResponse[] = await response.json();
            setServicos(data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    }

    useEffect(() => {
        fetchServicos();
    }, []);

    return (
        <Card>
            <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">Serviços</CardTitle>
                <BookOpen className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent className="space-y-1">
                <span className="text-2xl font-bold tracking-tight">
                    {servicos.length}
                </span>
                <p className="text-xs text-muted-foreground">
                    Quantidade de serviços cadastrados
                </p>
            </CardContent>
        </Card>
    )
}