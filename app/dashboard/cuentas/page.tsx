"use client";

import { Plus, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import { getAccount, createAccount } from "@/lib/services/cuentas";

export default function Page() {
  const [Account, setAccount] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nombreProveedor: "",
    numeroCelular: "",
    emailProveedor: "",
    direccionProveedor: "",
  });
  const { getToken } = useAuth();
  const token = getToken();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Para crear cuentas
  const handleCreateAccount = async () => {
    const newAccount = await createAccount(token, formData);
    if (newAccount) {
      setIsModalOpen(false);
      setAccount((prev) => [...prev, newAccount]); //Agrego la cuenta a la lista
    }
  };

  //Para ver cuenta
  useEffect(() => {

    const fetchAllAccount = async () => {
      const data = await getAccount(token);
      if (data) {
        console.log("cuenta encontradas: ", data)
        setAccount(data);
      }
    };

    //Si hay un token ejecuto la funcion para cargar las cuentas
    if (token) {
      fetchAllAccount();
    }
  }, [token]);

  // Función para cambiar el estado de la cuenta
  const handleChangeAccountStatus = async (idCuenta: string) => {
    try {
      console.log("ID enviado:", idCuenta);
      const response = await fetch(
        `https://cuenta-proveedores.up.railway.app/api/cuentas/cambiar-estado/${idCuenta}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Respuesta recibida:", await response.json());
      
      if (response.ok) {
        const updatedAccount = await response.json();
        console.log("Cuenta actualizada:", updatedAccount);

        // Mover la cuenta a la lista según el nuevo estado
        setAccount((prev) =>
          prev.map((account) =>
            account.id === updatedAccount.id ? updatedAccount : account
          )
        );
      } else {
        console.error("Error al cambiar el estado de la cuenta");
        alert("No se pudo cambiar el estado de la cuenta.");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      alert("Hubo un error al cambiar el estado de la cuenta.");
    }
  };

  // Filtros dinámicos para cuentas activas e inactivas
  const validAccounts = Account.filter((account) => account.isValid);
  const invalidAccounts = Account.filter((account) => !account.isValid);


  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Proveedores</CardTitle>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="md:mr-2 h-4 w-4" />{" "}
            <p className="hidden md:block">Agregar Proveedor</p>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-center">Saldo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell className="text-center">
                    ${account.saldo ? account.saldo.toLocaleString() : "0"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button onClick={() => handleChangeAccountStatus(account.id)}>
                      <Trash className="md:mr-2 h-4 w-4" />
                      <p className="hidden md:block">Cambiar Estado</p>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Cuentas Dadas de Baja</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-center">Saldo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invalidAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell className="text-center">
                    ${account.saldo ? account.saldo.toLocaleString() : "0"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button onClick={() => handleChangeAccountStatus(account.id)}>
                      <Trash className="md:mr-2 h-4 w-4" />
                      <p className="hidden md:block">Cambiar Estado</p>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-xl text-gray-800 font-semibold mb-6">Agregar Proveedor</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="nombreProveedor"
                placeholder="Nombre del Proveedor"
                value={formData.nombreProveedor}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="numeroCelular"
                placeholder="Número de Celular"
                value={formData.numeroCelular}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                name="emailProveedor"
                placeholder="Email"
                value={formData.emailProveedor}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="direccionProveedor"
                placeholder="Dirección"
                value={formData.direccionProveedor}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateAccount}
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-300"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
