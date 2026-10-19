import React, { createContext, useContext, ReactNode } from 'react';
import { Location } from '../types';
import { useHazardState } from './useHazardState';

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
    isJammerActive: boolean;
    activateJammer: () => void;
    isFakePlatesActive: boolean;
    activateFakePlates: () => void;
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
    const {
        hazards,
        isJammerActive,
        activateJammer,
        isFakePlatesActive,
        activateFakePlates,
        addHazard,
        verifyHazard,
    } = useHazardState();

    const heatLevel = hazards.filter((h) => h.type === 'blitz' || h.type === 'radar').length;

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

        let multiplier = 1 + densityAddition;

        // Fake plates artificially halve the map heat density footprint
        if (isFakePlatesActive) {
            multiplier = Math.max(1, multiplier * 0.5);
        }

        return Math.min(multiplier, 3);
    };

    // Filter out radar/blitz hazards if jammer is active
    const activeHazards = isJammerActive
        ? hazards.filter((h) => h.type !== 'radar' && h.type !== 'blitz')
        : hazards;

    return (
        <HazardContext.Provider
            value={{
                hazards: activeHazards,
                addHazard,
                verifyHazard,
                heatLevel: heatLevel * getHeatMapDensity(),
                getHeatMapDensity,
                isJammerActive,
                activateJammer,
                isFakePlatesActive,
                activateFakePlates,
            }}
        >
            {children}
        </HazardContext.Provider>
    );
};
