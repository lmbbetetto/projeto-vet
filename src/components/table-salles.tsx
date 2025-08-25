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

export default function TableSalles() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    console.log(pedidos)

    async function fetchPedidos() {
        try {
            const response = await fetch('http://localhost:8080/pedido/listar', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
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
                    <TableHead className="w-[150px]">Status</TableHead>
                    <TableHead className="w-[200px]">Data</TableHead>
                    <TableHead className="w-[700px]">Cliente</TableHead>
                    <TableHead className="text-left">Valor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                        <TableCell className="font-medium">{pedido.statusPedido}</TableCell>
                        <TableCell>{pedido.dataHora}</TableCell>
                        <TableCell>{pedido.cliente}</TableCell>
                        <TableCell className="text-left">
                            {pedido.valorDaVenda.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </TableCell>
                    </TableRow>
                ))}
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