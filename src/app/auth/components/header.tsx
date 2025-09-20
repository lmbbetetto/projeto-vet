import { ModeToggle } from '@/components/toggle-theme'
import Image from 'next/image'

export function HeaderLogin() {
    return (
        <section className='flex justify-between'>
            <div className='flex items-center gap-3 text-lg text-foreground'>
                <Image
                    src="/bellla-pet.png"
                    alt="Logo Bella Pet"
                    height={60}
                    width={60}
                />
                <span className='font-semibold'>Bella Pet</span>
            </div>
            <ModeToggle />
        </section>
    )
}