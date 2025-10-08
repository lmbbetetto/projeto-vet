'use client';

import { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import Link from "next/link";
import { routes } from "@/utils/routes";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "@/utils/types";

export default function UserLogin() {
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUser(decoded.sub || "User");
        setUserId(decoded["auth-id"]);
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
      }
    }
  }, []);

  console.log(userId)

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/auth/login-cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        setError("Login ou senha incorretos");
        throw new Error("Credenciais inválidas");
      }

      const result = await response.json();
      document.cookie = `token=${result.token}; path=/; max-age=3600; sameSite=Lax`;
      toast.success("Login realizado com sucesso!");
      setUser(login);

    } catch (err) {
      console.error(err);
      setError("Login ou senha incorretos");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleLogout() {
    document.cookie = "token=; path=/; max-age=0; sameSite=Lax";
    setUser(null);
    setLogin("");
    setPassword("");
    setError(null);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{!user ? <p>Login</p> : <User className="w-4 h-4" />}</Button>
      </DropdownMenuTrigger>
      {!user ? (
        <DropdownMenuContent align="end" className="p-4 w-72 flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-xl font-semibold tracking-tight">Acessar sua conta</h1>
            <p className="text-sm text-muted-foreground">Acesse a loja</p>
          </div>
          <form onSubmit={handleSignIn} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="login" className="text-sm">Login</Label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={e => setLogin(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="text-sm">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              Entrar
            </Button>
          </form>
          <span className="text-center text-muted-foreground text-sm">Ainda não tem uma conta?</span>
          <Link href={routes.clienteCadastro.create}>
            <Button className="w-full">
              Cadastre-se
            </Button>
          </Link>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end" className="p-2 w-40 flex flex-col gap-1">
          <DropdownMenuItem asChild>
            <Link href={routes.clienteCadastro.profile(String(userId) ?? "")}>
              <button
                className="flex items-center gap-2 w-full"
              >
                <User className="w-4 h-4" />
                Perfil
              </button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-rose-500 dark:text-rose-400 w-full"
            >
              Sair
              <LogOut className="w-4 h-4" />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
