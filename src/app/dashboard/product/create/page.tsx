'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { createNewProduto } from "./actions"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { TipoProdutoResponse } from "@/utils/types"

const produtoSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    preco: z.number().min(0, "Preço inválido"),
    qtdeEstoque: z.number().min(0, "Quantidade em estoque inválida"),
    qtdeMinima: z.number().min(0, "Quantidade mínima inválida"),
    idTipoProduto: z.number().min(1, "Tipo de produto é obrigatório"),
})

type ProdutoForm = z.infer<typeof produtoSchema>

export default function CreateProduto() {
    const [tipoProduto, setTipoProduto] = useState<TipoProdutoResponse[]>([]);
    const form = useForm<ProdutoForm>({
        resolver: zodResolver(produtoSchema),
        defaultValues: {
            nome: "",
            preco: 0,
            qtdeEstoque: 0,
            qtdeMinima: 0,
            idTipoProduto: 0,
        }
    })

    async function fetchProfessors() {
        const response = await fetch('http://localhost:8080/tipo-produto/listar', {
            method: 'GET',
        });
        if (response.ok) {
            const data = await response.json();
            setTipoProduto(data);
        };
    }

    useEffect(() => {
        fetchProfessors();
    }, []);

    const { reset } = form

    const onSubmit = async (data: ProdutoForm) => {
        const payload = {
            ...data,
            preco: Number(data.preco),
            qtdeEstoque: Number(data.qtdeEstoque),
            qtdeMinima: Number(data.qtdeMinima),
            idTipoProduto: Number(data.idTipoProduto),
        }
        try {
            await createNewProduto(payload)
            toast({
                title: "Sucesso!",
                description: "Produto cadastrado com sucesso!",
            })
            reset()
        } catch {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao cadastrar o produto.",
                variant: "destructive",
            })
        }
    }

    return (
        <ScrollArea className="h-[47.4rem] w-[853px] pr-[50px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 pt-0">
                    <h1 className="text-m text-muted-foreground">Dados do produto</h1>

                    <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome *</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="preco"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço *</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" onChange={e => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="idTipoProduto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Produto *</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value ? String(field.value) : ""}
                                            onValueChange={(val) => field.onChange(Number(val))}
                                        >
                                            <SelectTrigger className="w-[280px]">
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {tipoProduto.map((tipo) => (
                                                        <SelectItem key={tipo.id} value={String(tipo.id)}>
                                                            {tipo.descricao}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="qtdeEstoque"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantidade em Estoque *</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" onChange={e => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="qtdeMinima"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantidade Mínima *</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" onChange={e => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit">Cadastrar</Button>
                </form>
            </Form>
        </ScrollArea>
    )
}
