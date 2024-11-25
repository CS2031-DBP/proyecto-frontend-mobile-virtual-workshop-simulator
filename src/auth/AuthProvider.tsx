import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  usuarioId: string | null;
  login: (id: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  usuarioId: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedUsuarioId = await AsyncStorage.getItem('usuarioId');

        setIsAuthenticated(!!token);
        setUsuarioId(storedUsuarioId);
      } catch (error) {
        console.error('Error al cargar el estado de autenticación:', error);
      }
    };

    checkAuth();
  }, []);

  const login = async (id: string, token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('usuarioId', id);

      setIsAuthenticated(true);
      setUsuarioId(id);
    } catch (error) {
      console.error('Error al guardar los datos de autenticación:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('usuarioId');

      setIsAuthenticated(false);
      setUsuarioId(null);
    } catch (error) {
      console.error('Error al eliminar los datos de autenticación:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuarioId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
