'use client'
import React from 'react';
import { DollarSign, Users, ReceiptText, ArrowLeftRight, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";

export default function Page() {
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
              <div className="text-2xl font-bold">$45,231.89</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proveedores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+50</div>
              <p className="text-xs text-muted-foreground">200 en total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comprobantes</CardTitle>
              <ReceiptText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Movimeintos</CardTitle>
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>



        <div className="mt-6">
          <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2 md:grid-rows-1 lg:grid-rows-2">
            <Card>
              <CardHeader>
                <CardTitle>Proveedores Recientes</CardTitle>
                <CardDescription>Utimos 10 proveedores</CardDescription>
              </CardHeader>
              <ScrollArea className="h-[200px] w-full">
                <CardContent>
                  <div className="space-y-8">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">Olivia Martin</p>
                          <p className="text-sm text-muted-foreground">
                            olivia.martin@email.com
                          </p>
                        </div>
                        <div className="ml-auto font-medium">+$1,999.00</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>

            <Card className='flex items-center justify-between'>
              <div className='h-full w-full'>
                <CardHeader className="flex flex-row items-center space-y-0 pb-5">
                  <CalendarDays className="h-4 w-4 mr-3 text-muted-foreground" />
                  <CardTitle className="text-sm font-medium">Calendario</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col pt-5 text-center justify-center'>
                  <p className="text-sm text-muted-foreground">La fecha de hoy es</p>
                  <div className="text-2xl font-bold">30 de Octubre</div>
                </CardContent>
              </div>
              <Calendar
                mode="multiple"
              />
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Proveedores Recientes</CardTitle>
                <CardDescription>Utimos 10 proveedores</CardDescription>
              </CardHeader>
              <ScrollArea className="h-[200px] w-full">
                <CardContent>
                  <div className="space-y-8">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">Olivia Martin</p>
                          <p className="text-sm text-muted-foreground">
                            olivia.martin@email.com
                          </p>
                        </div>
                        <div className="ml-auto font-medium">+$1,999.00</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Proveedores Recientes</CardTitle>
                <CardDescription>Utimos 10 proveedores</CardDescription>
              </CardHeader>
              <ScrollArea className="h-[200px] w-full">
                <CardContent>
                  <div className="space-y-8">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">Olivia Martin</p>
                          <p className="text-sm text-muted-foreground">
                            olivia.martin@email.com
                          </p>
                        </div>
                        <div className="ml-auto font-medium">+$1,999.00</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </main>
    </div >
  )
}