import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ReputationContextType {
    reputation: number;
    addReputation: (amount: number) => void;
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

    const addReputation = (amount: number) => {
        setReputation((prev) => prev + amount);
    };

    return (
        <ReputationContext.Provider value={{ reputation, addReputation }}>
            {children}
        </ReputationContext.Provider>
    );
};
