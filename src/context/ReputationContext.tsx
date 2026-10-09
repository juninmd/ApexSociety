import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Bounty {
    id: string;
    targetUserId: string;
    targetUsername: string;
    amount: number;
    placedBy: string;
}

interface ReputationContextType {
    reputation: number;
    scoutScore: number;
    nemesisId: string | null;
    activeBounties: Bounty[];
    addReputation: (amount: number) => void;
    addScoutScore: (amount: number) => void;
    spendReputation: (amount: number) => boolean;
    toggleNemesis: (userId: string) => void;
    placeBounty: (targetUserId: string, targetUsername: string, amount: number) => boolean;
    claimBounty: (bountyId: string) => void;
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
    const [activeBounties, setActiveBounties] = useState<Bounty[]>([
        { id: 'b1', targetUserId: 'user-1', targetUsername: 'DriftKingBR', amount: 500, placedBy: 'System' }
    ]);

    const placeBounty = (targetUserId: string, targetUsername: string, amount: number) => {
        if (spendReputation(amount)) {
            setActiveBounties(prev => [...prev, {
                id: Math.random().toString(36).substring(7),
                targetUserId,
                targetUsername,
                amount,
                placedBy: 'You'
            }]);
            return true;
        }
        return false;
    };

    const claimBounty = (bountyId: string) => {
        const bounty = activeBounties.find(b => b.id === bountyId);
        if (bounty) {
            addReputation(bounty.amount);
            setActiveBounties(prev => prev.filter(b => b.id !== bountyId));
        }
    };

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
                activeBounties,
                addReputation,
                addScoutScore,
                spendReputation,
                toggleNemesis,
                placeBounty,
                claimBounty,
            }}
        >
            {children}
        </ReputationContext.Provider>
    );
};
