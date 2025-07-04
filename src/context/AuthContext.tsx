// src/context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// 1. Definindo a "forma" (tipo) do valor que o contexto irá fornecer.
interface AuthContextType {
    isLoggedIn: boolean;
    login: (usuarioId: string | number) => void;
    logout: () => void;
}

// 2. Definindo o tipo para as props do nosso Provedor.
interface AuthProviderProps {
    children: ReactNode; // 'ReactNode' é o tipo correto para 'children' em React.
}

// 3. Criando o Contexto com o tipo definido.
//    O valor inicial é null, mas informamos ao TypeScript que, quando usado,
//    ele terá a forma de 'AuthContextType'.
export const AuthContext = createContext<AuthContextType | null>(null);

// 4. Criando o componente Provedor com as props tipadas.
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // useEffect permanece igual, pois sua lógica não depende de tipos complexos.
    useEffect(() => {
        const usuarioId = sessionStorage.getItem('id');
        if (usuarioId) {
            setIsLoggedIn(true);
        }
    }, []);

    // 5. Tipando o parâmetro da função 'login'.
    const login = (usuarioId: string | number) => {
        sessionStorage.setItem('id', String(usuarioId));
        setIsLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.removeItem('id');
        setIsLoggedIn(false);
    };

    // O valor fornecido pelo Provider agora corresponde à nossa interface 'AuthContextType'.
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// (Opcional, mas altamente recomendado) Criar um Hook customizado para consumir o contexto.
// Isso evita ter que verificar se o contexto é nulo toda vez que for usado.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};