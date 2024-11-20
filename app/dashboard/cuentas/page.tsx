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

//no encontre la api de proveedores

export default function Page() {
  const [providers, setProviders] = useState<any[]>([]);
  const { getToken } = useAuth();
  const token = getToken();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          "https://cuenta-proveedores.up.railway.app/api/proveedores",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los proveedores");
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      }
    };
    if (token) {
      fetchProviders();
    } else {
      console.error("No se encontró el token");
    }
  }, [token]); 
  
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Proveedores</CardTitle>
          <Button>
            <Plus className="md:mr-2 h-4 w-4" />{" "}
            <p className="hidden md:block">Agregar Proveedor</p>
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
                  <TableCell className="text-center">
                    ${provider.balance.toLocaleString()}
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
