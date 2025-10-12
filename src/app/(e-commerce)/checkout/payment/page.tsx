"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    IconCreditCard,
    IconArrowNarrowRight,
    IconCheck,
} from "@tabler/icons-react";
import QRCode from "react-qr-code";
import { EnderecoResponse } from "@/utils/types";
import { useCarrinho } from "@/providers/shopping-cart/cart-provider";


export default function Payment() {
    const [metodoPagamento, setMetodoPagamento] = useState<"cartao" | "pix">("cartao");
    const [nomeCartao, setNomeCartao] = useState("");
    const [numeroCartao, setNumeroCartao] = useState("");
    const [validade, setValidade] = useState("");
    const [cvv, setCvv] = useState("");
    const [endereco, setEndereco] = useState<EnderecoResponse>();
    const [gerarPix, setGerarPix] = useState(false);
    const [finalizado, setFinalizado] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const { fetchCarrinho } = useCarrinho();

    const codigoPixFalso = "123e4567-e89b-12d3-a456-426614174000";

    useEffect(() => {
        const tokenValue = document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1] ?? null;

        setToken(tokenValue);
    }, []);

    useEffect(() => {
        if (token) {
            fetchEndereco(token);
        }
    }, [token]);

    async function fetchEndereco(authToken: string) {
        try {
            const response = await fetch("http://localhost:8080/endereco/buscar", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
            });
            if (!response.ok) {
                console.error("Erro no backend:", response.status);
                return;
            }
            const data = await response.json();
            setEndereco(data);
        } catch (error) {
            console.error("Erro de conexão:", error);
        }
    }

    console.log(metodoPagamento)

    async function fetchFinalizarPedido(authToken: string) {
        try {
            const response = await fetch("http://localhost:8080/pedido/efetuar-pedido", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    tipo: metodoPagamento.toUpperCase()
                }),
            });
            await fetchCarrinho();
            if (!response.ok) {
                console.error("Erro no backend:", response.status);
                return;
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
        }
    }


    async function handleFinalizar() {
        if (!token) {
            console.error("Token não encontrado");
            return;
        }
        await fetchFinalizarPedido(token);

        if (metodoPagamento === "pix") {
            setGerarPix(true);
            setTimeout(() => {
                setFinalizado(true);
                setGerarPix(false);
            }, 5000);
        } else {
            setFinalizado(true);
        }
    }

    return (
        <main className="max-w-[40rem] mx-auto">
            <h1 className="text-2xl font-semibold mb-10">Pagamento</h1>

            {!finalizado ? (
                <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-md">
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                checked={metodoPagamento === "cartao"}
                                onChange={() => setMetodoPagamento("cartao")}
                            />
                            Cartão
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                checked={metodoPagamento === "pix"}
                                onChange={() => setMetodoPagamento("pix")}
                            />
                            PIX
                        </label>
                    </div>

                    {metodoPagamento === "cartao" && (
                        <>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="nome">Nome no cartão</Label>
                                <Input
                                    id="nome"
                                    placeholder="Ex: João Silva"
                                    value={nomeCartao}
                                    onChange={(e) => setNomeCartao(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="numero">Número do cartão</Label>
                                <Input
                                    id="numero"
                                    placeholder="1234 5678 9012 3456"
                                    value={numeroCartao}
                                    onChange={(e) => setNumeroCartao(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 w-1/2">
                                    <Label htmlFor="validade">Validade</Label>
                                    <Input
                                        id="validade"
                                        placeholder="MM/AA"
                                        value={validade}
                                        onChange={(e) => setValidade(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-1/2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input
                                        id="cvv"
                                        placeholder="123"
                                        type="password"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {gerarPix && metodoPagamento === "pix" && (
                        <div className="flex flex-col items-center gap-4 mt-4">
                            <QRCode value={codigoPixFalso} size={150} />
                            <p className="text-gray-700 font-mono">{codigoPixFalso}</p>
                            <p className="text-gray-500">Aguardando confirmação do PIX...</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-2 mt-4">
                        <Label>Endereço de entrega</Label>
                        <Select onValueChange={(value) => console.log(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione um endereço" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={String(endereco?.id)}>
                                    {endereco?.logradouro}, {endereco?.numero} - {endereco?.cidade}/{endereco?.estado}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {!gerarPix && (
                        <Button
                            onClick={handleFinalizar}
                            className="bg-black rounded-4xl w-full mt-6 py-6 text-lg"
                        >
                            <div className="flex items-center gap-3">
                                <IconCreditCard />
                                <p>Finalizar Pagamento</p>
                                <IconArrowNarrowRight />
                            </div>
                        </Button>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-6 bg-white p-10 rounded-2xl shadow-md">
                    <IconCheck className="text-green-600 w-12 h-12" />
                    <h2 className="text-xl font-semibold">Pagamento concluído!</h2>
                    <p className="text-gray-500">Obrigado pela sua compra 💳🎉</p>
                </div>
            )}
        </main>
    );
}
