'use client'
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AgendamentoRequest } from "@/utils/types";

export default function MySells() {
    const [agendamentos, setAgendamentos] = useState<AgendamentoRequest[]>([]);

    async function fetchPedidos() {
        try {
            const token = document.cookie
                .split("; ")
                .find(row => row.startsWith("token="))
                ?.split("=")[1];

            const response = await fetch("http://localhost:8080/agendamento/listar-e-commerce", {
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

            const data: AgendamentoRequest[] = await response.json();
            setAgendamentos(data);
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        }
    }

    useEffect(() => {
        fetchPedidos();
    }, []);

    return (
        <Table>
            <TableCaption>Últimos agendamentos.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Data</TableHead>
                    <TableHead className="w-[700px]">Serviço</TableHead>
                    <TableHead className="text-left">Valor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {agendamentos.map((agendamento) => {
                    const dataFormatada = new Date(agendamento.dataHora);
                    const dia = String(dataFormatada.getDate()).padStart(2, "0");
                    const mes = String(dataFormatada.getMonth() + 1).padStart(2, "0");
                    const ano = dataFormatada.getFullYear();
                    const hora = String(dataFormatada.getHours()).padStart(2, "0");
                    const minuto = String(dataFormatada.getMinutes()).padStart(2, "0");

                    return (
                        <TableRow key={agendamento.id}>
                            <TableCell>{`${dia}/${mes}/${ano}, ${hora}:${minuto}`}</TableCell>
                            <TableCell>{agendamento.listaDeServicos.at(0)?.descricao}</TableCell>
                            <TableCell className="text-left">
                                {agendamento.listaDeServicos.at(0)?.preco.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    )
}
