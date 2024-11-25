
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean | undefined;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);  //fecha actual mas un dia

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      console.log(token)
      setIsAuthenticated(!!token);
    } else {
      setIsAuthenticated(false);//Si queres evitar el login ponelo en true pero no vas a tener el token pa las apis
    }
  }, [router]);

  const login = (token: string) => {
    Cookies.set("token", token, {
      expires: expirationDate, 
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

  const getToken = () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        return token;
      }
      return null;
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
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
