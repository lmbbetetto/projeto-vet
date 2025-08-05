import { FooterEcommerce } from "@/components/footer-ecommerce";
import { HeaderEcommerce } from "@/components/header-ecommerce";
import { Toaster } from "@/components/ui/toaster";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderEcommerce />
      <main>
        <div className="p-[10rem] pt-4">{children}</div>
      </main>
      <FooterEcommerce />
      <Toaster />
    </>
  );
}
