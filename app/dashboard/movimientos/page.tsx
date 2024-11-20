'use client'

import { Plus, Trash, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/authContext'

  export default function Page() {
    const [movimientos, setMovimientos] = useState<any[]>([])
    const { getToken } = useAuth();
    const token = getToken();
  
    useEffect(() => {
      const fetchMovimientos = async () => {
        try {
          const response = await fetch(
            "https://cuenta-proveedores.up.railway.app/api/movimientos/ver",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Error al obtener los movimientos");
          }
          const data = await response.json();
          setMovimientos(data);
        } catch (error) {
          console.error("Error al obtener movimientos:", error);
        }
      };
      if (token) {
        fetchMovimientos();
      } else {
        console.error("No se encontró el token");
      }
    }, [token]); 
    

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Movimientos</CardTitle>
          <Button>
            <Plus className="md:mr-2 h-4 w-4" /> <p className='hidden md:block'>Agregar Movimientos</p>
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
                  <TableCell className="text-center">${movimiento.importeMovimiento.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{movimiento.medioPago}</TableCell>
                  <TableCell className="text-center">{movimiento.comentarioMovimiento}</TableCell>
                  <TableCell className="text-center">{movimiento.fechaAltaMovimiento.toLocaleString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button><Eye className="md:mr-2 h-4 w-4"/><p className='hidden md:block'>Ver</p></Button>
                    <Button><Trash className="md:mr-2 h-4 w-4"/><p className='hidden md:block'>Eliminar</p></Button>
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