export default function LoginPage() {
    return (
        <div className="border p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
            <form >
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Ingrese nombre"
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="surname">
                        Apellido
                    </label>
                    <input
                        type="text"
                        id="surname"
                        placeholder="Ingrese apellido"
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Ingrese email"
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="phone">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        placeholder="Ingrese número de teléfono"
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Ingrese su contraseña"
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded w-full py-2 hover:bg-blue-600"
                >
                    Iniciar Sesión
                </button>
            </form>
            <a href="/dashboard">coso</a>
        </div>
    );
}