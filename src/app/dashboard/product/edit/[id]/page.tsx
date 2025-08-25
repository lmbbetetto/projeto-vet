'use client';

import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Select } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ProdutoRequest, ProdutoResponse, TipoProdutoResponse } from "@/utils/types";
import { ProdutoSchema, produtoSchema } from "./schema";
import { updateProduto } from "../../create/actions";

const fetchUserData = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:8080/produto/listar/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch user data", error);
        throw error;
    }
};

export default function UserPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const [tipoProduto, setTipoProduto] = useState<TipoProdutoResponse[]>([]);

    const form = useForm<ProdutoSchema>({
        resolver: zodResolver(produtoSchema),
        defaultValues: {},
    });

    async function fetchProfessors() {
        const response = await fetch('http://localhost:8080/tipo-produto/listar', {
            method: 'GET',
        });
        if (response.ok) {
            const data = await response.json();
            setTipoProduto(data);
        };
    }

    const fetchProdutoData = async (id: string) => {
        const response = await fetch(`http://localhost:8080/produto/listar/${id}`, {
            method: 'GET',
        });
        if (!response.ok) throw new Error('Erro ao buscar produto');
        return response.json() as Promise<ProdutoRequest>;
    };

    useEffect(() => {
        fetchProfessors();
        fetchProdutoData(id!);
        if (id) {
            fetchUserData(id as string)
                .then((data: ProdutoRequest) => {
                    form.reset({
                        nome: data.nome,
                        preco: data.preco,
                        qtdeEstoque: data.qtdeEstoque,
                        qtdeMinima: data.qtdeMinima,
                        idTipoProduto: data.idTipoProduto,
                    });
                })
                .catch((error) => console.error("Error fetching produto data:", error));
        } else {
            console.error("ID não encontrado na URL");
        }
    }, [form, id]);


    const onSubmit = async (data: ProdutoRequest) => {
        if (id) {
            try {
                const payload: ProdutoRequest = {
                    nome: data.nome,
                    preco: Number(data.preco),
                    qtdeEstoque: Number(data.qtdeEstoque),
                    qtdeMinima: Number(data.qtdeMinima),
                    idTipoProduto: Number(data.idTipoProduto),
                };

                await updateProduto(Number(id), payload);

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

                    <Button type="submit">Editar</Button>
                </form>
            </Form>
        </ScrollArea>
    );
}
