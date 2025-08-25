
export default function LayoutCreateAluno({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="flex flex-col gap-2 border-b w-full pb-5">
                <h1 className="text-2xl font-bold">Cadastro</h1>
                <p className="text-sm">Cadastre um novo cliente</p>
            </div>

            <div className="fixed flex flex-col gap-4 w-[300px] min-w-[300px] min-h-screen pt-4 ml-[-12px] pl-3">
                Formulário de cadastro
            </div>
            <div className="grid w-[55rem] h-full pl-[320px] p-4">
                {children}
            </div>
        </div>
    )
}