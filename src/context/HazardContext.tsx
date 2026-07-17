import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Location } from '../types';

export type HazardType = 'blitz' | 'radar' | 'acidente' | 'sos';

export interface Hazard {
    id: string;
    type: HazardType;
    location: Location;
    reportedAt: string;
}

interface HazardContextType {
    hazards: Hazard[];
    addHazard: (hazard: Hazard) => void;
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
        setHazards((prev) => [...prev, hazard]);
    };

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

    return (
        <HazardContext.Provider value={{ hazards, addHazard }}>{children}</HazardContext.Provider>
    );
};
