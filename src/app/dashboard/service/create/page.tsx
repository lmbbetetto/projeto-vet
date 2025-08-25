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
import { servicoSchema, ServicoSchema } from "./schema"
import { toast } from "@/components/ui/use-toast"
import { ServicoRequest } from "@/utils/types"
import { createNewServico } from "./actions"

export default function CreateServico() {
    const form = useForm<ServicoSchema>({
        resolver: zodResolver(servicoSchema),
        defaultValues: {
            nome: "",
            descricao: "",
            preco: 0,
        },
    })

    const { reset } = form;

    const onSubmit = async (data: ServicoSchema) => {
        try {
            const payload: ServicoRequest = {
                nome: data.nome,
                descricao: data.descricao,
                preco: data.preco,
            };

            console.log("Payload do serviço:", payload);

            await createNewServico(payload);

            toast({
                title: "Sucesso!",
                description: "Serviço cadastrado com sucesso!",
            });

            reset();
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao cadastrar o serviço.",
                variant: "destructive",
            });
        }
    };

    return (
        <ScrollArea className="h-[47.4rem] w-[853px] pr-[50px]">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 p-2 pt-0"
                >
                    <h1 className="text-m text-muted-foreground">Dados do Serviço</h1>

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

                    <FormField
                        control={form.control}
                        name="preco"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preço *</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(e.target.value === "" ? "" : parseFloat(e.target.value))
                                        }
                                    />
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