

export default function LayoutUserProfile({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="mt-10 border-b w-full pb-5" />
            <div className="flex items-center justify-center pt-10">
                {children}
            </div>
        </div>
    )
}