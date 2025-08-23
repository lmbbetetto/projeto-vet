'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

interface Aluno {
    id: number;
}

export default function SalesCountCard() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);

    async function fetchProfessors() {
        const response = await fetch('/api/aluno', {
            method: 'GET',
        });
        if (response.ok) {
            const data = await response.json();
            setAlunos(data);
        };
    }
    useEffect(() => {
        fetchProfessors();
    }, []);

    return (
        <Card>
            <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">Vendas</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>

            <CardContent className="space-y-1">
                <span className="text-2xl font-bold tracking-tight">
                    {alunos.length}
                </span>
                <p className="text-xs text-muted-foreground">
                    Quantidade de vendas cadastrados
                </p>
            </CardContent>
        </Card>
    )
}