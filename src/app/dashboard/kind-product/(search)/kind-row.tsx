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
import { TipoProdutoResponse } from "@/utils/types";

export function KindRows() {
    const [tipoProdutos, setTipoProdutos] = useState<TipoProdutoResponse[]>([]);

    async function fetchKind() {
        const response = await fetch('http://localhost:8080/tipo-produto/listar', {
            method: 'GET',
        })
        if (response.ok) {
            const data = await response.json()
            setTipoProdutos(data);
        }
    }

    useEffect(() => {
        fetchKind();
    }, [])

    const handleDeleteTipoProduto = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/tipo-produto/atualizar-status/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                toast({
                    title: "Sucesso",
                    description: "Tipo de produto excluído com sucesso.",
                });
                fetchKind();
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
            {tipoProdutos.map((tipo) => (
                <TableRow key={tipo.id}>
                    <TableCell>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">
                                                <EyeIcon className="h-3.5 w-3.5" />
                                                <span className="sr-only">Visualizar tipo</span>
                                            </Button></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl">{tipo.nome}</DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription asChild>
                                                <div className="flex flex-col gap-1 ml-2 mt-4">
                                                    <span>{tipo.descricao}</span>
                                                </div>
                                            </DialogDescription>
                                            <DialogFooter>
                                                <Link href={routes.kindProduct.edit(String(tipo.id))}>
                                                    <Button variant={"outline"}>Editar</Button>
                                                </Link>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline">
                                                <Trash2 className="h-3.5 w-3.5" />
                                                <span className="sr-only">Excluir tipo de produto</span>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Excluir tipo do produto?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Excluindo este tipo de produto, ele será removido do sistema!
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteTipoProduto(tipo.id.toString())}>Excluir</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </DialogTrigger>
                        </Dialog>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">
                        {tipo.id}
                    </TableCell>
                    <TableCell className="font-medium">
                        {tipo.nome}
                    </TableCell>
                    <TableCell className="font-medium">
                        {tipo.descricao}
                    </TableCell>
                    <TableCell className="font-medium">
                        {tipo.status.charAt(0).toUpperCase() + tipo.status.slice(1).toLowerCase()}
                    </TableCell>
                </TableRow >
            ))
            }
        </>
    )
}