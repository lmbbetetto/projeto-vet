'use client'
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pedido } from "@/utils/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

interface PedidoDetalhado {
    id: number;
    dataHora: string;
    status: string;
    total: number;
    cliente: {
        nome: string;
    };
    listaDeProdutos: {
        produto: { nome: string };
        qtde: number;
    }[];
}

export default function TableSalles() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState<PedidoDetalhado | null>(null);
    const [loadingPedido, setLoadingPedido] = useState(false);

    async function fetchPedidos() {
        try {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            const response = await fetch("http://localhost:8080/pedido/listar-dashboard", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
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

    async function fetchPedidoDetalhado(id: number) {
        try {
            setLoadingPedido(true);
            setPedidoSelecionado(null);

            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            const response = await fetch(`http://localhost:8080/pedido/buscar/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Erro HTTP:", response.status, text);
                throw new Error(`HTTP ${response.status}`);
            }

            const data: PedidoDetalhado = await response.json();
            setPedidoSelecionado(data);
        } catch (error) {
            console.error("Erro ao buscar detalhes do pedido:", error);
        } finally {
            setLoadingPedido(false);
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
                    <TableHead className="w-[150px]">Ações</TableHead>
                    <TableHead className="w-[150px]">Status</TableHead>
                    <TableHead className="w-[200px]">Data</TableHead>
                    <TableHead className="w-[400px]">Cliente</TableHead>
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
                    const statusFormatado =
                        pedido.statusPedido.charAt(0).toUpperCase() +
                        pedido.statusPedido.slice(1).toLowerCase();

                    return (
                        <TableRow key={pedido.id}>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() => fetchPedidoDetalhado(pedido.id)}
                                        >
                                            <EyeIcon className="h-3.5 w-3.5" />
                                            <span className="sr-only">Visualizar pedido</span>
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl">
                                                {pedido.cliente} -{" "}
                                                {pedido.valorDaVenda.toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                })}
                                            </DialogTitle>
                                        </DialogHeader>

                                        <DialogDescription asChild>
                                            <div className="mt-4">
                                                {loadingPedido ? (
                                                    <p>Carregando detalhes...</p>
                                                ) : pedidoSelecionado ? (
                                                    <>
                                                        <div className="mt-4">
                                                            <span className="text-black font-semibold">Dados da compra</span>
                                                            <div className="flex flex-col gap-1 ml-2 mt-2">
                                                                <span>{`${dia}/${mes}/${ano}, ${hora}:${minuto}`}</span>
                                                                <span>{statusFormatado}</span>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4">
                                                            <span className="text-black font-semibold">Produtos</span>
                                                            <div className="flex flex-col gap-2 ml-2 mt-2">
                                                                {pedidoSelecionado.listaDeProdutos.map((item, index) => (
                                                                    <div key={index} className="flex justify-between mr-20">
                                                                        <span>{item.produto.nome}</span>
                                                                        <span className="text-gray-500">Quantidade: {item.qtde}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <p>Nenhum detalhe encontrado.</p>
                                                )}
                                            </div>
                                        </DialogDescription>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>

                            <TableCell className="font-medium">{statusFormatado}</TableCell>
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
        </Table>
    );
}
