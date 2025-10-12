'use client';
import { ShoppingCart } from '../shopping-cart';
import UserLogin from '../user-login';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { routes } from '@/utils/routes';
import { useCarrinho } from '@/providers/shopping-cart/cart-provider';

export function HeaderEcommerce() {
  const { carrinho } = useCarrinho();

  return (
    <div className="h-5 p-30 pt-9 pb-9 flex items-center justify-between z-50 relative bg-white">
      <Link href="/" className="mt-[3rem]">
        <Image src="/bellla-pet.png" alt="Logo Bella Pet" width={150} height={150} />
      </Link>
      <div className="flex items-center gap-3">
        <Link href={routes.agendamento.new}>
          <Button variant="outline">Agendamento</Button>
        </Link>
        <UserLogin />
        <ShoppingCart items={carrinho ?? undefined} />
      </div>
    </div>
  );
}
