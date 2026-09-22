import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ReputationContextType {
    reputation: number;
    scoutScore: number;
    addReputation: (amount: number) => void;
    addScoutScore: (amount: number) => void;
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
    const [scoutScore, setScoutScore] = useState(0);

    const addReputation = (amount: number) => {
        setReputation((prev) => prev + amount);
    };

    const addScoutScore = (amount: number) => {
        setScoutScore((prev) => prev + amount);
    };

    return (
        <ReputationContext.Provider value={{ reputation, scoutScore, addReputation, addScoutScore }}>
            {children}
        </ReputationContext.Provider>
    );
};
