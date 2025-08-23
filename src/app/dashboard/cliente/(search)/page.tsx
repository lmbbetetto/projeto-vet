'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { StudentsRows } from "./costumer-row"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { routes } from "@/utils/routes"


export default function SearchTeacher() {
    return (
        <main className="mt-6">
            <div className="flex gap-4">
                <Button className="mb-10"><Link href={routes.cliente.new}>Novo cliente</Link></Button>
            </div>
            <Table>
                <TableCaption>Fim da lista de clientes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Ações</TableHead>
                        <TableHead className="w-[200px]">Código</TableHead>
                        <TableHead className="w-[400px]">Nome</TableHead>
                        <TableHead>Telefone</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <StudentsRows />
                </TableBody>
            </Table>
        </main>
    )
}