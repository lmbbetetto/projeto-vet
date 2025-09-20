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
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { routes } from "@/utils/routes";
import { ServicoResponse } from "@/utils/types";

export function ServicoRows() {
    const [servicos, setServicos] = useState<ServicoResponse[]>([]);

    async function fetchService() {
        const response = await fetch("http://localhost:8080/servico/listar", {
            method: "GET",
        });
        if (response.ok) {
            const data = await response.json();
            setServicos(data);
        }
    }

    useEffect(() => {
        fetchService();
    }, []);

    const handleDeleteservice = async (id: string) => {
        try {
            const response = await fetch(
                `http://localhost:8080/servico/atualizar-status/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.ok) {
                toast({
                    title: "Sucesso",
                    description: "Serviço excluído com sucesso.",
                });
                fetchService();
            } else {
                toast({
                    title: "Erro",
                    description: "Não foi possível excluir o serviço.",
                });
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível excluir o serviço.",
            });
        }
    };

    return (
        <>
            {servicos.map((servico) => (
                <TableRow key={servico.id}>
                    <TableCell>
                        <div className="flex gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <EyeIcon className="h-3.5 w-3.5" />
                                        <span className="sr-only">Visualizar serviço</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl">{servico.nome}</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription asChild>
                                        <div className="flex flex-col gap-1 ml-2">
                                            <span>{servico.descricao}</span>
                                            <span>
                                                {servico.preco.toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                })}
                                            </span>
                                        </div>
                                    </DialogDescription>
                                    <DialogFooter>
                                        <Link href={routes.service.edit(String(servico.id))}>
                                            <Button variant={"outline"}>Editar</Button>
                                        </Link>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline">
                                        <Trash2 className="h-3.5 w-3.5" />
                                        <span className="sr-only">Excluir serviço</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Excluir serviço?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Excluindo este serviço, ele será removido do sistema!
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDeleteservice(servico.id.toString())}
                                        >
                                            Excluir
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </TableCell>

                    <TableCell className="font-mono text-xs font-medium">
                        {servico.id}
                    </TableCell>
                    <TableCell className="font-medium">{servico.nome}</TableCell>
                    <TableCell className="font-medium">
                        {servico.preco.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </TableCell>
                    <TableCell className="font-medium">
                        {servico.status.charAt(0).toUpperCase() +
                            servico.status.slice(1).toLowerCase()}
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
