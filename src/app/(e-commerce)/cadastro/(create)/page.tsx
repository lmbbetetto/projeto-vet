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
import { ClienteSchema, clienteSchema } from "./schema"
import { toast } from "@/components/ui/use-toast"
import { ClienteRequest } from "@/utils/types"
import { createNewCliente } from "./actions"

export default function CadastroCliente() {
    const form = useForm<ClienteRequest>({
        resolver: zodResolver(clienteSchema),
        defaultValues: {
            nome: "",
            cpf: "",
            telefone: "",
            email: "",
            enderecoRequest: {
                logradouro: "",
                numero: "",
                bairro: "",
                cep: "",
                cidade: "",
                estado: "",
                complemento: ""
            },
            authRequest: {
                login: "",
                password: ""
            }
        }
    });

    const { reset } = form;

    const onSubmit = async (data: ClienteSchema) => {
        try {
            const payload: ClienteRequest = {
                nome: data.nome,
                cpf: data.cpf,
                telefone: data.telefone,
                email: data.email,
                enderecoRequest: {
                    logradouro: data.enderecoRequest.logradouro,
                    numero: data.enderecoRequest.numero,
                    bairro: data.enderecoRequest.bairro,
                    cep: data.enderecoRequest.cep,
                    cidade: data.enderecoRequest.cidade,
                    estado: data.enderecoRequest.estado,
                    complemento: data.enderecoRequest.complemento ?? ""
                },
                authRequest: {
                    login: data.authRequest.login,
                    password: data.authRequest.password
                }
            };

            await createNewCliente(payload);

            toast({
                title: "Sucesso!",
                description: "Cliente cadastrado com sucesso!",
            });

            reset();
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao cadastrar o cliente.",
                variant: "destructive",
            });
        }
    };

    return (
        <ScrollArea className="h-[47.4rem] w-[853px] pr-[50px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 pt-0">
                    <h1 className="text-m text-muted-foreground">Dados do cliente</h1>
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
                            name="enderecoRequest.logradouro"
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
                            name="enderecoRequest.numero"
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
                            name="enderecoRequest.bairro"
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
                            name="enderecoRequest.cep"
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
                            name="enderecoRequest.cidade"
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
                            name="enderecoRequest.estado"
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
                        name="enderecoRequest.complemento"
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
                    <h1 className="pt-6 text-m text-muted-foreground">Acesso</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="authRequest.login"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Login *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="authRequest.password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha *</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
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