import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MOCK_TERRITORIES, MOCK_CREWS } from '../data/mock';

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
    crewHeatScores: Record<string, number>;
    claimTurf: (territoryId: string, amount: number) => void;
    boostCrewHeat: (crewId: string, amount: number) => void;
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

    // Initialize heat scores from MOCK_CREWS
    const initialHeatScores = MOCK_CREWS.reduce(
        (acc, crew) => {
            acc[crew.id] = crew.heatScore || 0;
            return acc;
        },
        {} as Record<string, number>,
    );

    const [crewHeatScores, setCrewHeatScores] = useState<Record<string, number>>(initialHeatScores);

    const claimTurf = (territoryId: string, amount: number) => {
        setTerritories((prev) =>
            prev.map((t) =>
                t.id === territoryId
                    ? { ...t, dominance: Math.min(100, Math.max(0, t.dominance + amount)) }
                    : t,
            ),
        );
    };

    const boostCrewHeat = (crewId: string, amount: number) => {
        setCrewHeatScores((prev) => ({
            ...prev,
            [crewId]: (prev[crewId] || 0) + amount,
        }));
    };

    // Decay crew heat scores over time
    useEffect(() => {
        const interval = setInterval(() => {
            setCrewHeatScores((prev) => {
                const updated = { ...prev };
                let hasChanges = false;
                for (const crewId in updated) {
                    if (updated[crewId] > 0) {
                        updated[crewId] = Math.max(0, updated[crewId] - 1);
                        hasChanges = true;
                    }
                }
                return hasChanges ? updated : prev;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <TurfContext.Provider value={{ territories, crewHeatScores, claimTurf, boostCrewHeat }}>
            {children}
        </TurfContext.Provider>
    );
}
