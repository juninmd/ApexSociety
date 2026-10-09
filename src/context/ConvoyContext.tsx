import React, { createContext, useContext, useState, useEffect } from 'react';
import { Location } from '../types';
import { useGhostTrail } from '../hooks/useGhostTrail';

export interface ChatMessage {
    id: string;
    sender: string;
    message: string;
    timestamp: number;
}

export interface CrewMemberLocation {
    userId: string;
    username: string;
    location: Location;
    lastUpdated: number;
}

interface ConvoyContextType {
    crewMembers: CrewMemberLocation[];
    isConvoyActive: boolean;
    isBroadcasting: boolean;
    ebsActive: boolean;
    sosLocation?: Location;
    ghostMode: boolean;
    ghostCoordinates: Location[];
    ghostStartTime?: number;
    convoyHeatScore: number;
    toggleConvoy: () => void;
    toggleBroadcast: () => void;
    toggleGhostMode: () => void;
    updateLocation: (userId: string, username: string, location: Location) => void;
    triggerEBS: (location?: Location) => void;
    chatMessages: ChatMessage[];
    addChatMessage: (sender: string, message: string) => void;
}

const ConvoyContext = createContext<ConvoyContextType | undefined>(undefined);

export const ConvoyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [crewMembers, setCrewMembers] = useState<CrewMemberLocation[]>([]);
    const [isConvoyActive, setIsConvoyActive] = useState(false);
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [ebsActive, setEbsActive] = useState(false);
    const [sosLocation, setSosLocation] = useState<Location | undefined>(undefined);
    const [ghostMode, setGhostMode] = useState(false);
    const [ghostStartTime, setGhostStartTime] = useState<number | undefined>(undefined);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [convoyHeatScore, setConvoyHeatScore] = useState(0);
    const { ghostCoordinates } = useGhostTrail(ghostMode, process.env.NODE_ENV === 'test');

    const addChatMessage = (sender: string, message: string) => {
        setChatMessages((prev) =>
            [
                ...prev,
                {
                    id: Math.random().toString(36).substring(7),
                    sender,
                    message,
                    timestamp: Date.now(),
                },
            ].slice(-50),
        );
    };

    const triggerEBS = (location?: Location) => {
        setEbsActive(true);
        if (location) setSosLocation(location);

        setTimeout(() => {
            setEbsActive(false);
            setSosLocation(undefined);
        }, 5000); // Auto dismiss after 5 seconds
    };

    const toggleBroadcast = () => {
        setIsBroadcasting((prev) => !prev);
    };

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
                const initialMockMembers: CrewMemberLocation[] = [
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
                ];
                setCrewMembers(initialMockMembers);
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

    // Simulate movement
    useEffect(() => {
        if (!isConvoyActive) {
            setTimeout(() => setConvoyHeatScore(0), 0);
            return;
        }

        setTimeout(() => setConvoyHeatScore(crewMembers.length * 15), 0);

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
                toggleConvoy,
                toggleBroadcast,
                toggleGhostMode,
                updateLocation,
                triggerEBS,
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
