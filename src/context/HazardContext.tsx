import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Location } from '../types';

export type HazardType = 'blitz' | 'radar' | 'acidente' | 'sos' | 'flare';

export interface Hazard {
    id: string;
    type: HazardType;
    location: Location;
    reportedAt: string;
    severity?: 'low' | 'medium' | 'high';
    verifications?: number;
    fakes?: number;
}

interface HazardContextType {
    hazards: Hazard[];
    addHazard: (hazard: Hazard) => void;
    verifyHazard: (id: string, isFake?: boolean) => void;
    heatLevel: number;
    getHeatMapDensity: () => number;
}

const HazardContext = createContext<HazardContextType | undefined>(undefined);

export function useHazards() {
    const context = useContext(HazardContext);
    if (!context) {
        throw new Error('useHazards must be used within a HazardProvider');
    }
    return context;
}

interface HazardProviderProps {
    children: ReactNode;
}

export const HazardProvider: React.FC<HazardProviderProps> = ({ children }) => {
    const [hazards, setHazards] = useState<Hazard[]>([]);

    const addHazard = (hazard: Hazard) => {
        setHazards((prev) => [...prev, { ...hazard, verifications: 1, fakes: 0 }]);
    };

    const verifyHazard = (id: string, isFake?: boolean) => {
        setHazards((prev) =>
            prev
                .map((h) => {
                    if (h.id === id) {
                        if (isFake) {
                            return { ...h, fakes: (h.fakes || 0) + 1 };
                        }
                        return { ...h, verifications: (h.verifications || 0) + 1 };
                    }
                    return h;
                })
                .filter((h) => (h.fakes || 0) < 5),
        ); // Remove if 5 people flagged it as fake
    };

    const heatLevel = hazards.filter((h) => h.type === 'blitz' || h.type === 'radar').length;

    React.useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setHazards((prev) => {
                const filtered = prev.filter((hazard) => {
                    const reportedAt = new Date(hazard.reportedAt);
                    const diffMs = now.getTime() - reportedAt.getTime();
                    const diffMinutes = diffMs / (1000 * 60);

                    // 30 minutes for blitz, 120 minutes (2 hours) for others
                    if (hazard.type === 'blitz') {
                        return diffMinutes < 30;
                    } else if (hazard.type === 'acidente') {
                        return diffMinutes < 120;
                    }
                    return diffMinutes < 60; // 1 hour default
                });

                return filtered.length === prev.length ? prev : filtered;
            });
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    const getHeatMapDensity = () => {
        // Base multiplier is 1.
        // Cap the multiplier at 3x to prevent map over-saturation.
        let densityAddition = 0;
        for (const hazard of hazards) {
            if (hazard.severity === 'high') {
                densityAddition += 0.3;
            } else if (hazard.severity === 'medium') {
                densityAddition += 0.2;
            } else {
                densityAddition += 0.1;
            }
        }

        const multiplier = 1 + densityAddition;
        return Math.min(multiplier, 3);
    };

    return (
        <HazardContext.Provider
            value={{
                hazards,
                addHazard,
                verifyHazard,
                heatLevel: heatLevel * getHeatMapDensity(),
                getHeatMapDensity,
            }}
        >
            {children}
        </HazardContext.Provider>
    );
};
