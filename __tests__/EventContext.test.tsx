import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { EventProvider, useEvents } from '../src/context/EventContext';
import { Event } from '../src/types';

describe('EventContext', () => {
    it('provides initial events', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <EventProvider>{children}</EventProvider>
        );
        const { result } = renderHook(() => useEvents(), { wrapper });

        expect(result.current.events.length).toBeGreaterThan(0);
    });

    it('adds a new event', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <EventProvider>{children}</EventProvider>
        );
        const { result } = renderHook(() => useEvents(), { wrapper });

        const newEvent: Event = {
            id: 'test-event',
            title: 'Test Event',
            hostId: 'test-host',
            location: { latitude: 0, longitude: 0, address: 'Test Location' },
            startTime: 'Now',
            endTime: 'Later',
            attendees: 0,
            isPrivate: false,
        };

        act(() => {
            result.current.addEvent(newEvent);
        });

        expect(result.current.events[0]).toEqual(newEvent);
        expect(result.current.events.length).toBeGreaterThan(1);
    });
});
