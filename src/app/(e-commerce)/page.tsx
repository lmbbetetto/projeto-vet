"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ProdutoResponse } from "@/utils/types";
import Link from "next/link";
import { routes } from "@/utils/routes";
import Image from "next/image";
import { fotos } from "./mock";

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<ProdutoResponse[]>([]);

  async function fetchProdutos() {
    const response = await fetch('http://localhost:8080/produto/listar', {
      method: 'GET',
    })
    if (response.ok) {
      const data = await response.json()
      setProducts(data);
    }
  }

  useEffect(() => {
    fetchProdutos();
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <main className="p-8 max-w-full mx-auto gap-[10rem] flex flex-col">
      <div className="w-full h-[35rem] mb-8">
        <Carousel setApi={setApi} className="w-full h-[35rem]">
          <CarouselContent>
            {fotos.map((img, index) => (
              <CarouselItem key={index}>
                <Card className="h-[35rem]">
                  <CardContent className="flex aspect-square items-center justify-center p-6 h-[35rem]">
                    <Image
                      src={img.image}
                      alt="fotos"
                      fill
                      className="object-cover transition-transform duration-300 ease-in-out rounded-2xl mb-2"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="text-muted-foreground py-2 text-center text-sm">
          {current} de {count}
        </div>
      </div>

      <div className="mb-[-8rem] mt-[-6rem]">
        <h1 className="text-2xl font-semibold">Nossos Produtos</h1>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
          {products.map((product, index) => (
            <Link
              key={index}
              href={routes.produtosEcommerce.view(String(product.id))}
              className="flex gap-4 hover:shadow-lg transition-shadow rounded-2xl p-2"
            >
              <Image
                src={`http://localhost:8080/produto/buscar-imagem/${product.id}`}
                alt={product.nome}
                width={240}
                height={288}
                className="object-cover transition-transform duration-300 ease-in-out w-[15rem] h-[18rem] rounded-2xl mb-2"
              />
              <div className="flex flex-col gap-3 mt-5">
                <span className="text-[1.1rem] font-semibold">{product.nome}</span>
                <span className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.preco)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
