import { useState, useEffect } from 'react';
import { Location } from '../types';
import { useHazards } from '../context/HazardContext';

export function usePerfectRoute(currentLocation: Location, destination: Location) {
    const { hazards } = useHazards();
    const [routeWaypoints, setRouteWaypoints] = useState<Location[]>([]);
    const [isCalculating, setIsCalculating] = useState(false);

    useEffect(() => {
        if (!currentLocation || !destination) return;

        // Schedule to avoid synchronous setState inside useEffect
        setTimeout(() => setIsCalculating(true), 0);

        // Simulate an AI calculation avoiding hazards (mocking an A* algorithm for demo)
        const calculateRoute = setTimeout(() => {
            const waypoints: Location[] = [];
            waypoints.push(currentLocation);

            // Simple midpoint for mocking a curved route
            const midLat = (currentLocation.latitude + destination.latitude) / 2;
            const midLng = (currentLocation.longitude + destination.longitude) / 2;

            // Check if midpoint is near a high hazard, offset if so
            const nearHazard = hazards.some(
                (h) => Math.abs(h.location.latitude - midLat) < 0.01 && h.severity === 'high',
            );

            let offsetLat = midLat;
            let offsetLng = midLng;

            if (nearHazard) {
                // "Evade" the hazard by offsetting the route slightly
                offsetLat += 0.02;
                offsetLng += 0.02;
            }

            waypoints.push({ latitude: offsetLat, longitude: offsetLng });
            waypoints.push(destination);

            setRouteWaypoints(waypoints);
            setIsCalculating(false);
        }, 1500);

        return () => clearTimeout(calculateRoute);
    }, [currentLocation, destination, hazards]);

    return { routeWaypoints, isCalculating };
}
