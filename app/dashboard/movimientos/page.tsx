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
import { fetchMovimientos, crearMovimiento } from "@/lib/services/movimientos";

export default function Page() {
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    importeMovimiento: 0,
    medioPago: "",
    comentarioMovimiento: "",
  });
  const { getToken } = useAuth();
  const token = getToken();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Para obtener todos los movimientos
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
      if(nuevo){
        // setMovimientos([...movimientos, nuevo]);
        window.location.reload();
        setIsModalOpen(false);
      }else{
        //error papi
      }
    
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Movimientos</CardTitle>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="md:mr-2 h-4 w-4" />{" "}
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
                    $
                    {movimiento.importeMovimiento
                      ? movimiento.importeMovimiento.toLocaleString()
                      : "0"}
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
                    <Button>
                      <Eye className="md:mr-2 h-4 w-4" />
                      <p className="hidden md:block">Ver</p>
                    </Button>
                    <Button>
                      <Trash className="md:mr-2 h-4 w-4" />
                      <p className="hidden md:block">Eliminar</p>
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
    </main>
  );
}
