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
                <TableCaption>Fim da lista de serviços.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Ações</TableHead>
                        <TableHead className="w-[200px]">Código</TableHead>
                        <TableHead className="w-[400px]">Serviço</TableHead>
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