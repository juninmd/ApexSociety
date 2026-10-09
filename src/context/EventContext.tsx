import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event } from '../types';
import { MOCK_EVENTS } from '../data/mock';

interface EventContextType {
    events: Event[];
    addEvent: (event: Event) => void;
    incrementHype: (eventId: string) => void;
    updateEventStatus: (eventId: string, status: 'active' | 'scatter') => void;
    getEventHeatmaps: () => {
        id: string;
        center: { latitude: number; longitude: number };
        radius: number;
        color: string;
    }[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};

interface EventProviderProps {
    children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

    const addEvent = (event: Event) => {
        setEvents((prevEvents) => [event, ...prevEvents]);
    };

    const incrementHype = (eventId: string) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) => {
                if (event.id === eventId) {
                    const currentHype = event.hypeScore || 0;
                    const isBadWeather = event.weather === 'rain' || event.weather === 'fog';
                    const multiplier = isBadWeather ? 2 : 1; // Double hype gain during bad weather
                    return { ...event, hypeScore: currentHype + (10 * multiplier) };
                }
                return event;
            }),
        );
    };

    const updateEventStatus = (eventId: string, status: 'active' | 'scatter') => {
        setEvents((prevEvents) =>
            prevEvents.map((event) => {
                if (event.id === eventId) {
                    return { ...event, status };
                }
                return event;
            }),
        );
    };

    const getEventHeatmaps = () => {
        return events
            .filter((event) => (event.hypeScore || 0) > 50 && event.location.latitude !== 0)
            .map((event) => ({
                id: `heat-${event.id}`,
                center: {
                    latitude: event.location.latitude,
                    longitude: event.location.longitude,
                },
                radius: Math.min(2000, 500 + (event.hypeScore || 0) * 10),
                color: 'rgba(255, 165, 0, 0.4)', // Orange for high hype events
            }));
    };

    useEffect(() => {
        if (process.env.NODE_ENV === 'test') {
            return;
        }

        const interval = setInterval(() => {
            setEvents((prevEvents) => {
                return prevEvents.map((event) => {
                    // Randomly increase or decrease attendees by 1 to simulate activity
                    if (Math.random() > 0.7) {
                        const change = Math.random() > 0.5 ? 1 : -1;
                        const newAttendees = Math.max(0, event.attendees + change);
                        return { ...event, attendees: newAttendees };
                    }
                    return event;
                });
            });
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <EventContext.Provider
            value={{ events, addEvent, incrementHype, updateEventStatus, getEventHeatmaps }}
        >
            {children}
        </EventContext.Provider>
    );
};
