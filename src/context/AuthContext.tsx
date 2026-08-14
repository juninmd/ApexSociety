import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../data/mock';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
    login: (username: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
    });

    const login = async (username: string) => {
        // Simulate an API call
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                const user = MOCK_USERS.find((u) => u.username === username);
                if (user) {
                    setState({ user, isAuthenticated: true });
                    resolve();
                } else {
                    reject(
                        new Error('User not found. Use "DriftKingBR" or "SpeedDemon" for testing.'),
                    );
                }
            }, 500);
        });
    };

    const logout = () => {
        setState({ user: null, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
