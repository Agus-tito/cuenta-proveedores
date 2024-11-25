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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import {
  fetchMovimientos,
  crearMovimiento,
  cambiarEstadoMovimiento,
} from "@/lib/services/movimientos";
import { Label } from "@radix-ui/react-dropdown-menu";
import { getAccount } from "@/lib/services/cuentas";

export default function Page() {
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [cuentas, setCuentas] = useState<any[]>([]);
  const [movimientosBaja, setMovimientosBaja] = useState<any[]>([]);
  const [selectedMovimiento, setSelectedMovimiento] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    importeMovimiento: 0,
    medioPago: "",
    comentarioMovimiento: "",
    cuentaId: "",
  });

  const { getToken } = useAuth();
  const token = getToken();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Obtener todas las cuentas disponibles
  useEffect(() => {
    const obtenerCuentas = async () => {
      if (!token) return console.error("No se encontró el token");
      try {
        const cuentasData = await getAccount(token);
        setCuentas(cuentasData);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerCuentas();
  }, [token]);

  // Para obtener todos los movimientos
  useEffect(() => {
    const obtenerMovimientos = async () => {
      if (!token) return console.error("No se encontró el token");
      try {
        const data = await fetchMovimientos(token);
        setMovimientos(data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerMovimientos();
  }, [token]);

  // Para crear un movimiento
  const handleCrearMovimiento = async () => {
    if (!token) return console.error("No se encontró el token");

    try {
      const nuevo = await crearMovimiento(token, formData);
      if (nuevo) {
        setMovimientos([...movimientos, nuevo]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Para la apertura del modal para ver un movimiento
  const handleVerMovimiento = (movimiento: any) => {
    setSelectedMovimiento(movimiento);
    setIsModalOpen(true);
  };

  // Función para cambiar el estado del movimiento
  const handleCambiarEstado = async (movimiento: any) => {
    if (!token) return console.error("No se encontró el token");

    try {
      const response = await cambiarEstadoMovimiento(token, movimiento.id);

      if (response) {
        if (response.fechaBajaMovimiento) {
          setMovimientos(movimientos.filter((mov) => mov.id !== movimiento.id));
          setMovimientosBaja([...movimientosBaja, response]);
        } else {
          setMovimientosBaja(
            movimientosBaja.filter((mov) => mov.id !== movimiento.id)
          );
          setMovimientos([...movimientos, response]);
        }
      }
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Tabla de movimientos activos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Movimientos</CardTitle>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="md:mr-2 h-4 w-4" />
            <p className="hidden md:block">Agregar Movimientos</p>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">ID</TableHead>
                <TableHead className="text-center">Importe</TableHead>
                <TableHead className="text-center">Medio de Pago</TableHead>
                <TableHead className="text-center">Comentario</TableHead>
                <TableHead className="text-center">Fecha Alta</TableHead>
                <TableHead className="text-end">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movimientos.map((movimiento) => (
                <TableRow key={movimiento.id}>
                  <TableCell className="font-medium">{movimiento.id}</TableCell>
                  <TableCell className="text-center">
                    ${movimiento.importeMovimiento?.toLocaleString() || "0"}
                  </TableCell>
                  <TableCell className="text-center">
                    {movimiento.medioPago}
                  </TableCell>
                  <TableCell className="text-center">
                    {movimiento.comentarioMovimiento}
                  </TableCell>
                  <TableCell className="text-center">
                    {movimiento.fechaAltaMovimiento
                      ? new Date(movimiento.fechaAltaMovimiento).toLocaleString(
                          "es-AR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )
                      : "Fecha no disponible"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button onClick={() => handleCambiarEstado(movimiento)}>
                      <Trash className="md:mr-2 h-4 w-4" />
                      <p className="hidden md:block">Dar Baja</p>
                    </Button>
                    <Button onClick={() => handleVerMovimiento(movimiento)}>
                      <Eye className="md:mr-2 h-4 w-4" />
                      <p className="hidden md:block">Ver</p>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabla de movimientos dados de baja */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Movimientos Dados de Baja
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">ID</TableHead>
                <TableHead className="text-center">Importe</TableHead>
                <TableHead className="text-center">Medio de Pago</TableHead>
                <TableHead className="text-center">Comentario</TableHead>
                <TableHead className="text-center">Fecha Baja</TableHead>
                <TableHead className="text-end">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movimientosBaja.map((movimiento) => (
                <TableRow key={movimiento.id}>
                  <TableCell className="font-medium">{movimiento.id}</TableCell>
                  <TableCell className="text-center">
                    ${movimiento.importeMovimiento}
                  </TableCell>
                  <TableCell className="text-center">
                    {movimiento.medioPago}
                  </TableCell>
                  <TableCell className="text-center">
                    {movimiento.comentarioMovimiento}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(movimiento.fechaBajaMovimiento).toLocaleString(
                      "es-AR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button onClick={() => handleCambiarEstado(movimiento)}>
                      <Plus className="md:mr-2 h-4 w-4" />
                      <p className="hidden md:block">Dar Alta</p>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Modal para agregar un movimiento */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <h2 className="text-xl text-gray-800 font-semibold mb-6">
              Agregar Movimiento
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="importeMovimiento"
                  className="block text-gray-700 mb-2"
                >
                  Importe
                </label>
                <input
                  type="text"
                  name="importeMovimiento"
                  id="importeMovimiento"
                  value={formData.importeMovimiento}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="medioPago" className="block text-gray-700 mb-2">
                  Medio de Pago
                </label>
                <input
                  type="text"
                  name="medioPago"
                  id="medioPago"
                  value={formData.medioPago}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="comentarioMovimiento"
                  className="block text-gray-700 mb-2"
                >
                  Comentario
                </label>
                <input
                  type="text"
                  name="comentarioMovimiento"
                  id="comentarioMovimiento"
                  value={formData.comentarioMovimiento}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cuentaId"
                  className="block text-sm font-medium text-black"
                >
                  Asignar Cuenta
                </label>
                <Select
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, cuentaId: value })
                  }
                >
                  <SelectTrigger id="cuentas">
                    <SelectValue placeholder="Selecciona una cuenta" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {cuentas.map((cuenta) => (
                      <SelectItem key={cuenta.id} value={cuenta.id}>
                        {cuenta.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCrearMovimiento}
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
      {/* Modal para mostrar detalles del movimiento */}
      {isModalOpen && selectedMovimiento && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg text-black">
            <h2 className="text-2xl font-bold text-black-900 border-b pb-3 mb-4">
              Detalle del Movimiento
            </h2>

            <div className="space-y-4 overflow-y-auto max-h-96 pr-2">
              <div className="flex justify-between">
                <span className="font-semibold">Importe:</span>
                <span>${selectedMovimiento.importeMovimiento}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-semibold">Medio de Pago:</span>
                <span>{selectedMovimiento.medioPago}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-semibold">Comentario:</span>
                <span>{selectedMovimiento.comentarioMovimiento}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-semibold">Fecha Alta:</span>
                <span>
                  {new Date(
                    selectedMovimiento.fechaAltaMovimiento
                  ).toLocaleString()}
                </span>
              </div>
              <hr />
              <div>
                <span className="font-semibold block mb-2">Comprobantes:</span>
                {selectedMovimiento?.comprobantes?.length > 0 ? (
                  <div className="space-y-2">
                    {selectedMovimiento.comprobantes.map((comprobante: any) => (
                      <div
                        key={comprobante.id}
                        className="p-3 bg-gray-100 rounded-md border"
                      >
                        <p>
                          <span className="font-semibold">Tipo:</span>{" "}
                          {comprobante.tipoComprobante}
                        </p>
                        <p>
                          <span className="font-semibold">Descripción:</span>{" "}
                          {comprobante.descripcion}
                        </p>
                        <p>
                          <span className="font-semibold">Monto:</span> $
                          {comprobante.montoComprobante}
                        </p>
                        <p>
                          <span className="font-semibold">Número:</span>{" "}
                          {comprobante.nroComprobante}
                        </p>
                        <p>
                          <span className="font-semibold">Fecha:</span>{" "}
                          {new Date(
                            comprobante.fechaComprobante
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-semibold">Validez:</span>{" "}
                          {comprobante.valid ? "Válido" : "Inválido"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No hay comprobantes disponibles.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
