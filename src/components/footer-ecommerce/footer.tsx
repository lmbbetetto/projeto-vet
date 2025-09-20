import Link from "next/link";
import Image from "next/image";

export function FooterEcommerce() {
  return (
    <div className="p-30 pt-12 pb-12 flex items-center justify-between bg-black text-white">
      <Link href="/" className="mt-[3rem]">
        <Image src="/bella-pet-branco.png" alt="Logo Bella Pet" width={200} height={200} />
      </Link >
      <div className="w-[30rem]">
        <p>Na Bella Pet, acreditamos que cada pet merece amor, cuidado e qualidade em cada detalhe. Por isso, construímos nossa loja virtual com base em princípios que guiam nossas ações todos os dias.
          <br />
          Queremos estar sempre ao lado dos tutores, oferecendo atendimento humanizado, transparente e acolhedor.</p>
      </div>
    </div>
  );
}
