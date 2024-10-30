'use client';
import { usePathname } from 'next/navigation';
import { ArrowLeftRight, Home, Users, ReceiptText, ChevronUp, User2 } from "lucide-react"
import Link from 'next/link';
import Image from 'next/image';
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarHeader,
} from "@/components/ui/sidebar"

import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const items = [
    {
        title: "Inicio",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Cuentas",
        url: "/dashboard/cuentas",
        icon: Users,
    },
    {
        title: "Movimientos",
        url: "/dashboard/movimientos",
        icon: ArrowLeftRight,
    },
    {
        title: "Comprobantes",
        url: "/dashboard/comprobantes",
        icon: ReceiptText,
    },
]


export function AppSidebar() {
    const pathname = usePathname();
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <a href="/dashboard">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                        <Image
                                            src="/logo.png"
                                            alt="Logo de la Empresa"
                                            width={30}
                                            height={30}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">PiezasYa</span>
                                        <span className="">Proveedores</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>Aplicación</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className={pathname === item.url ? 'bg-red-700 text-white' : ''}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> Usuario
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Cuenta</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
