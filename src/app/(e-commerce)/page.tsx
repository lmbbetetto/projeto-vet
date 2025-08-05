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

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
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
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card className="h-[35rem]">
                  <CardContent className="flex aspect-square items-center justify-center p-6 h-[35rem]">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="text-muted-foreground py-2 text-center text-sm">
          Slide {current} of {count}
        </div>
      </div>

      <div className="mb-[-8rem] mt-[-3rem]">
        <h1 className="text-2xl font-semibold">Nossos Produtos</h1>
      </div>

      <div className="w-full">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/8"
                style={{ width: "5rem", height: "25rem" }}
              >
                <div className="p-1 w-full h-full flex flex-col items-center">
                  <Card className="w-full flex-grow">
                    <CardContent className="flex items-center justify-center p-6 w-full h-full">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                  <p className="mt-2 text-center text-sm font-bold">
                    Descrição do item {index + 1}
                  </p>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    R$
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
