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

const movimientos = [
    {
        id: '1',
        importeMovimiento: 1500000,
        medioPago: 'Transferencia',
        comentarioMovimiento: 'Pago a Proveedor A',
        fechaAltaMovimiento: new Date('2023-01-01T10:00:00'),
        comprobantes: new Set(),
    },
    {
        id: '2',
        importeMovimiento: 7500000,
        medioPago: 'Efectivo',
        comentarioMovimiento: 'Pago a Proveedor B',
        fechaAltaMovimiento: new Date('2023-01-02T11:00:00'),
        comprobantes: new Set(),
    },
    {
        id: '3',
        importeMovimiento: 2000000,
        medioPago: 'Tarjeta de Crédito',
        comentarioMovimiento: 'Pago a Proveedor C',
        fechaAltaMovimiento: new Date('2023-01-03T12:00:00'),
        comprobantes: new Set(),
    },
    {
        id: '4',
        importeMovimiento: 1000000,
        medioPago: 'Cheque',
        comentarioMovimiento: 'Pago a Proveedor D',
        fechaAltaMovimiento: new Date('2023-01-04T13:00:00'),
        comprobantes: new Set(),
    },
    {
        id: '5',
        importeMovimiento: 3000000,
        medioPago: 'Transferencia',
        comentarioMovimiento: 'Pago a Proveedor E',
        fechaAltaMovimiento: new Date('2023-01-05T14:00:00'),
        comprobantes: new Set(),
    },
];

export default function Page() {
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