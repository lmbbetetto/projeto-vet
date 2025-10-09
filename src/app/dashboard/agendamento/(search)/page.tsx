'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ServicoRows } from "./service-row"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { routes } from "@/utils/routes"


export default function SearchTeacher() {
    return (
        <main>
            <Table>
                <TableCaption>Fim da lista de agendamentos.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Ações</TableHead>
                        <TableHead className="w-[100px]">Código</TableHead>
                        <TableHead className="w-[200px]">Data</TableHead>
                        <TableHead className="w-[350px]">Cliente</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <ServicoRows />
                </TableBody>
            </Table>
        </main>
    )
}