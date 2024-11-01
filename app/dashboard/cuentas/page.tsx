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

const providers = [
  { id: 1, name: 'Proveedor A', balance: 1500000 },
  { id: 2, name: 'Proveedor B', balance: 7500000 },
  { id: 3, name: 'Proveedor C', balance: 2000000 },
  { id: 4, name: 'Proveedor D', balance: 1000000 },
  { id: 5, name: 'Proveedor E', balance: 3000000 },
]
export default function Page() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Proveedores</CardTitle>
          <Button>
            <Plus className="md:mr-2 h-4 w-4" /> <p className='hidden md:block'>Agregar Proveedor</p>
          </Button>
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
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">{provider.name}</TableCell>
                  <TableCell className="text-center">${provider.balance.toLocaleString()}</TableCell>
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