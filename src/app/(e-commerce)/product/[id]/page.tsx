"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProdutoResponse } from "@/utils/types";
import { toast } from "@/components/ui/use-toast";
import { useCarrinho } from "@/providers/shopping-cart/cart-provider";

export default function ProdutoPage() {
    const [produto, setProduto] = useState<ProdutoResponse>();
    const [quantidade, setQuantidade] = useState(1);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { fetchCarrinho } = useCarrinho();

    const fetchProdutoData = async (id: string) => {
        const response = await fetch(`http://localhost:8080/produto/buscar/${id}`, {
            method: "GET",
        });
        if (response.ok) {
            const data = await response.json();
            setProduto(data);
        }
    };

    useEffect(() => {
        fetchProdutoData(id!);
    }, [id]);

    const incrementar = () => setQuantidade((q) => q + 1);
    const decrementar = () =>
        setQuantidade((q) => (q > 1 ? q - 1 : 1));

    const handleAddToCart = async () => {
        if (!produto?.id) {
            toast({
                title: "Erro",
                description: "Produto não carregado ainda.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="))
                ?.split("=")[1];

            if (!token) {
                toast({
                    title: "Erro",
                    description: "Você precisa estar logado para adicionar ao carrinho.",
                    variant: "destructive",
                });
                setLoading(false);
                return;
            }

            const response = await fetch("http://localhost:8080/carrinho/adicionar", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    idProduto: id,
                    qtde: quantidade,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast({
                    title: "Erro",
                    description: errorData.message || "Erro ao adicionar ao carrinho.",
                    variant: "destructive",
                });
                return;
            }

            toast({
                title: "Sucesso",
                description: "Produto adicionado ao carrinho com sucesso!",
            });

            await fetchCarrinho();

        } catch (error) {
            toast({
                title: "Erro",
                description: "Erro de conexão ao adicionar ao carrinho.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-10">
            <div className="flex-1 flex justify-center items-start">
                <div
                    className="w-full max-w-md h-[30rem] relative rounded-2xl overflow-hidden shadow-lg cursor-zoom-in"
                    onMouseMove={(e) => {
                        const el = e.currentTarget;
                        const rect = el.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        el.querySelector<HTMLImageElement>("img")!.style.transformOrigin = `${x}% ${y}%`;
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.querySelector<HTMLImageElement>("img")!.style.transform = "scale(2)";
                    }}
                    onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector<HTMLImageElement>("img")!;
                        img.style.transform = "scale(1)";
                        img.style.transformOrigin = "center center";
                    }}
                >
                    <Image
                        src={`http://localhost:8080/produto/buscar-imagem/${produto?.id}`}
                        alt={produto?.nome ?? "produto"}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out"
                    />
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{produto?.nome}</h1>
                    <p className="text-2xl font-semibold text-green-600">
                        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(produto?.preco ?? 0)}
                    </p>

                    <div className="flex items-center gap-3 mt-[3rem]">
                        <span className="font-semibold">Quantidade:</span>
                        <div className="flex items-center border rounded-lg overflow-hidden">
                            <button
                                onClick={decrementar}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition-colors"
                            >
                                -
                            </button>
                            <span className="px-4 py-1">{quantidade}</span>
                            <button
                                onClick={incrementar}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-4 w-[18rem]">
                    <Button className="bg-black text-white rounded-4xl py-8" onClick={handleAddToCart} disabled={!produto}>
                        Adicionar ao Carrinho
                    </Button>
                    <Button className="bg-gray-200 text-black rounded-4xl py-7">
                        Comprar Agora
                    </Button>
                </div>
            </div>
        </main>
    );
}
