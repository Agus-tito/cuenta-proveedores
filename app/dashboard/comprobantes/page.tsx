"use client";

import { Plus, EyeClosed, Eye } from "lucide-react";
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
} from "@/components/ui/tooltip";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import { getComprobante, createComprobante, ChangeComprobanteStatus, AsignarMovimiento } from "@/lib/services/comprobantes";
import { fetchMovimientos } from "@/lib/services/movimientos";

export default function Page() {
  const [comprobantes, setComprobantes] = useState<any[]>([]);
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [selectedMovimiento, setSelectedMovimiento,] = useState<string | null>(null);
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

  // Función para cambiar estado comprobante
  const handleChangeComprobanteStatus = async (idComprobante: string) => {
    if (!token) return console.error("No se encontró el token");
    try {
      const updatedComprobante = await ChangeComprobanteStatus(token, idComprobante);
      console.log("Comprobante actualizado:", updatedComprobante);

      obtenerComprobantes();
    } catch (error) {
      console.error("Error al cambiar el estado del comprobante:", error);
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
        const data = await fetchMovimientos(token);
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
      const dataToSend = {
        ...formData,
        movimientoId: selectedMovimiento,
      };

      console.log('Datos enviados:', dataToSend);

      const newComprobante = await createComprobante(token, dataToSend);

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
    if (!token || !selectedMovimiento) {
      return console.error("No se encontró el token o movimiento seleccionado");
    }
    try {
      const newMovimiento = await AsignarMovimiento(token, selectedMovimiento, comprobanteId);
      console.log("resultado de asignación: ", newMovimiento)
      obtenerComprobantes();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (idComprobante: any) => {
    toast("El comprobante cambió de estado", {
      action: {
        label: "Cerrar",
        onClick: () => console.log("Undo"),
      },
    });

    handleChangeComprobanteStatus(idComprobante);
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
              {validComprobantes.map((comprobante) => {
                const movimiento = movimientos.find((m) => m.id === comprobante.movimientoId);
                return (
                  <TableRow key={comprobante.id}>
                    <TableCell>{comprobante.tipoComprobante}</TableCell>
                    <TableCell>{comprobante.descripcion}</TableCell>
                    <TableCell>{comprobante.nroComprobante.toLocaleString()}</TableCell>
                    <TableCell>{new Date(comprobante.fechaComprobante).toLocaleString()}</TableCell>
                    <TableCell>{movimiento ? movimiento.comentarioMovimiento : 'Sin comentario'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                          >
                            <Plus />
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
                              <Select onValueChange={(value: any) => setSelectedMovimiento(value)}>
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
                            <Button onClick={() => handleAsignarMovimiento(comprobante.id)}>
                              Asignar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="secondary"
                              onClick={() => handleButtonClick(comprobante.id)}
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
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Comprobantes dados de baja</CardTitle>
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
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="secondary"
                                onClick={() => handleButtonClick(comprobante.id)}
                              >
                                <Eye />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Dar de baja</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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
        <div className="text-black dark:text-zinc-300 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg dark:bg-zinc-900 border-[1px]">
            <h2 className="text-xl font-semibold mb-6">Agregar Comprobante</h2>
            <form onSubmit={(e) => {
              e.preventDefault(); // Previene la recarga de la página
              handleCreateComprobante(); // Llama a la función para crear el comprobante
            }}>
              <div className="grid grid-cols-2 gap-4">

                {/* Tipo de comprobante */}
                <div className="mb-4">
                  <label
                    htmlFor="tipoComprobante"
                    className="block text-sm font-medium text-gray-700 dark:text-zinc-400"
                  >
                    Tipo de Comprobante
                  </label>
                  <input
                    id="tipoComprobante"
                    name="tipoComprobante"
                    type="text"
                    value={formData.tipoComprobante}
                    onChange={handleInputChange}
                    className="w-full p-[5px] border rounded-lg bg-gray-50 text-black dark:bg-zinc-950 dark:text-white"
                  />
                </div>

                {/* Descripción */}
                <div className="mb-4">
                  <label
                    htmlFor="descripcion"
                    className="block text-sm font-medium text-gray-700 dark:text-zinc-400"
                  >
                    Descripción
                  </label>
                  <input
                    id="descripcion"
                    name="descripcion"
                    type="text"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    className="w-full p-[5px] border rounded-lg bg-gray-50 text-black dark:bg-zinc-950 dark:text-white"
                  />
                </div>

                {/* Número de comprobante */}
                <div className="mb-4">
                  <label
                    htmlFor="nroComprobante"
                    className="block text-sm font-medium text-gray-700 dark:text-zinc-400"
                  >
                    Número de Comprobante
                  </label>
                  <input
                    id="nroComprobante"
                    name="nroComprobante"
                    type="number"
                    value={formData.nroComprobante}
                    onChange={handleInputChange}
                    className="w-full p-[5px] border rounded-lg bg-gray-50 text-black dark:bg-zinc-950 dark:text-white"
                  />
                </div>

                {/* Fecha de comprobante */}
                <div className="mb-4">
                  <label
                    htmlFor="fechaComprobante"
                    className="block text-sm font-medium text-gray-700 dark:text-zinc-400"
                  >
                    Fecha de Comprobante
                  </label>
                  <input
                    id="fechaComprobante"
                    name="fechaComprobante"
                    type="date"
                    value={formData.fechaComprobante}
                    onChange={handleInputChange}
                    className="w-full p-[5px] border rounded-lg bg-gray-50 text-black dark:bg-zinc-950 dark:text-white"
                  />
                </div>

                {/* Monto de comprobante */}
                <div className="mb-4">
                  <label
                    htmlFor="montoComprobante"
                    className="block text-sm font-medium text-gray-700 dark:text-zinc-400"
                  >
                    Monto de Comprobante
                  </label>
                  <input
                    id="montoComprobante"
                    name="montoComprobante"
                    type="number"
                    value={formData.montoComprobante}
                    onChange={handleInputChange}
                    className="w-full p-[5px] border rounded-lg bg-gray-50 text-black dark:bg-zinc-950 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="montoComprobante"
                    className="block text-sm font-medium text-gray-700 dark:text-zinc-400"
                  >
                    Asignar Movimiento
                  </label>
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Movimientos
                    </Label>
                    <Select
                      onValueChange={(value: any) => setSelectedMovimiento(value)}
                    >
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
              </div>

              <div className="flex justify-between space-x-3 pt-5">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="secondary"
                >
                  Cancelar
                </Button>
                <Button type="submit">
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