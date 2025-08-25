'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClienteResponse } from "@/utils/types";
import { PencilRuler } from "lucide-react";
import { useEffect, useState } from "react";

export default function CostumerCountCard() {
    const [clientes, setClientes] = useState<ClienteResponse[]>([]);

    async function fetchClientes() {
        const response = await fetch('http://localhost:8080/cliente/listar', {
            method: 'GET',
        });
        if (response.ok) {
            const data = await response.json();
            setClientes(data);
        };
    }
    useEffect(() => {
        fetchClientes();
    }, []);
    return (
        <Card>
            <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">Clientes</CardTitle>
                <PencilRuler className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent className="space-y-1">
                <span className="text-2xl font-bold tracking-tight">
                    {clientes.length}
                </span>
                <p className="text-xs text-muted-foreground">
                    Quantidade de clientes cadastrados
                </p>
            </CardContent>
        </Card>
    )
}