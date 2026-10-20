import React, { createContext, useContext } from 'react';
import { Location } from '../types';
import { useGhostTrail } from '../hooks/useGhostTrail';
import { useConvoyChat } from '../hooks/useConvoyChat';
import { useConvoyState } from './useConvoyState';
import { ConvoyContextType, CrewMemberLocation, ChatMessage } from './ConvoyTypes';

export type { ChatMessage, CrewMemberLocation };

const ConvoyContext = createContext<ConvoyContextType | undefined>(undefined);

export const ConvoyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        crewMembers,
        setCrewMembers,
        isConvoyActive,
        setIsConvoyActive,
        isBroadcasting,
        setIsBroadcasting,
        ebsActive,
        setEbsActive,
        sosLocation,
        setSosLocation,
        ghostMode,
        setGhostMode,
        ghostStartTime,
        setGhostStartTime,
        convoyHeatScore,
        evacActive,
        setEvacActive,
        rallyPoint,
        setRallyPoint,
    } = useConvoyState();

    const { ghostCoordinates } = useGhostTrail(ghostMode, process.env.NODE_ENV === 'test');
    const { chatMessages, addChatMessage } = useConvoyChat();

    const deployRallyFlare = (location: Location) => {
        if (!isConvoyActive) return;
        setRallyPoint(location);
        setTimeout(() => setRallyPoint(undefined), 60000); // 60 seconds
    };

    const triggerEBS = (location?: Location) => {
        setEbsActive(true);
        if (location) setSosLocation(location);

        setTimeout(() => {
            setEbsActive(false);
            setSosLocation(undefined);
        }, 5000); // Auto dismiss after 5 seconds
    };

    const triggerEvac = () => {
        setEvacActive(true);
        setTimeout(() => setEvacActive(false), 10000); // Active for 10 seconds
    };

    const toggleBroadcast = () => setIsBroadcasting((prev) => !prev);

    const toggleGhostMode = () => {
        setGhostMode((prev) => {
            const next = !prev;
            if (next) setGhostStartTime(Date.now());
            else setGhostStartTime(undefined);
            return next;
        });
    };

    const toggleConvoy = () => {
        setIsConvoyActive((prev) => {
            const nextState = !prev;
            if (!nextState) {
                setCrewMembers([]); // Clear when deactivating
            } else {
                // Initialize with some mock data when activated
                setCrewMembers([
                    {
                        userId: 'm1',
                        username: 'NightRider',
                        location: { latitude: -23.5505, longitude: -46.6333 },
                        lastUpdated: Date.now(),
                    },
                    {
                        userId: 'm2',
                        username: 'DriftKing',
                        location: { latitude: -23.551, longitude: -46.634 },
                        lastUpdated: Date.now(),
                    },
                ]);
            }
            return nextState;
        });
    };

    const updateLocation = (userId: string, username: string, location: Location) => {
        if (!isConvoyActive) return;

        setCrewMembers((prev) => {
            const now = Date.now();
            const existingMemberIndex = prev.findIndex((m) => m.userId === userId);

            if (existingMemberIndex >= 0) {
                const updated = [...prev];
                updated[existingMemberIndex] = { userId, username, location, lastUpdated: now };
                return updated;
            } else {
                return [...prev, { userId, username, location, lastUpdated: now }];
            }
        });
    };

    return (
        <ConvoyContext.Provider
            value={{
                crewMembers,
                isConvoyActive,
                isBroadcasting,
                ebsActive,
                sosLocation,
                ghostMode,
                ghostCoordinates,
                ghostStartTime,
                convoyHeatScore,
                evacActive,
                rallyPoint,
                toggleConvoy,
                toggleBroadcast,
                deployRallyFlare,
                toggleGhostMode,
                updateLocation,
                triggerEBS,
                triggerEvac,
                chatMessages,
                addChatMessage,
            }}
        >
            {children}
        </ConvoyContext.Provider>
    );
};

export const useConvoy = () => {
    const context = useContext(ConvoyContext);
    if (!context) {
        throw new Error('useConvoy must be used within a ConvoyProvider');
    }
    return context;
};
