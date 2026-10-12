import { useState, useEffect } from 'react';
import { useConvoy } from '../context/ConvoyContext';
import { useReputation } from '../context/ReputationContext';

// Thresholds for the Slipstream Gamification Feature
const SLIPSTREAM_MIN_SPEED = 80; // km/h
const SLIPSTREAM_MAX_DISTANCE = 0.005; // Mock latitude/longitude distance threshold (~500m)

export function useSlipstream(currentSpeed: number) {
    const { isConvoyActive, crewMembers } = useConvoy();
    const { addReputation } = useReputation();
    const [isDrafting, setIsDrafting] = useState(false);

    // Simulate current user location to calculate distance (in a real app, use Location context)
    // For this gamification demo, we use a fixed central point and compare with mock crew coordinates.

    useEffect(() => {
        let draftingState = false;

        if (isConvoyActive && currentSpeed >= SLIPSTREAM_MIN_SPEED) {
            draftingState = crewMembers.some((member) => {
                const latDiff = Math.abs(member.location.latitude - -23.5505);
                const lngDiff = Math.abs(member.location.longitude - -46.6333);
                // Simple euclidean distance approximation for the mock
                const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
                return distance < SLIPSTREAM_MAX_DISTANCE;
            });
        }

        // This is safe since we only trigger a re-render if it changed
        setTimeout(() => {
            setIsDrafting((prev) => {
                if (prev !== draftingState) return draftingState;
                return prev;
            });
        }, 0);
    }, [isConvoyActive, currentSpeed, crewMembers]);

    // Award passive REP while drafting
    useEffect(() => {
        if (!isDrafting) return;

        const repInterval = setInterval(() => {
            addReputation(5); // Award 5 REP every few seconds
        }, 5000);

        return () => clearInterval(repInterval);
    }, [isDrafting, addReputation]);

    return { isDrafting };
}
