import { Button } from "@/components/ui/button";
import { routes } from "@/utils/routes"
import Link from "next/link"

export default function LayoutUserProfile({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="flex flex-col gap-2 border-b w-full pb-5">
                <h1 className="text-2xl font-bold">Tipo de produto</h1>
                <p className="text-sm">Visualize o tipo de produto</p>
            </div>

            <div className="fixed flex flex-col gap-4 w-[300px] min-w-[300px] min-h-screen pt-4 ml-[-12px] p-3">
                <Button className="mb-10"><Link href={routes.kindProduct.new}>Novo tipo de produto</Link></Button>
            </div>
            <div className="grid h-full pl-[320px] p-4">
                {children}
            </div>
        </div>
    )
}