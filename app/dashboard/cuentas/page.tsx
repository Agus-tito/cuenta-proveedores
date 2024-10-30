'use client'

import { Plus, MoreHorizontal, FileText, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const providers = [
  { id: 1, name: 'Proveedor A', rut: '12.345.678-9', balance: 1500000, lastTransaction: '2023-05-15' },
  { id: 2, name: 'Proveedor B', rut: '98.765.432-1', balance: 750000, lastTransaction: '2023-05-14' },
  { id: 3, name: 'Proveedor C', rut: '45.678.901-2', balance: 2000000, lastTransaction: '2023-05-13' },
  { id: 4, name: 'Proveedor D', rut: '34.567.890-3', balance: 1000000, lastTransaction: '2023-05-12' },
  { id: 5, name: 'Proveedor E', rut: '56.789.012-4', balance: 3000000, lastTransaction: '2023-05-11' },
]
export default function Page() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Lista de Proveedores</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Agregar Proveedor
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>RUT</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Última Transacción</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">{provider.name}</TableCell>
                  <TableCell>{provider.rut}</TableCell>
                  <TableCell>${provider.balance.toLocaleString()}</TableCell>
                  <TableCell>{provider.lastTransaction}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Ver detalles</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>);
}