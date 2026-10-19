import { useState, useEffect } from 'react';
import { Location } from '../types';
import { CrewMemberLocation } from './ConvoyTypes';

export function useConvoyState() {
    const [crewMembers, setCrewMembers] = useState<CrewMemberLocation[]>([]);
    const [isConvoyActive, setIsConvoyActive] = useState(false);
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [ebsActive, setEbsActive] = useState(false);
    const [sosLocation, setSosLocation] = useState<Location | undefined>(undefined);
    const [ghostMode, setGhostMode] = useState(false);
    const [ghostStartTime, setGhostStartTime] = useState<number | undefined>(undefined);
    const [convoyHeatScore, setConvoyHeatScore] = useState(0);
    const [evacActive, setEvacActive] = useState(false);
    const [rallyPoint, setRallyPoint] = useState<Location | undefined>(undefined);

    useEffect(() => {
        if (!isConvoyActive) {
            setTimeout(() => setConvoyHeatScore(0), 0);
        } else {
            setTimeout(() => setConvoyHeatScore(crewMembers.length * 15), 0);
        }
    }, [isConvoyActive, crewMembers.length]);

    useEffect(() => {
        if (!isConvoyActive) return;
        const interval = setInterval(() => {
            setCrewMembers((prev) =>
                prev.map((member) => ({
                    ...member,
                    location: {
                        latitude: member.location.latitude + (Math.random() - 0.5) * 0.001,
                        longitude: member.location.longitude + (Math.random() - 0.5) * 0.001,
                    },
                    lastUpdated: Date.now(),
                })),
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [isConvoyActive]);

    return {
        crewMembers, setCrewMembers,
        isConvoyActive, setIsConvoyActive,
        isBroadcasting, setIsBroadcasting,
        ebsActive, setEbsActive,
        sosLocation, setSosLocation,
        ghostMode, setGhostMode,
        ghostStartTime, setGhostStartTime,
        convoyHeatScore, setConvoyHeatScore,
        evacActive, setEvacActive,
        rallyPoint, setRallyPoint,
    };
}
