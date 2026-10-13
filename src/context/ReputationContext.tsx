import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ReputationContextType {
    reputation: number;
    scoutScore: number;
    nemesisId: string | null;
    isDecaying: boolean;
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
    const [lastActive, setLastActive] = useState<number>(() => Date.now());
    const [isDecaying, setIsDecaying] = useState(false);

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

    // Gamified Underground Reputation Decay
    React.useEffect(() => {
        if (process.env.NODE_ENV === 'test') {
            return;
        }

        const interval = setInterval(() => {
            const now = Date.now();
            const inactiveTime = now - lastActive;

            // Decay kicks in if inactive for more than 5 minutes (mocking 5 days in a real app)
            if (inactiveTime > 5 * 60 * 1000) {
                setReputation((prev) => Math.max(0, prev - 1)); // Deduct 1 REP periodically
                setIsDecaying(true);
            } else {
                setIsDecaying(false);
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [lastActive]);

    return (
        <ReputationContext.Provider
            value={{
                reputation,
                scoutScore,
                nemesisId,
                isDecaying,
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
