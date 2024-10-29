import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>){
  return (
    <html lang="es">
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark" 
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
