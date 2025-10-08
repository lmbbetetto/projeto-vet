"use client";

import Link from "next/link";
import { routes } from "@/utils/routes";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
    sub: string;
    exp: number;
    ["auth-id"]: number;
};

export default function LayoutUserProfile({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (token) {
            try {
                const decoded = jwtDecode<TokenPayload>(token);
                setUserId(String(decoded["auth-id"]));
            } catch (err) {
                console.error("Erro ao decodificar token:", err);
            }
        }
    }, []);

    return (
        <div className="flex min-h-screen mt-10">
            <aside className="w-64 dark:bg-gray-900 border-r p-6 flex flex-col gap-4">
                <h2 className="text-lg font-semibold mb-4">Minha conta</h2>
                <nav className="flex flex-col gap-2">
                    <Link
                        href={routes.clienteCadastro.profile(userId ?? "")}
                        className="px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                    >
                        Meus dados
                    </Link>
                    <Link
                        href={routes.clienteCadastro.pedidos(userId ?? "")}
                        className="px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                    >
                        Meus pedidos
                    </Link>
                    <Link
                        href={routes.clienteCadastro.agendamentos(userId ?? "")}
                        className="px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                    >
                        Meus agendamentos
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
