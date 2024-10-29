export default function AuthLayout({children,}: {
    children: React.ReactNode
}) {
    return <div className="auth-layout w-full h-screen flex justify-center items-center">{children}</div>
}