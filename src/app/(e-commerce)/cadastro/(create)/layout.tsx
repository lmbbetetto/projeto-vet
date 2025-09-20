
export default function LayoutCreateAluno({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mt-16 flex items-center justify-center">
            {children}
        </div>
    )
}