import { CarrinhoResponse } from "@/utils/types";
import Image from "next/image";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";

async function fetchCarrinho(): Promise<CarrinhoResponse | null> {
    try {
        const cookieStore = cookies();
        const tokenValue = (await cookieStore).get("token")?.value;

        const response = await fetch("http://localhost:8080/carrinho/buscar", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenValue}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Erro no backend:", response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão:", error);
        return null;
    }
}

export default async function Checkout() {
    const carrinho = await fetchCarrinho();

    if (!carrinho) {
        return <p>Erro ao carregar carrinho.</p>;
    }

    return (
        <main>
            <h1 className="text-2xl font-semibold mb-10">Carrinho</h1>
            <div className="flex flex-col gap-4">
                {carrinho.listaDeProduto.map((item) => (
                    <div
                        key={item.produto.id}
                        className="bg-white flex items-center p-6 space-x-4 h-30 w-[40rem] border-b"
                    >
                        <Image
                            src={`http://localhost:8080/produto/buscar-imagem/${item.produto.id}`}
                            alt={item.produto.nome}
                            width={80}
                            height={80}
                            className="object-cover transition-transform duration-300 ease-in-out rounded-2xl mb-2"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{item.produto.nome}</h3>
                            <p className="text-sm text-gray-500">
                                R$ {(item.produto.preco * item.qtde).toFixed(2)}
                            </p>
                        </div>
                        <p className="text-sm text-gray-500">{item.qtde}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-[5rem]">
                <div className="flex gap-4">
                    <p>Total:</p>
                    <p className="text-md font-bold">
                        {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(carrinho?.total ?? 0)}
                    </p>
                </div>
            </div>
            <Link href={"/checkout/payment"}>
                <Button className="bg-black rounded-4xl w-[40rem] mt-[4rem]">
                    <div className="flex items-center gap-3">
                        <p>Finalizar Compra</p>
                        <IconArrowNarrowRight />
                    </div>
                </Button>
            </Link>
        </main >
    );
}
