import Link from 'next/link'

export default function NotFound() {
    return (
        <div>

            <div className="px-8 pt-32 pb-24 mx-auto md:px-12 lg:px-36 lg:pt-40 max-w-7xl relative w-screen">
                <div className="text-center mx-auto my-24">
                    <h1 className="text-3xl md:text-3xl font-display font-bold italic text-violet-900 dark:text-violet-500 pt-3">UPS...</h1>
                    <span
                        className="text-3xl md:text-3xl md:block text-zinc-800 dark:text-zinc-400 font-display transition duration-500">
                        Página no encontrada
                    </span>
                </div>
                <div className="text-center mx-auto">
                    <Link href="/dashboard">Regresando a dashboard</Link>
                </div>
            </div>
        </div>
    )
}