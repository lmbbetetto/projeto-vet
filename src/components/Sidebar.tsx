"use client";
import { LogOut, User, House } from "lucide-react";
import UserItem from "./UserItem";
import { Command, CommandItem, CommandList } from "./ui/command";
import { Button } from "./ui/button";
import { ModeToggle } from "./toggle-theme";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/routes";
import { useCallback } from "react";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    document.cookie = "token=; path=/; max-age=0; sameSite=Lax";
    router.push(routes.auth.home);
  }, [router]);

  const cadastroMenus = [
    {
      title: "Cliente",
      items: [
        { link: routes.cliente.new, text: "Cadastrar cliente" },
        { link: routes.cliente.search, text: "Buscar cliente" },
      ],
    },
    {
      title: "Produto",
      items: [
        { link: routes.product.new, text: "Cadastrar produto" },
        { link: routes.product.search, text: "Buscar produto" },
      ],
    },
    {
      title: "Tipo de Produto",
      items: [
        { link: routes.kindProduct.new, text: "Cadastrar tipo de produto" },
        { link: routes.kindProduct.search, text: "Buscar tipo de produto" },
      ],
    },
    {
      title: "Serviço",
      items: [
        { link: routes.service.new, text: "Cadastrar serviço" },
        { link: routes.service.search, text: "Buscar serviço" },
      ],
    },
    {
      title: "Agendamento",
      items: [
        { link: routes.agendamento.dashboard, text: "Buscar agendamento" },
      ],
    },
  ];

  return (
    <div className="fixed flex flex-col gap-4 w-[300px] min-w-[300px] border-r min-h-screen p-4">
      <div>
        <UserItem />
      </div>
      <ScrollArea className="h-[35rem] w-[282px] pr-4">
        <div className="grow">
          <section className="flex flex-col gap-2 mt-2 mb-6">
            <p
              className="flex gap-2 items-center text-sm hover:cursor-pointer hover:bg-muted p-1 rounded-sm"
              onClick={() => router.push(routes.home.home)}
            >
              <House size={18} />
              Início
            </p>
          </section>

          <h1 className="text-sm text-muted-foreground">Cadastros</h1>
          {cadastroMenus.map((menu, idx) => (
            <Accordion key={idx} type="single" collapsible>
              <AccordionItem value={`item-${idx}`}>
                <AccordionTrigger className="text-sm">{menu.title}</AccordionTrigger>
                <AccordionContent>
                  <Command style={{ overflow: "visible" }}>
                    <CommandList style={{ overflow: "visible" }}>
                      {menu.items.map((option, oIdx) => (
                        <CommandItem
                          key={oIdx}
                          className="flex justify-between cursor-pointer bg-transparent hover:bg-muted"
                          onSelect={() => router.push(option.link)}
                        >
                          {option.text}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}

        </div>
      </ScrollArea>

      <footer className="fixed bottom-4 left-2 flex gap-2 items-center justify-between p-2 bg-background">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <User className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="z-50">
            <DropdownMenuItem asChild className="flex gap-2 text-rose-500 dark:text-rose-400" onSelect={handleLogout}>
              <a href={routes.auth.home} className="flex items-center gap-2">
                Sair
                <LogOut className="w-4 h-4" />
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </footer>
    </div>
  );
}
