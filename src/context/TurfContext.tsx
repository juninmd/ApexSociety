import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MOCK_TERRITORIES } from '../data/mock';

export interface Territory {
    id: string;
    crewId: string;
    center: { latitude: number; longitude: number };
    radius: number;
    color: string;
    dominance: number;
}

interface TurfContextType {
    territories: Territory[];
    claimTurf: (territoryId: string, amount: number) => void;
}

const TurfContext = createContext<TurfContextType | undefined>(undefined);

export function useTurf() {
    const context = useContext(TurfContext);
    if (!context) {
        throw new Error('useTurf must be used within a TurfProvider');
    }
    return context;
}

export function TurfProvider({ children }: { children: ReactNode }) {
    const [territories, setTerritories] = useState<Territory[]>(MOCK_TERRITORIES);

    const claimTurf = (territoryId: string, amount: number) => {
        setTerritories((prev) =>
            prev.map((t) =>
                t.id === territoryId
                    ? { ...t, dominance: Math.min(100, Math.max(0, t.dominance + amount)) }
                    : t,
            ),
        );
    };

    return (
        <TurfContext.Provider value={{ territories, claimTurf }}>{children}</TurfContext.Provider>
    );
}
