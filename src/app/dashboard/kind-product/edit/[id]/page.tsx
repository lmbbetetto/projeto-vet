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
import { TipoProdutoRequest } from "@/utils/types";
import { tipoProdutoSchema, TipoProdutoSchema } from "../../create/schema";
import { updateTipoProduto } from "../../create/actions";

export default function UserPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const form = useForm<TipoProdutoSchema>({
        resolver: zodResolver(tipoProdutoSchema),
        defaultValues: {
            nome: "",
            descricao: "",
        },
    });

    const fetchTipoData = async (id: string) => {
        const response = await fetch(`http://localhost:8080/tipo-produto/buscar/${id}`, {
            method: 'GET',
        });
        if (!response.ok) throw new Error('Erro ao buscar produto');
        return response.json() as Promise<TipoProdutoRequest>;
    };

    useEffect(() => {
        fetchTipoData(id!);
        if (id) {
            fetchTipoData(id as string)
                .then((data: TipoProdutoRequest) => {
                    form.reset({
                        nome: data.nome,
                        descricao: data.descricao,
                    });
                })
                .catch((error) => console.error("Error fetching produto data:", error));
        } else {
            console.error("ID não encontrado na URL");
        }
    }, [form, id]);


    const onSubmit = async (data: TipoProdutoRequest) => {
        if (id) {
            try {
                const payload: TipoProdutoRequest = {
                    nome: data.nome,
                    descricao: data.descricao,
                };

                await updateTipoProduto(Number(id), payload);

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

                    <Button type="submit">Editar</Button>
                </form>
            </Form>
        </ScrollArea>
    );
}
