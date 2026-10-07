import { useState, useCallback } from 'react';
import { Location } from '../types';
import { Hazard } from '../context/HazardContext';

export function useEvasionRoute() {
    const [evasionRouteActive, setEvasionRouteActive] = useState(false);
    const [evasionWaypoints, setEvasionWaypoints] = useState<Location[]>([]);

    const calculateEvasionRoute = useCallback((hazards: Hazard[], startLocation: Location) => {
        // Mocking a safe route by offsetting heavily from hazards
        const safeWaypoints: Location[] = [];
        let currentLocation = { ...startLocation };

        // Generate 3 safe waypoints
        for (let i = 0; i < 3; i++) {
            // Check if any hazard is nearby (mock simplistic check)
            const isHazardNear = hazards.some(
                (h) =>
                    Math.abs(h.location.latitude - currentLocation.latitude) < 0.05 &&
                    Math.abs(h.location.longitude - currentLocation.longitude) < 0.05,
            );

            // Shift away from the typical grid
            const offsetLat = isHazardNear ? 0.02 : 0.005;
            const offsetLng = isHazardNear ? -0.02 : 0.005;

            const nextPoint = {
                latitude: currentLocation.latitude + offsetLat,
                longitude: currentLocation.longitude + offsetLng,
            };

            safeWaypoints.push(nextPoint);
            currentLocation = nextPoint;
        }

        setEvasionWaypoints(safeWaypoints);
        setEvasionRouteActive(true);
        return safeWaypoints;
    }, []);

    const clearEvasionRoute = useCallback(() => {
        setEvasionRouteActive(false);
        setEvasionWaypoints([]);
    }, []);

    return {
        evasionRouteActive,
        evasionWaypoints,
        calculateEvasionRoute,
        clearEvasionRoute,
    };
}
