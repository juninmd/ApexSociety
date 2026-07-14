import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Location } from '../types';

export type HazardType = 'blitz' | 'radar' | 'acidente';

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

    return (
        <HazardContext.Provider value={{ hazards, addHazard }}>{children}</HazardContext.Provider>
    );
};
