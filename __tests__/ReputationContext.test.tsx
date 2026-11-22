import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { ReputationProvider, useReputation } from '../src/context/ReputationContext';

const MINUTE = 60 * 1000;
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ReputationProvider>{children}</ReputationProvider>
);

describe('ReputationContext decay', () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
        jest.useFakeTimers();
        // The decay loop is disabled under NODE_ENV=test; these tests exercise it.
        (process.env as Record<string, string>).NODE_ENV = 'development';
    });

    afterEach(() => {
        (process.env as Record<string, string | undefined>).NODE_ENV = originalEnv;
        jest.useRealTimers();
    });

    it('decays after 5 minutes without activity', () => {
        const { result } = renderHook(() => useReputation(), { wrapper });
        act(() => {
            jest.advanceTimersByTime(6 * MINUTE);
        });
        expect(result.current.isDecaying).toBe(true);
        expect(result.current.reputation).toBe(419);
    });

    // Before, lastActive was frozen at mount, so active players decayed too.
    it('does not decay right after the player earns reputation', () => {
        const { result } = renderHook(() => useReputation(), { wrapper });
        act(() => {
            jest.advanceTimersByTime(5.5 * MINUTE);
        });
        act(() => {
            result.current.addReputation(50);
        });
        const afterEarning = result.current.reputation;

        act(() => {
            jest.advanceTimersByTime(2 * MINUTE);
        });

        expect(result.current.isDecaying).toBe(false);
        expect(result.current.reputation).toBe(afterEarning);
    });
});
