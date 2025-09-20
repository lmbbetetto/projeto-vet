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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { TipoProdutoResponse } from "@/utils/types"

const produtoSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    preco: z.number().min(0, "Preço inválido"),
    qtdeEstoque: z.number().min(0, "Quantidade em estoque inválida"),
    qtdeMinima: z.number().min(0, "Quantidade mínima inválida"),
    idTipoProduto: z.number().min(1, "Tipo de produto é obrigatório"),
    imagem: z.instanceof(File).optional()
})

type ProdutoForm = z.infer<typeof produtoSchema>

export default function CreateProduto() {
    const [tipoProduto, setTipoProduto] = useState<TipoProdutoResponse[]>([])
    const [preview, setPreview] = useState<string | null>(null)
    const form = useForm<ProdutoForm>({
        resolver: zodResolver(produtoSchema),
        defaultValues: {
            nome: "",
            preco: 0,
            qtdeEstoque: 0,
            qtdeMinima: 0,
            idTipoProduto: 0,
            imagem: undefined
        }
    })

    async function fetchTiposProduto() {
        const response = await fetch('http://localhost:8080/tipo-produto/listar', { method: 'GET' })
        if (response.ok) {
            const data = await response.json()
            setTipoProduto(data)
        }
    }

    useEffect(() => {
        fetchTiposProduto()
    }, [])

    const { reset, setValue } = form

    const onSubmit = async (data: ProdutoForm) => {
        if (data.imagem && data.imagem.size > 1024 * 1024) {
            toast({ title: "Erro", description: "A imagem deve ter no máximo 1MB.", variant: "destructive" })
            return
        }

        try {
            const productPayload = {
                nome: data.nome,
                preco: data.preco,
                qtdeEstoque: data.qtdeEstoque,
                qtdeMinima: data.qtdeMinima,
                idTipoProduto: data.idTipoProduto,
            }

            const createResponse = await fetch('http://localhost:8080/produto/cadastrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productPayload)
            })

            if (!createResponse.ok) {
                const errorText = await createResponse.text()
                throw new Error(`Erro ao cadastrar produto: ${errorText}`)
            }

            const createdProduct = await createResponse.json()

            if (data.imagem instanceof File) {
                const formData = new FormData()
                formData.append("foto", data.imagem)

                const fotoResponse = await fetch(`http://localhost:8080/produto/atualizar-foto/${createdProduct.id}`, {
                    method: 'PUT',
                    body: formData
                })

                if (!fotoResponse.ok) {
                    const errorText = await fotoResponse.text()
                    console.error("Erro ao atualizar foto:", fotoResponse.status, errorText)
                }
            }

            toast({ title: "Sucesso!", description: "Produto cadastrado com sucesso!" })
            reset()
            setPreview(null)
        } catch (err) {
            console.error(err)
            toast({ title: "Erro", description: "Ocorreu um erro ao cadastrar o produto.", variant: "destructive" })
        }
    }

    return (
        <ScrollArea className="h-[47.4rem] w-[853px] pr-[50px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 pt-0">
                    <h1 className="text-m text-muted-foreground">Dados do produto</h1>

                    <FormField
                        control={form.control}
                        name="imagem"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagem *</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] ?? null
                                            field.onChange(file)
                                            if (file) {
                                                setValue("imagem", file)
                                                setPreview(URL.createObjectURL(file))
                                                if (file.size > 1024 * 1024) {
                                                    toast({ title: "Erro", description: "A imagem deve ter no máximo 1MB.", variant: "destructive" })
                                                }
                                            } else {
                                                setPreview(null)
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                                {preview && <img src={preview} alt="preview" className="mt-2 w-48 h-48 object-cover rounded" />}
                            </FormItem>
                        )}
                    />

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
                                        <Input
                                            type="text"
                                            value={field.value ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(field.value)) : ""}
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/\D/g, "")
                                                field.onChange(Number(rawValue) / 100)
                                            }}
                                        />
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
                                                        <SelectItem key={tipo.id} value={String(tipo.id)}>{tipo.descricao}</SelectItem>
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
                                        <Input {...field} type="text" onChange={(e) => field.onChange(Number(e.target.value))} />
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
                                        <Input {...field} type="text" onChange={(e) => field.onChange(Number(e.target.value))} />
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
