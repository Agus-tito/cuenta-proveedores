'use client';
import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation';
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AppNavbar() {
    const pathname = usePathname();
    const { setTheme } = useTheme();

    const pathSegments = pathname.split('/').filter(segment => segment);

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
            <SidebarTrigger className="-ml-1 fixed" />

            <Breadcrumb className="pl-10">
                <BreadcrumbList>
                    {pathSegments.map((segment, index) => {
                        const href = '/' + pathSegments.slice(0, index + 1).join('/');
                        return (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink href={href} className="text-lg font-medium">
                                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                </BreadcrumbLink>
                                {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
                            </BreadcrumbItem>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
