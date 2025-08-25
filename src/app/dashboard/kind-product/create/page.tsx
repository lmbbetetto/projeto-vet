'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { TipoProdutoRequest } from "@/utils/types"
import { TipoProdutoSchema, tipoProdutoSchema } from "./schema"
import { createNewTipoProduto } from "./actions"

export default function CreateTipoProduto() {
    const form = useForm<TipoProdutoSchema>({
        resolver: zodResolver(tipoProdutoSchema),
        defaultValues: {
            nome: "",
            descricao: ""
        }
    })

    const { reset } = form

    const onSubmit = async (data: TipoProdutoRequest) => {
        try {
            const payload: TipoProdutoRequest = {
                nome: data.nome,
                descricao: data.descricao
            }

            await createNewTipoProduto(payload)

            toast({
                title: "Sucesso!",
                description: "Tipo de produto cadastrado com sucesso!",
            })

            reset()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao cadastrar o tipo de produto.",
                variant: "destructive",
            })
        }
    }

    return (
        <ScrollArea className="h-[47.4rem] w-[853px] pr-[50px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 pt-0">
                    <h1 className="text-m text-muted-foreground">Dados do Tipo de Produto</h1>

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

                    <FormField
                        control={form.control}
                        name="descricao"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição *</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Cadastrar</Button>
                </form>
            </Form>
        </ScrollArea>
    )
}
