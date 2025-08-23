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
import { ClienteResponse } from "@/utils/types";

export function StudentsRows() {
    const [clientes, setClientes] = useState<ClienteResponse[]>([]);

    async function fetchAlunos() {
        const response = await fetch('http://localhost:8080/cliente/listar', {
            method: 'GET',
        })
        if (response.ok) {
            const data = await response.json()
            setClientes(data);
        }
    }

    useEffect(() => {
        fetchAlunos();
    }, [])

    const handleDeleteAluno = async (id: string) => {
        try {
            const response = await fetch('http://localhost:8080/cliente/listar', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
            if (response.ok) {
                toast({
                    title: "Sucesso",
                    description: "Professor excluído com sucesso.",
                })
                fetchAlunos()
            } else {
                toast({
                    title: "Erro",
                    description: "Professor excluído sem sucesso.",
                })
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Professor excluído sem sucesso.",
            })
        }
    }

    return (
        <>
            {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                    <TableCell>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">
                                                <EyeIcon className="h-3.5 w-3.5" />
                                                <span className="sr-only">Visualizar cliente</span>
                                            </Button></DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl">{cliente.nome}</DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription>
                                                <div className="mt-4">
                                                    <span className="text-white">Dados pessoais</span>
                                                    <div className="flex flex-col gap-1 ml-2">
                                                        <p>{cliente.telefone}</p>
                                                        <p>{cliente.cpf}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <span className="text-white">Endereço</span>
                                                    <div className="flex flex-col gap-1 ml-2">
                                                        <span>{cliente.enderecoResponse.logradouro}, {cliente.enderecoResponse.numero} - {cliente.enderecoResponse.complemento}</span>
                                                        <span>{cliente.enderecoResponse.bairro}</span>
                                                        <span>{cliente.enderecoResponse.cidade} - {cliente.enderecoResponse.estado}</span>
                                                    </div>
                                                </div>
                                            </DialogDescription>
                                            <DialogFooter>
                                                {/* <Link href={routes.cliente.edit(cliente.id)}> */}
                                                <Link href={"/"}>
                                                    <Button variant={"outline"}>Editar</Button>
                                                </Link>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline">
                                                <Trash2 className="h-3.5 w-3.5" />
                                                <span className="sr-only">Excluir aluno</span>
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Excluir aluno?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta ação não poderá ser desfeita. Excluindo este aluno, ele será removido permanentemente do sistema!
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteAluno(cliente.id.toString())}>Excluir</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </DialogTrigger>
                        </Dialog>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-medium">
                        {cliente.id}
                    </TableCell>
                    <TableCell className="font-medium">
                        {cliente.nome}
                    </TableCell>
                    <TableCell className="font-medium">
                        {cliente.telefone}
                    </TableCell>
                </TableRow >
            ))
            }
        </>
    )
}