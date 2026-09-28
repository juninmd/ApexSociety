import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ReputationContextType {
    reputation: number;
    addReputation: (amount: number) => void;
    spendReputation: (amount: number) => boolean;
}

const ReputationContext = createContext<ReputationContextType | undefined>(undefined);

export function useReputation() {
    const context = useContext(ReputationContext);
    if (!context) {
        throw new Error('useReputation must be used within a ReputationProvider');
    }
    return context;
}

interface ReputationProviderProps {
    children: ReactNode;
}

export const ReputationProvider: React.FC<ReputationProviderProps> = ({ children }) => {
    // Start with some base reputation
    const [reputation, setReputation] = useState(420);

    const spendReputation = (amount: number) => {
        if (reputation >= amount) {
            setReputation((prev) => prev - amount);
            return true;
        }
        return false;
    };

    const addReputation = (amount: number) => {
        setReputation((prev) => prev + amount);
    };

    return (
        <ReputationContext.Provider value={{ reputation, addReputation, spendReputation }}>
            {children}
        </ReputationContext.Provider>
    );
};
