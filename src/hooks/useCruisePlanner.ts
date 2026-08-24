import { useState } from 'react';
import { Location } from '../types';

export function useCruisePlanner() {
    const [isPlannerActive, setIsPlannerActive] = useState(false);
    const [waypoints, setWaypoints] = useState<Location[]>([]);

    const togglePlanner = () => {
        setIsPlannerActive(!isPlannerActive);
        if (isPlannerActive) {
            setWaypoints([]); // clear on close
        }
    };

    const addWaypoint = (loc: Location) => {
        if (!isPlannerActive) return;
        setWaypoints((prev) => [...prev, loc]);
    };

    const clearWaypoints = () => {
        setWaypoints([]);
    };

    return {
        isPlannerActive,
        waypoints,
        togglePlanner,
        addWaypoint,
        clearWaypoints,
    };
}
