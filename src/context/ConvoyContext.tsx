import React, { createContext, useContext, useState, useEffect } from 'react';
import { Location } from '../types';

export interface CrewMemberLocation {
    userId: string;
    username: string;
    location: Location;
    lastUpdated: number;
}

interface ConvoyContextType {
    crewMembers: CrewMemberLocation[];
    isConvoyActive: boolean;
    toggleConvoy: () => void;
    updateLocation: (userId: string, username: string, location: Location) => void;
}

const ConvoyContext = createContext<ConvoyContextType | undefined>(undefined);

export const ConvoyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [crewMembers, setCrewMembers] = useState<CrewMemberLocation[]>([]);
    const [isConvoyActive, setIsConvoyActive] = useState(false);

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

    return (
        <ConvoyContext.Provider
            value={{ crewMembers, isConvoyActive, toggleConvoy, updateLocation }}
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
