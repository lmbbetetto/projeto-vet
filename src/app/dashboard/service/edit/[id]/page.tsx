'use client';

import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ServicoRequest, TipoProdutoRequest } from "@/utils/types";
import { servicoSchema, ServicoSchema } from "../../create/schema";
import { updateServico } from "../../create/actions";

export default function UserPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const [tipoProduto, setTipoProduto] = useState<ServicoRequest[]>([]);

    const form = useForm<ServicoSchema>({
        resolver: zodResolver(servicoSchema),
        defaultValues: {
            nome: "",
            descricao: "",
            preco: 0,
        },
    });

    const fetchServiceData = async (id: string) => {
        const response = await fetch(`http://localhost:8080/servico/buscar/${id}`, {
            method: 'GET',
        });
        if (!response.ok) throw new Error('Erro ao buscar produto');
        return response.json() as Promise<ServicoRequest>;
    };

    useEffect(() => {
        fetchServiceData(id!);
        if (id) {
            fetchServiceData(id as string)
                .then((data: ServicoRequest) => {
                    form.reset({
                        nome: data.nome,
                        descricao: data.descricao,
                        preco: data.preco
                    });
                })
                .catch((error) => console.error("Error fetching produto data:", error));
        } else {
            console.error("ID não encontrado na URL");
        }
    }, [form, id]);


    const onSubmit = async (data: ServicoRequest) => {
        if (id) {
            try {
                const payload: ServicoRequest = {
                    nome: data.nome,
                    descricao: data.descricao,
                    preco: data.preco
                };

                await updateServico(Number(id), payload);

                toast({
                    title: "Sucesso!",
                    description: "Produto editado com sucesso!",
                });
            } catch (error) {
                toast({
                    title: "Erro",
                    description: "Ocorreu um erro ao editar o produto.",
                    variant: "destructive",
                });
            }
        } else {
            console.error("ID não encontrado na URL");
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
                                        type="text"
                                        value={
                                            field.value !== undefined && field.value !== null && field.value !== 0
                                                ? new Intl.NumberFormat("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }).format(Number(field.value))
                                                : ""
                                        }
                                        onChange={(e) => {
                                            const rawValue = e.target.value.replace(/\D/g, "");
                                            const numericValue = Number(rawValue) / 100;
                                            field.onChange(numericValue);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Editar</Button>
                </form>
            </Form>
        </ScrollArea>
    );
}
