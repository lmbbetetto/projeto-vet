
export default function LayoutUserProfile({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="flex flex-col gap-2 border-b w-full pb-5">
                <h1 className="text-2xl font-bold">Cliente</h1>
                <p className="text-sm">Visualize os clientes cadastrados</p>
            </div>
            {children}
        </div>
    )
}