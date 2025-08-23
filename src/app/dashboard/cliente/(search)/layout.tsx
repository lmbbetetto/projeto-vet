import { Metadata } from "next";

export default function LayoutCreateTeacher({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="p-4">
            {children}
        </div>
    )
}