import React, { createContext, useContext, useState, ReactNode } from 'react';
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

    return <EventContext.Provider value={{ events, addEvent }}>{children}</EventContext.Provider>;
};
