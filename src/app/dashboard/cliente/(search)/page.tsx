'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CostumerRows } from "./costumer-row"

export default function SearchCostumers() {
    return (
        <main>
            <Table>
                <TableCaption>Fim da lista de clientes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Ações</TableHead>
                        <TableHead className="w-[200px]">Código</TableHead>
                        <TableHead className="w-[400px]">Nome</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <CostumerRows />
                </TableBody>
            </Table>
        </main>
    )
}