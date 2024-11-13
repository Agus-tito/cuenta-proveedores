"use client";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/authContext';
import { ProtectedRoute } from '@/components/protectedRoute';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <ProtectedRoute>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
