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
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { ServicoResponse } from "@/utils/types"
import { ptBR } from "date-fns/locale"

const agendamentoSchema = z.object({
    data: z.date({ error: "Data é obrigatória" }),
    hora: z.object({
        hour: z.number().min(0).max(23, "Hora inválida"),
        minute: z.number().min(0).max(59, "Minuto inválido"),
    }),
    idServico: z.number().min(1, "Serviço é obrigatório"),
})

type AgendamentoForm = z.infer<typeof agendamentoSchema>

export default function CreateProduto() {
    const [servico, setServico] = useState<ServicoResponse[]>([])

    const form = useForm<AgendamentoForm>({
        resolver: zodResolver(agendamentoSchema),
        defaultValues: {
            data: new Date(),
            hora: { hour: 9, minute: 0 },
            idServico: 0,
        },
    })

    async function fetchServico() {
        const response = await fetch("http://localhost:8080/servico/listar")
        if (response.ok) {
            const data = await response.json()
            setServico(data)
        }
    }

    useEffect(() => {
        fetchServico()
    }, [])

    const { reset } = form

    const onSubmit = async (data: AgendamentoForm) => {
        const token = document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1]

        if (!token) {
            toast({
                title: "Erro de autenticação",
                description: "Token não encontrado. Faça login novamente.",
                variant: "destructive",
            })
            return
        }

        const horaStr = `${String(data.hora.hour).padStart(2, "0")}:${String(data.hora.minute).padStart(2, "0")}:00`

        const payload = {
            data: format(data.data, "yyyy-MM-dd"),
            hora: horaStr,
            listaDeIdServico: [data.idServico],
        }

        try {
            console.log(JSON.stringify(payload))
            const response = await fetch("http://localhost:8080/agendamento/efetuar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Erro: ${errorText}`)
            }

            toast({
                title: "Sucesso!",
                description: "Agendamento cadastrado com sucesso!",
            })
            reset()
        } catch (error) {
            toast({
                title: "Erro ao cadastrar",
                description: "Verifique os dados e tente novamente.",
                variant: "destructive",
            })
        }
    }



    const hours = Array.from({ length: 24 }, (_, i) => i)
    const minutes = Array.from({ length: 60 }, (_, i) => i)

    return (
        <ScrollArea className="h-[47.4rem] w-[853px] pr-[50px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 pt-0">
                    <h1 className="text-m text-muted-foreground">Agendar Serviço</h1>

                    <FormField
                        control={form.control}
                        name="idServico"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Serviço *</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value ? String(field.value) : ""}
                                        onValueChange={(val) => field.onChange(Number(val))}
                                    >
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Selecione um serviço" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {servico.map((s) => (
                                                    <SelectItem key={s.id} value={String(s.id)}>
                                                        {s.descricao}
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

                    <FormField
                        control={form.control}
                        name="data"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Data *</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-[280px] justify-between font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? format(field.value, "dd/MM/yyyy") : "Selecione uma data"}
                                                <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            captionLayout="dropdown"
                                            onSelect={(date) => {
                                                field.onChange(date)
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4 w-[280px]">
                        <FormField
                            control={form.control}
                            name="hora.hour"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hora *</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={String(field.value)}
                                            onValueChange={(val) => field.onChange(Number(val))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="HH" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {hours.map((h) => (
                                                        <SelectItem key={h} value={String(h)}>
                                                            {String(h).padStart(2, "0")}
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

                        <FormField
                            control={form.control}
                            name="hora.minute"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Minuto *</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={String(field.value)}
                                            onValueChange={(val) => field.onChange(Number(val))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="MM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {minutes.map((m) => (
                                                        <SelectItem key={m} value={String(m)}>
                                                            {String(m).padStart(2, "0")}
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

                    <Button type="submit">Agendar</Button>
                </form>
            </Form>
        </ScrollArea>
    )
}
