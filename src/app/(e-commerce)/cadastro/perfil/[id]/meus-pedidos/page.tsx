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
import { Pedido } from "@/utils/types";

export default function MySells() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    async function fetchPedidos() {
        try {
            const token = document.cookie
                .split("; ")
                .find(row => row.startsWith("token="))
                ?.split("=")[1];

            const response = await fetch("http://localhost:8080/pedido/listar-e-commerce", {
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
        <Table>
            <TableCaption>Últimas vendas.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Data</TableHead>
                    <TableHead className="w-[700px]">Cliente</TableHead>
                    <TableHead className="text-left">Valor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pedidos.map((pedido) => {
                    const dataFormatada = new Date(pedido.dataHora);
                    const dia = String(dataFormatada.getDate()).padStart(2, "0");
                    const mes = String(dataFormatada.getMonth() + 1).padStart(2, "0");
                    const ano = dataFormatada.getFullYear();
                    const hora = String(dataFormatada.getHours()).padStart(2, "0");
                    const minuto = String(dataFormatada.getMinutes()).padStart(2, "0");

                    return (
                        <TableRow key={pedido.id}>
                            <TableCell>{`${dia}/${mes}/${ano}, ${hora}:${minuto}`}</TableCell>
                            <TableCell>{pedido.cliente}</TableCell>
                            <TableCell className="text-left">
                                {pedido.valorDaVenda.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">
                        {pedidos
                            .reduce((acc, curr) => acc + curr.valorDaVenda, 0)
                            .toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
