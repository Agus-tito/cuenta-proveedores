"use client";
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault(); 

        const userData = {
            email: email,
            password: password,
        };
        await loginUser(userData);
    };

    async function loginUser(userData) {
        console.log(userData);
        const response = await fetch('https://checking-app.up.railway.app/api/autenticacion/inicio-sesion', {
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
        <div className="border p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
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
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded w-full py-2 hover:bg-blue-600"
                >
                    Iniciar Sesión
                </button>
            </form>
            <a href="./register">Registrate</a>
        </div>
    );
}
