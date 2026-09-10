import { useHazards } from '../context/HazardContext';
import { useWeather } from './useWeather';
import { useTurf } from '../context/TurfContext';

export interface RouteThreatInfo {
    threatLevel: 'low' | 'medium' | 'high';
    advice: string;
}

export function useRouteThreat(): RouteThreatInfo {
    const { heatLevel } = useHazards();
    const { isRaining, isFoggy } = useWeather();
    const { crewHeatScores } = useTurf();

    let threatScore = 0;

    // Evaluate Hazards
    if (heatLevel > 2) {
        threatScore += 50;
    } else if (heatLevel > 0) {
        threatScore += 20;
    }

    // Evaluate Weather
    if (isRaining || isFoggy) {
        threatScore += 30;
    }

    // Evaluate Territory/Crew disputes (mock sum)
    const totalCrewHeat = Object.values(crewHeatScores).reduce((sum, score) => sum + score, 0);
    if (totalCrewHeat > 15000) {
        threatScore += 30;
    } else if (totalCrewHeat > 8000) {
        threatScore += 10;
    }

    if (threatScore >= 70) {
        return {
            threatLevel: 'high',
            advice: 'CRITICAL THREAT: Heavy police activity and severe conditions. Reroute via Underground paths immediately.',
        };
    } else if (threatScore >= 30) {
        return {
            threatLevel: 'medium',
            advice: 'ELEVATED RISK: Proceed with caution. Speed enforcement or hazards detected ahead.',
        };
    }

    return {
        threatLevel: 'low',
        advice: 'ROUTE CLEAR: Minimal threat detected. Safe for cruising.',
    };
}
