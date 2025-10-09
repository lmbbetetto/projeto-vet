'use client'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/utils/routes";
import { AgendamentoRequest } from "@/utils/types";

export function ServicoRows() {
    const [agendamentos, setAgendamentos] = useState<AgendamentoRequest[]>([]);

    async function fetchAgendamento() {
        try {
            const response = await fetch("http://localhost:8080/agendamento/listar-dashboard", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setAgendamentos(data);
            }
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        }
    }

    useEffect(() => {
        fetchAgendamento();
    }, []);

    return (
        <>
            {agendamentos.map((agendamento) => {
                const data = new Date(agendamento.dataHora);
                const dia = String(data.getDate()).padStart(2, "0");
                const mes = String(data.getMonth() + 1).padStart(2, "0");
                const ano = data.getFullYear();
                const hora = String(data.getHours()).padStart(2, "0");
                const minuto = String(data.getMinutes()).padStart(2, "0");
                const dataFormatada = `${dia}/${mes}/${ano} - ${hora}:${minuto}`;

                return (
                    <TableRow key={agendamento.id}>
                        <TableCell>
                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <EyeIcon className="h-4 w-4" />
                                            <span className="sr-only">Visualizar serviço</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl">
                                                {dataFormatada}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <DialogDescription asChild>
                                            <div className="flex flex-col gap-1 ml-2">
                                                <span>
                                                    {agendamento.listaDeServicos?.[0]?.descricao ?? "Serviço não informado"}
                                                </span>
                                                <span>
                                                    {agendamento.cliente.nome}
                                                </span>
                                                <span>
                                                    {agendamento.total.toLocaleString("pt-BR", {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    })}
                                                </span>
                                            </div>
                                        </DialogDescription>
                                        <DialogFooter>
                                            <Link href={routes.service.edit(String(agendamento.id))}>
                                                <Button variant="outline">Editar</Button>
                                            </Link>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </TableCell>

                        <TableCell className="font-mono text-xs font-medium">
                            {agendamento.id}
                        </TableCell>
                        <TableCell className="font-medium">{dataFormatada}</TableCell>
                        <TableCell className="font-medium">{agendamento.cliente.nome}</TableCell>
                        <TableCell className="font-medium">
                            {agendamento.total.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </TableCell>
                        <TableCell className="font-medium">
                            {agendamento.status.charAt(0).toUpperCase() +
                                agendamento.status.slice(1).toLowerCase()}
                        </TableCell>
                    </TableRow>
                );
            })}
        </>
    );
}
