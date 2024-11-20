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


export default function Page() {
  const [comprobantes, setComprobantes] = useState<any[]>([])
  const { getToken } = useAuth() 
  const token = getToken()

  useEffect(() => {
    const fetchComprobantes = async () => {
      try {
        const response = await fetch(
          "https://cuenta-proveedores.up.railway.app/api/comprobantes/mostrar", 
          {
            method: "GET", 
            headers: {
              "Authorization": `Bearer ${token}`, 
              "Content-Type": "application/json",
            }
          }
        )
        if (!response.ok) {
          throw new Error('Error al obtener los comprobantes')
        }
        const data = await response.json()
        setComprobantes(data) 
      } catch (error) {
        console.error("Error al obtener comprobantes:", error)
      }
    }
    if (token) {
      fetchComprobantes()
    } else {
      console.error("No se encontró el token")
    }
  }, [token]) // Dependencia de 'token' para que se ejecute cuando el token cambie

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Comprobantes</CardTitle>
          <Button>
            <Plus className="md:mr-2 h-4 w-4" />{" "}
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
                  <TableCell>{comprobante.tipo_comprobante}</TableCell>
                  <TableCell>{comprobante.descripcion}</TableCell>
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
    </main>
  );
}
