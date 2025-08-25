import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ClienteResponse } from "@/utils/types";

export function CostumerRows() {
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
                                                        <span>{cliente.telefone}</span>
                                                        <span>{cliente.cpf}</span>
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
                                        </DialogContent>
                                    </Dialog>
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
                    <TableCell className="font-medium">
                        {cliente.status.charAt(0).toUpperCase() + cliente.status.slice(1).toLowerCase()}
                    </TableCell>
                </TableRow >
            ))
            }
        </>
    )
}