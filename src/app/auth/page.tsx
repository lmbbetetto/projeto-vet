"use client"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/routes'

const signInForm = z.object({
  login: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
})

type SignInForm = z.infer<typeof signInForm>

export default function SignIn() {
  const router = useRouter()
  const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  async function handleSignIn(data: SignInForm) {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: data.login,
          password: data.password,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Erro ao autenticar:", response.status, errorText)
        throw new Error("Credenciais inválidas")
      }

      const result = await response.json()

      document.cookie = `token=${result.token}; path=/; max-age=3600; sameSite=Lax`

      toast.success('Login realizado com sucesso!')
      router.push(routes.home.home)

    } catch (error) {
      console.error(error)
      setError("login", { type: "manual", message: "Credenciais inválidas." })
      setError("password", { type: "manual", message: "Credenciais inválidas." })
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        Novo estabelecimento
      </Button>
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar sistema
          </h1>
          <p className="text-sm text-muted-foreground">Acesse o dashboard</p>
        </div>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Login</Label>
            <Input id="login" type="text" {...register('login')} />
            {errors.login && <p className="text-red-500 text-sm">{errors.login.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button disabled={isSubmitting} className="w-full">Acessar Sistema</Button>
        </form>
      </div>
    </div>
  )
}
