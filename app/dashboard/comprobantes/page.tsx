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

const comprobantes = [
  {
    id: '1',
    tipo_comprobante: 'Factura',
    descripcion: 'Factura de venta',
    nroComprobante: 123456,
    fechaAltaComprobante: new Date(),
  },
  {
    id: '2',
    tipo_comprobante: 'Factura',
    descripcion: 'Factura de venta',
    nroComprobante: 123456,
    fechaAltaComprobante: new Date(),
  },
  {
    id: '3',
    tipo_comprobante: 'Factura',
    descripcion: 'Factura de venta',
    nroComprobante: 123456,
    fechaAltaComprobante: new Date(),
  },
  {
    id: '4',
    tipo_comprobante: 'Factura',
    descripcion: 'Factura de venta',
    nroComprobante: 123456,
    fechaAltaComprobante: new Date(),
  },
  {
    id: '5',
    tipo_comprobante: 'Factura',
    descripcion: 'Factura de venta',
    nroComprobante: 123456,
    fechaAltaComprobante: new Date(),
  },
];
export default function Page() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Comprobantes</CardTitle>
          <Button>
            <Plus className="md:mr-2 h-4 w-4" /> <p className='hidden md:block'>Agregar Comprobante</p>
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
                  <TableCell className="font-medium">{comprobante.id}</TableCell>
                  <TableCell>{comprobante.tipo_comprobante}</TableCell>
                  <TableCell>{comprobante.descripcion}</TableCell>
                  <TableCell>{comprobante.nroComprobante.toLocaleString()}</TableCell>
                  <TableCell>{comprobante.fechaAltaComprobante.toLocaleString()}</TableCell>
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