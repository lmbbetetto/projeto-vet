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
import { ClienteResponse } from "@/utils/types";
import { z } from "zod";
import { clienteSchema } from "./schema";
import { StatusCliente } from "@/utils/enum";

export default function EditProduto() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const form = useForm<ClienteResponse>({
        resolver: zodResolver(clienteSchema),
        defaultValues: {
            id: 0,
            nome: "",
            cpf: "",
            telefone: "",
            email: "",
            enderecoResponse: {
                id: 0,
                logradouro: "",
                numero: "",
                bairro: "",
                cep: "",
                cidade: "",
                estado: "",
                complemento: ""
            },
            status: StatusCliente.ATIVO
        }
    });

    const { reset } = form;

    async function fetchClienteData(id: string) {
        const response = await fetch(`http://localhost:8080/cliente/buscar/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar produto");
        const data: ClienteResponse = await response.json();
        reset({
            nome: data.nome,
            cpf: data.cpf,
            telefone: data.telefone,
            email: data.email,
            enderecoResponse: {
                id: data.enderecoResponse.id,
                logradouro: data.enderecoResponse.logradouro,
                numero: data.enderecoResponse.numero,
                bairro: data.enderecoResponse.bairro,
                cep: data.enderecoResponse.cep,
                cidade: data.enderecoResponse.cidade,
                estado: data.enderecoResponse.estado,
                complemento: data.enderecoResponse.complemento ?? ""
            },
        });
    }

    useEffect(() => {
        if (id) fetchClienteData(id).catch(console.error);
    }, [id]);

    const onSubmit = async (data: ClienteResponse) => {
        // if (!id) return;

        // try {
        //     const payload = {
        //         nome: data.nome,
        //         preco: data.preco,
        //         qtdeEstoque: data.qtdeEstoque,
        //         qtdeMinima: data.qtdeMinima,
        //         idTipoProduto: data.idTipoProduto,
        //     };

        //     const updateResponse = await fetch(`http://localhost:8080/produto/atualizar/${id}`, {
        //         method: "PUT",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(payload),
        //     });

        //     if (!updateResponse.ok) throw new Error("Erro ao atualizar produto");

        //     toast({ title: "Sucesso!", description: "Produto atualizado com sucesso!" });
        //     setPreview(null);
        // } catch (err) {
        //     console.error(err);
        //     toast({ title: "Erro", description: "Ocorreu um erro ao atualizar o produto.", variant: "destructive" });
        // }
    };

    return (
        <ScrollArea className="h-[47.4rem] w-[1300px] pr-[50px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 pt-0">
                    <h1 className="text-m text-muted-foreground">Perfil do Usuário</h1>
                    <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome completo *</FormLabel>
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
                            name="cpf"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="telefone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefone *</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="tel" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail *</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <h1 className="pt-6 text-m text-muted-foreground">Endereço</h1>
                    <div className="grid grid-cols-4 gap-4">
                        <FormField
                            control={form.control}
                            name="enderecoResponse.logradouro"
                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormLabel>Rua *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="enderecoResponse.numero"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel>Número *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="enderecoResponse.bairro"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bairro *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="enderecoResponse.cep"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CEP *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="enderecoResponse.cidade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cidade *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="enderecoResponse.estado"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="enderecoResponse.complemento"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Complemento</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Atualizar</Button>
                </form>
            </Form>
        </ScrollArea>
    );
}
