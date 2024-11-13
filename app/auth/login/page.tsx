"use client";
import Image from "next/image";
import Link from "next/link";
import { useState  } from "react";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cuit, setCuit] = useState("");
  const [error, setError] = useState("");
  const {login} = useAuth();
 

  const handleLogin =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://cuenta-proveedores.up.railway.app/api/autenticacion/inicio-sesion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, cuit }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        login(data.token);
      } else {
        console.log(await response.text());
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };
  return (
    <div className="flex bg-black text-white w-full h-screen">
      <div className="hidden w-1/2 lg:block">
        <Image
          src="/login.jpg"
          alt="Login background"
          width={1080}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Contenido del lado derecho */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
              <Image
                src="/logo.png"
                alt="Logo de la Empresa"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">PiezasYa</span>
              <span className="">Proveedores</span>
            </div>
          </div>
          <Link
            href="/auth/register"
            className="text-base text-gray-400 hover:text-white"
          >
            Crear cuenta
          </Link>
        </header>

        {/* Main Content */}
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center space-y-8 px-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Inicia Sesión
            </h1>
            <p className="text-sm text-gray-400">
              Ingresa tus datos para iniciar sesión.
            </p>
          </div>

          <form onSubmit={handleLogin}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="cuit">
                Cuit
              </label>
              <input
                type="text"
                id="cuit"
                placeholder="Ingrese su cuit"
                className="border rounded w-full p-2"
                required
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-800 text-white rounded w-full py-2 mt-3"
            >
              Iniciar Sesión
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </main>
      </div>
    </div>
  );
}
