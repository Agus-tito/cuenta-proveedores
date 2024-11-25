'use client';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/authContext";
import { getComprobante } from "@/lib/services/comprobantes";
import { getAccount } from "@/lib/services/cuentas";
import { fetchMovimientos } from "@/lib/services/movimientos";
import { ArrowLeftRight, CalendarDays, DollarSign, ReceiptText, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator"


interface Comprobante {
  id: number;
  tipoComprobante: string;
  montoComprobante: number;
}

interface Movimiento {
  id: number;
  comentarioMovimiento: string;
  importeMovimiento: number;
}

interface Cuenta {
  id: number;
  name: string;
  nombreProveedor: string,
  numeroCelular: string,
  emailProveedor: string,
  direccionProveedor: string,
  fechaBajaLogicaCuenta: string,
}

export default function Page() {
  const [comprobantes, setComprobantes] = useState<Comprobante[]>([]);
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);


  const { getToken } = useAuth();
  const token = getToken();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedComprobantes = await getComprobante(token);
        const fetchedCuentas = await getAccount(token);
        const fetchedMovimientos = await fetchMovimientos(token);

        setComprobantes(fetchedComprobantes);
        setCuentas(fetchedCuentas);
        setMovimientos(fetchedMovimientos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${movimientos.reduce((acc, movimiento) => acc + movimiento.importeMovimiento, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proveedores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cuentas.length}</div>
              <p className="text-xs text-muted-foreground">{cuentas.length} en total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comprobantes</CardTitle>
              <ReceiptText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comprobantes.length}</div>
              <p className="text-xs text-muted-foreground">Actualizados recientemente</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Movimientos</CardTitle>
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{movimientos.length}</div>
              <p className="text-xs text-muted-foreground">Movimientos registrados</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2 md:grid-rows-1 lg:grid-rows-2">
            <Card>
              <CardHeader>
                <CardTitle>Proveedores Recientes</CardTitle>
                <CardDescription>Últimos 10 proveedores</CardDescription>
              </CardHeader>
              <ScrollArea className="h-[200px] w-full">
                <CardContent>
                  <div>
                    {cuentas.slice(0, 10).map((cuenta) => (
                      <div>
                        <div key={cuenta.id} className="flex items-center justify-between my-2">
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{cuenta.nombreProveedor}</p>
                            <p className="text-xs">{cuenta.emailProveedor}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm">{cuenta.name}</p>
                          </div>
                          <div className="mr-4 space-y-1">
                            <p className="text-sm">{cuenta.direccionProveedor}</p>
                          </div>
                        </div>
                        <Separator />
                      </div>

                    ))}
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>

            <Card className="flex items-center justify-between">
              <div className="h-full w-full">
                <CardHeader className="flex flex-row items-center space-y-0 pb-5">
                  <CalendarDays className="h-4 w-4 mr-3 text-muted-foreground" />
                  <CardTitle className="text-sm font-medium">Calendario</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col pt-5 text-center justify-center">
                  <p className="text-sm text-muted-foreground">La fecha de hoy es</p>
                  <div className="text-2xl font-bold">{new Date().toLocaleDateString()}</div>
                </CardContent>
              </div>
              <Calendar mode="multiple" />
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Movimientos Recientes</CardTitle>
                <CardDescription>Últimos 10 movimientos</CardDescription>
              </CardHeader>
              <ScrollArea className="h-[200px] w-full">
                <CardContent>
                  <div className="space-y-8">
                    {movimientos.slice(0, 10).map((movimiento) => (
                      <div key={movimiento.id} className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{movimiento.comentarioMovimiento}</p>
                          <p className="text-sm text-muted-foreground">Importe: ${movimiento.importeMovimiento}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comprobantes Recientes</CardTitle>
                <CardDescription>Últimos 10 comprobantes</CardDescription>
              </CardHeader>
              <ScrollArea className="h-[200px] w-full">
                <CardContent>
                  <div className="space-y-8">
                    {comprobantes.slice(0, 10).map((comprobante) => (
                      <div key={comprobante.id} className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">Tipo: {comprobante.tipoComprobante}</p>
                          <p className="text-sm text-muted-foreground">Monto: ${comprobante.montoComprobante}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}