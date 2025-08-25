import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { EyeIcon, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { routes } from "@/utils/routes";
import { ProdutoResponse } from "@/utils/types";

export function ProductRows() {
    const [products, setProducts] = useState<ProdutoResponse[]>([]);

    async function fetchProdutos() {
        const response = await fetch('http://localhost:8080/produto/listar', {
            method: 'GET',
        })
        if (response.ok) {
            const data = await response.json()
            setProducts(data);
        }
    }

    useEffect(() => {
        fetchProdutos();
    }, [])

    const handleDeleteProduto = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/produto/atualizar-status/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                toast({
                    title: "Sucesso",
                    description: "Tipo de produto excluído com sucesso.",
                });
                fetchProdutos();
            } else {
                toast({
                    title: "Erro",
                    description: "Não foi possível excluir o tipo de produto.",
                });
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível excluir o tipo de produto.",
            });
        }
    };

    return (
        <>
            {products.map((product) => (
                <TableRow key={product.id}>
                    <TableCell>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">
                                                <EyeIcon className="h-3.5 w-3.5" />
                                                <span className="sr-only">Visualizar product</span>
                                            </Button></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl">{product.nome}</DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription className="flex flex-col gap-1 ml-2 mt-4">
                                                <span>Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco)}</span>
                                                <span>Quantidade em estoque: {product.qtdeEstoque}</span>
                                                <span>Quantidade mínima: {product.qtdeMinima}</span>
                                                <span>Tipo: {product.tipoProdutoResponse.descricao}</span>
                                            </DialogDescription>
                                            <DialogFooter>
                                                <Link href={routes.product.edit(product.id.toString())}>
                                                    <Button variant={"outline"}>Editar</Button>
                                                </Link>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline">
                                                <Trash2 className="h-3.5 w-3.5" />
                                                <span className="sr-only">Excluir produto</span>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Excluir produto?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Excluindo este produto, ele será removido do sistema!
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteProduto(product.id.toString())}>Excluir</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </DialogTrigger>
                        </Dialog>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">
                        {product.id}
                    </TableCell>
                    <TableCell className="font-medium">
                        {product.nome}
                    </TableCell>
                    <TableCell className="font-medium">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco)}
                    </TableCell>
                    <TableCell className="font-medium">
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1).toLowerCase()}
                    </TableCell>
                </TableRow >
            ))
            }
        </>
    )
}