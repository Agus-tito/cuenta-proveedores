// "use client";
// import { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

// interface AuthContextType {
//   isAuthenticated: boolean | undefined;
//   login: (token: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = Cookies.get('token');
//     if(token){
//       setIsAuthenticated(true); 
//     }
//     setIsAuthenticated(false); //si queres evitar el loguin ponelo en true
//   }, []);

//   const login = (token: string) => {
//     Cookies.set('token', token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     Cookies.remove('token');
//     setIsAuthenticated(false);
//     router.push('/auth/login');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean | undefined;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
 
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(!!token);
    } else {
      setIsAuthenticated(false);
    }
  }, [router]);

  const login = (token: string) => {
    Cookies.set("token", token, {
      expires: 1,
      path: "/",
      secure: true,
      sameSite: "strict",
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
