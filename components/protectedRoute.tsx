"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }else{
      router.replace('/auth/login');
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

