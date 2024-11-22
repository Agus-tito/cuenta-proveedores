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
import { getComprobante, createComprobante } from "@/lib/services/comprobantes";

export default function Page() {
  const [comprobantes, setComprobantes] = useState<any[]>([]);
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

  // Para obtener todos los comprobantes
  useEffect(() => {
    const obtenerComprobantes = async () => {
      if (!token) return console.error("No se encontró el token");
      try {
        const data = await getComprobante(token);
        setComprobantes(data);
      } catch (error) {
        console.error(error);
      }
    };
    obtenerComprobantes();
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
                <TableHead>ID</TableHead>
                <TableHead>Tipo Comprobante</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Número Comprobante</TableHead>
                <TableHead>Fecha Alta</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comprobantes.map((comprobante) => (
                <TableRow key={comprobante.id}>
                  <TableCell className="font-medium">
                    {comprobante.id}
                  </TableCell>
                  <TableCell>{comprobante.tipoComprobante}</TableCell>
                  <TableCell className="font-medium">
                    {comprobante.id}
                  </TableCell>
                  <TableCell>{comprobante.tipo_comprobante}</TableCell>
                  <TableCell>{comprobante.descripcion}</TableCell>
                  <TableCell>
                    {comprobante.nroComprobante.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(comprobante.fechaComprobante).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {comprobante.nroComprobante.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {comprobante.fechaAltaComprobante.toLocaleString()}
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
