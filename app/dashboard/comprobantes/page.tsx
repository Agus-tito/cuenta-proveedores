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
} from "@/components/ui/select"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import { getComprobante, createComprobante } from "@/lib/services/comprobantes";
import { fetchMovimientos } from "@/lib/services/movimientos";

export default function Page() {
  const [comprobantes, setComprobantes] = useState<any[]>([]);
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [selectedMovimiento, setSelectedMovimiento] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipoComprobante: "",
    descripcion: "",
    nroComprobante: 0,
    fechaComprobante: "",
    montoComprobante: 0,
  });

  const { getToken } = useAuth();
  const token = getToken();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para obtener todos los comprobantes
  const obtenerComprobantes = async () => {
    if (!token) return console.error("No se encontró el token");
    try {
      const data = await getComprobante(token);
      setComprobantes(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener todos los comprobantes al cargar el componente
  useEffect(() => {
    obtenerComprobantes();
  }, [token]);

  // Función para cambiar el estado del comprobante
  const handleChangeComprobanteStatus = async (idComprobante: string) => {
    try {
      const response = await fetch(
        `https://cuenta-proveedores.up.railway.app/api/comprobantes/cambiar-estado/${idComprobante}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        obtenerComprobantes(); // Llama a la función para obtener todos los comprobantes
      } else {
        console.error("Error al cambiar el estado del comprobante");
        alert("No se pudo cambiar el estado del comprobante.");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      alert("Hubo un error al cambiar el estado del comprobante.");
    }
  };

  const validComprobantes = comprobantes.filter((comprobante) => comprobante.isValid);
  const invalidComprobantes = comprobantes.filter((comprobante) => !comprobante.isValid);


  // Obtener todos los movimientos
  useEffect(() => {
    const obtenerMovimientos = async () => {
      if (!token) return console.error("No se encontró el token");
      try {
        const data = await fetchMovimientos(token); // Asegúrate de que esta función obtenga los movimientos
        setMovimientos(data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerMovimientos();
  }, [token]);

  // Para crear comprobantes
  const handleCreateComprobante = async () => {
    if (!token) return console.error("No se encontró el token");
    try {
      const newComprobante = await createComprobante(token, formData);
      if (newComprobante) {
        setIsModalOpen(false);
        setComprobantes((prev) => [...prev, newComprobante]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Asignar movimiento al comprobante
  const handleAsignarMovimiento = async (comprobanteId: string) => {
    if (!token || !selectedMovimiento) return console.error("No se encontró el token o movimiento seleccionado");
    try {
      const response = await fetch("https://cuenta-proveedores.up.railway.app/api/comprobantes/asignar-comprobante", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idMovimiento: selectedMovimiento,
          idComprobante: comprobanteId,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json(); // Obtener el cuerpo de la respuesta
        throw new Error(`Error al asignar el movimiento: ${errorData.message || 'Error desconocido'}`);
      }

      obtenerComprobantes(); // Esta es la función que ya tienes en el useEffect
      setIsModalOpen(false); // Cerrar el modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Comprobantes</CardTitle>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="md:mr-2 h-4 w-4" />
            <p className="hidden md:block">Agregar Comprobante</p>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo Comprobante</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Número Comprobante</TableHead>
                <TableHead>Fecha Alta</TableHead>
                <TableHead>Movimiento</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comprobantes && (
                validComprobantes.map((comprobante) => {
                  const movimiento = movimientos.find(m => m.id === comprobante.movimientoId);
                  return (
                    <TableRow key={comprobante.id}>
                      <TableCell>{comprobante.tipoComprobante}</TableCell>
                      <TableCell>{comprobante.descripcion}</TableCell>
                      <TableCell>
                        {comprobante.nroComprobante.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(comprobante.fechaComprobante).toLocaleString()}
                      </TableCell>
                      <TableCell>{movimiento ? movimiento.comentarioMovimiento : 'Sin comentario'}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="md:mr-2 h-4 w-4" />
                              <p className="hidden md:block">Asignar</p>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Asignar Movimiento</DialogTitle>
                              <DialogDescription>
                                Puedes asignarle un movimiento a este comprobante.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                              <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                  Movimientos
                                </Label>
                                <Select onValueChange={(value) => setSelectedMovimiento(value)}>
                                  <SelectTrigger id="movimiento">
                                    <SelectValue placeholder="Selecciona un movimiento" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    {movimientos.map((movimiento) => (
                                      <SelectItem key={movimiento.id} value={movimiento.id}>
                                        {movimiento.comentarioMovimiento}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter className="sm:justify-between">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Cerrar
                                </Button>
                              </DialogClose>
                              <Button onClick={() => handleAsignarMovimiento(comprobante.id)}>Asignar</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button onClick={() => handleChangeComprobanteStatus(comprobante.id)}>
                          <Trash className="md:mr-2 h-4 w-4" />
                          <p className="hidden md:block">Cambiar Estado</p>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Comprobantes</CardTitle>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="md:mr-2 h-4 w-4" />
            <p className="hidden md:block">Agregar Comprobante</p>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo Comprobante</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Número Comprobante</TableHead>
                <TableHead>Fecha Alta</TableHead>
                <TableHead>Movimiento</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comprobantes && (
                invalidComprobantes.map((comprobante) => {
                  const movimiento = movimientos.find(m => m.id === comprobante.movimientoId);
                  return (
                    <TableRow key={comprobante.id}>
                      <TableCell>{comprobante.tipoComprobante}</TableCell>
                      <TableCell>{comprobante.descripcion}</TableCell>
                      <TableCell>
                        {comprobante.nroComprobante.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(comprobante.fechaComprobante).toLocaleString()}
                      </TableCell>
                      <TableCell>{movimiento ? movimiento.comentarioMovimiento : 'Sin comentario'}</TableCell> {/* Mostrar comentario */}
                      <TableCell className="text-right space-x-2">
                        <Button onClick={() => handleChangeComprobanteStatus(comprobante.id)}>
                          <Trash className="md:mr-2 h-4 w-4" />
                          <p className="hidden md:block">Cambiar Estado</p>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de agregar comprobante */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-6">Agregar Comprobante</h2>
            <form>
              {/* Tipo de comprobante */}
              <div className="mb-4">
                <label
                  htmlFor="tipoComprobante"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo de Comprobante
                </label>
                <input
                  id="tipoComprobante"
                  name="tipoComprobante"
                  type="text"
                  value={formData.tipoComprobante}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción
                </label>
                <input
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Número de comprobante */}
              <div className="mb-4">
                <label
                  htmlFor="nroComprobante"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número de Comprobante
                </label>
                <input
                  id="nroComprobante"
                  name="nroComprobante"
                  type="number"
                  value={formData.nroComprobante}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Fecha de comprobante */}
              <div className="mb-4">
                <label
                  htmlFor="fechaComprobante"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Comprobante
                </label>
                <input
                  id="fechaComprobante"
                  name="fechaComprobante"
                  type="date"
                  value={formData.fechaComprobante}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-black"
                />
              </div>

              {/* Monto de comprobante */}
              <div className="mb-4">
                <label
                  htmlFor="montoComprobante"
                  className="block text-sm font-medium text-gray-700"
                >
                  Monto de Comprobante
                </label>
                <input
                  id="montoComprobante"
                  name="montoComprobante"
                  type="number"
                  value={formData.montoComprobante}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-black"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 hover:bg-red-300 text-white"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateComprobante}
                  className="bg-blue-500 hover:bg-blue-300 text-white"
                >
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
