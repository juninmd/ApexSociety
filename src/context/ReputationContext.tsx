import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ReputationContextType {
    reputation: number;
    scoutScore: number;
    nemesisId: string | null;
    addReputation: (amount: number) => void;
    addScoutScore: (amount: number) => void;
    spendReputation: (amount: number) => boolean;
    toggleNemesis: (userId: string) => void;
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
    const [nemesisId, setNemesisId] = useState<string | null>(null);

    const toggleNemesis = (userId: string) => {
        setNemesisId((prev) => (prev === userId ? null : userId));
    };

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

    const addScoutScore = (amount: number) => {
        setScoutScore((prev) => prev + amount);
    };

    return (
        <ReputationContext.Provider
            value={{
                reputation,
                scoutScore,
                nemesisId,
                addReputation,
                addScoutScore,
                spendReputation,
                toggleNemesis,
            }}
        >
            {children}
        </ReputationContext.Provider>
    );
};
