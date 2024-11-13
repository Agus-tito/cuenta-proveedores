import { ProtectedRoute } from "@/components/protectedRoute";
import { AuthProvider } from "@/lib/authContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="auth-layout w-full h-screen flex justify-center items-center">
          {children}
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
