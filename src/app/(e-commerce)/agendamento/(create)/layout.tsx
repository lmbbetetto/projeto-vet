
export default function LayoutCreateAluno({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex items-center justify-center mt-16">
            {children}
        </div>
    )
}