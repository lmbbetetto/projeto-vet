import { FooterEcommerce } from "@/components/footer-ecommerce";
import { HeaderEcommerce } from "@/components/header-ecommerce";
import { Toaster } from "@/components/ui/toaster";
import { CarrinhoProvider } from "@/providers/shopping-cart/cart-provider";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderEcommerce />
      <main>
        <div className="p-[10rem] pt-4">
          <CarrinhoProvider>
            {children}
          </CarrinhoProvider>
        </div>
      </main>
      <FooterEcommerce />
      <Toaster />
    </>
  );
}
