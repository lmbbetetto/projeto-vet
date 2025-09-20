import { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProviderr } from "@/providers/theme-provider";
import { twMerge } from "tailwind-merge";
import { COMPONENT_STYLE } from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Bella Pet",
    template: "Bella Pet | %s",
  },
  description: "Bella Pet - Sistema de Vendas",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={twMerge(
          COMPONENT_STYLE.font,
          Object.values(COMPONENT_STYLE.body)
        )}
      >
        <ThemeProviderr>
          <main>{children}</main>
        </ThemeProviderr>
      </body>
    </html>
  );
}
