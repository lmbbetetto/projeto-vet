'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ProductRows } from "./product-row"

export default function SearchTeacher() {
    return (
        <main>
            <Table>
                <TableCaption>Fim da lista de produtos.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Ações</TableHead>
                        <TableHead className="w-[200px]">Código</TableHead>
                        <TableHead className="w-[400px]">Nome</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <ProductRows />
                </TableBody>
            </Table>
        </main>
    )
}