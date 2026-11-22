import React, { createContext, useContext, useRef, useState, ReactNode } from 'react';

interface ReputationContextType {
    reputation: number;
    scoutScore: number;
    nemesisId: string | null;
    isDecaying: boolean;
    hasVipPass: boolean;
    checkedInHotspots: string[];
    checkedInEvents: string[];
    addReputation: (amount: number) => void;
    addScoutScore: (amount: number) => void;
    spendReputation: (amount: number) => boolean;
    toggleNemesis: (userId: string) => void;
    unlockVipPass: () => void;
    checkInHotspot: (id: string) => boolean;
    markEventCheckedIn: (id: string) => boolean;
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
    // Earning, spending or checking in counts as activity and postpones the decay.
    const [mountedAt] = useState<number>(() => Date.now());
    const lastActiveRef = useRef<number>(mountedAt);
    const markActive = () => {
        lastActiveRef.current = Date.now();
    };
    const [isDecaying, setIsDecaying] = useState(false);
    const [hasVipPass, setHasVipPass] = useState(false);
    const [checkedInHotspots, setCheckedInHotspots] = useState<string[]>([]);
    const [checkedInEvents, setCheckedInEvents] = useState<string[]>([]);

    const checkInHotspot = (id: string) => {
        if (!checkedInHotspots.includes(id)) {
            setCheckedInHotspots((prev) => [...prev, id]);
            addReputation(50);
            return true; // Successfully checked in
        }
        return false; // Already checked in
    };

    // Reputation for an event is awarded once per session, even if the card is unmounted and remounted.
    const markEventCheckedIn = (id: string) => {
        if (checkedInEvents.includes(id)) return false;
        markActive();
        setCheckedInEvents((prev) => (prev.includes(id) ? prev : [...prev, id]));
        return true;
    };

    const toggleNemesis = (userId: string) => {
        setNemesisId((prev) => (prev === userId ? null : userId));
    };

    const spendReputation = (amount: number) => {
        if (reputation >= amount) {
            markActive();
            setReputation((prev) => prev - amount);
            return true;
        }
        return false;
    };

    const addReputation = (amount: number) => {
        markActive();
        setReputation((prev) => prev + amount);
    };

    const addScoutScore = (amount: number) => {
        markActive();
        setScoutScore((prev) => prev + amount);
    };

    const unlockVipPass = () => {
        setHasVipPass(true);
    };

    // Gamified Underground Reputation Decay
    React.useEffect(() => {
        if (process.env.NODE_ENV === 'test') {
            return;
        }

        const interval = setInterval(() => {
            const now = Date.now();
            const inactiveTime = now - lastActiveRef.current;

            // Decay kicks in if inactive for more than 5 minutes (mocking 5 days in a real app)
            if (inactiveTime > 5 * 60 * 1000) {
                setReputation((prev) => Math.max(0, prev - 1)); // Deduct 1 REP periodically
                setIsDecaying(true);
            } else {
                setIsDecaying(false);
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <ReputationContext.Provider
            value={{
                reputation,
                scoutScore,
                nemesisId,
                isDecaying,
                hasVipPass,
                checkedInHotspots,
                checkedInEvents,
                addReputation,
                addScoutScore,
                spendReputation,
                toggleNemesis,
                unlockVipPass,
                checkInHotspot,
                markEventCheckedIn,
            }}
        >
            {children}
        </ReputationContext.Provider>
    );
};
