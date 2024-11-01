"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cuit, setCuit] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = {
            name: name,
            surname: surname,
            cuit: cuit,
            email: email,
            phone: phone,
            password: password,
        };
        await RegisterUser(userData);
    };

    async function RegisterUser(userData: { name: string; surname: string; cuit: string; email: string; phone: string; password: string;}) {

        console.log(userData);
        
        const response = await fetch('https://checking-app.up.railway.app/api/autenticacion/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Registro exitoso:', data);
        } else {
            console.error('Error en el registro:', await response.text());
        }
    }

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
            <div className="flex w-full flex-col lg:w-1/2">
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
                    <Link href="/auth/login" className="text-base text-gray-400 hover:text-white">
                        Entrar
                    </Link>
                </header>

                <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center space-y-8 px-8">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold tracking-tight">Crea una Cuenta</h1>
                        <p className="text-sm text-gray-400">
                            Ingresa tus datos para crear una cuenta.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-x-3 md:grid-cols-2">
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="cuit">
                                    Cuit
                                </label>
                                <input
                                    type="text"
                                    id="cuit"
                                    placeholder="Ingrese cuit"
                                    className="border rounded w-full p-2"
                                    required
                                    value={cuit}
                                    onChange={(e) => setCuit(e.target.value)}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                        </div>
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-800 text-white rounded w-full py-2 mt-3"
                        >
                            Registarse
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
}