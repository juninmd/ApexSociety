import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event } from '../types';
import { MOCK_EVENTS } from '../data/mock';

interface EventContextType {
    events: Event[];
    addEvent: (event: Event) => void;
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

    useEffect(() => {
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

    return <EventContext.Provider value={{ events, addEvent }}>{children}</EventContext.Provider>;
};
