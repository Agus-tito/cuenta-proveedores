"use client";

import { Plus, EyeClosed, Eye, ZoomIn } from "lucide-react";
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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { toast } from "sonner"
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import { getAccount, createAccount, ChangeAccountStatus } from "@/lib/services/cuentas";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  const [Account, setAccount] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nombreProveedor: "",
    numeroCelular: "",
    emailProveedor: "",
    direccionProveedor: "",
    fechaBajaLogicaCuenta: "",
    movimiento: ""
  });

  const { getToken } = useAuth();
  const token = getToken();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Para crear cuentas
  const handleCreateAccount = async () => {
    const newAccount = await createAccount(token, formData);
    if (newAccount) {
      setIsModalOpen(false);
      setAccount((prev) => [...prev, newAccount]); // Agrego la cuenta a la lista
    }
  };

  // Para ver cuentas
  const fetchAllAccount = async () => {
    if (!token) return console.error("No se encontró el token");
    try {
      const data = await getAccount(token);
      setAccount(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Si hay un token, ejecuta la función para cargar las cuentas
  useEffect(() => {
    fetchAllAccount();
  }, [token]);


  // Función para cambiar el estado de la cuenta
  const handleChangeAccountStatus = async (idCuenta: string) => {
    if (!token) return console.error("No se encontró el token");
    try {
      const updateCuenta = await ChangeAccountStatus(token, idCuenta);
      console.log("Cuenta actualizada:", updateCuenta);

      fetchAllAccount()
    } catch (error) {
      console.error("Error al cambiar el estado de la cuenta:", error);
      alert("Hubo un error al cambiar el estado de la cuenta.");
    }
  };

  const handleButtonClick = (accountId: any) => {
    toast("La cuenta proveedor cambió de estado", {
      action: {
        label: "Cerrar",
        onClick: () => console.log("Undo"),
      },
    });

    handleChangeAccountStatus(accountId);
  };

  const currentDate = new Date();

  // Filtros para cuentas activas e inactivas
  const validAccounts = Account.filter((account) =>
    !account.fechaBajaLogicaCuenta || new Date(account.fechaBajaLogicaCuenta) > currentDate
  );

  const invalidAccounts = Account.filter((account) =>
    account.fechaBajaLogicaCuenta && new Date(account.fechaBajaLogicaCuenta) <= currentDate
  );

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Cuentas</CardTitle>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="md:mr-2 h-4 w-4" />
            <p className="hidden md:block">Agregar Proveedor</p>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead className="text-center">Saldo</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Dirección</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium text-sm">{account.name}</TableCell>
                  <TableCell className="font-medium text-sm">{account.nombreProveedor}</TableCell>
                  <TableCell className="text-center">
                    ${account.saldo ? account.saldo.toLocaleString() : "0"}
                  </TableCell>
                  <TableCell className="text-center">{account.direccionProveedor}</TableCell>
                  <TableCell className="text-center">{account.numeroCelular}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                        >
                          <ZoomIn />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Proveedor</DialogTitle>
                          <DialogDescription>
                            Listado de todos los detalles.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 grid-cols-2 grid-row-4">
                          <div>
                            <p className="font-medium text-sm">Cuenta</p>
                            <p>{account.name}</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Proveedor</p>
                            <p>{account.nombreProveedor}</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Número teléfonico</p>
                            <p>{account.numeroCelular}</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Email</p>
                            <p>{account.emailProveedor}</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Dirección</p>
                            <p>{account.direccionProveedor}</p>
                          </div>
                        </div>
                        <p className="font-medium text-sm">Moviminetos</p>
                        <ScrollArea className="w-full rounded-md border">
                          <div className="p-4">
                            <h4 className="text-sm font-medium leading-none"></h4>
                            <div>
                              {account.movimiento.map((mov: any, index: any) => (
                                <div>
                                  <div key={index} className="w-full grid gap-4 py-4 grid-cols-2 grid-row-4">
                                    
                                    <div>
                                      <p className="font-medium text-sm">Importe:</p>
                                      <p>${mov.importeMovimiento}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">Medio de Pago:</p>
                                      <p>{mov.medioPago}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">Comentario:</p>
                                      <p>{mov.comentarioMovimiento}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">Fecha:</p>
                                      <p>{new Date(mov.fechaAltaMovimiento).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                  <Separator className="my-2" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            onClick={() => handleButtonClick(account.id)}
                          >
                            <EyeClosed />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Dar de baja</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Cuenta dadas de baja</CardTitle>
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
                  <TableCell className="font-medium text-sm">{account.name}</TableCell>
                  <TableCell className="text-center">
                    ${account.saldo ? account.saldo.toLocaleString() : "0"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleButtonClick(account.id)}
                    >
                      <Eye />
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
