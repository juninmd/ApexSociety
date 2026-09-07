import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { TurfProvider, useTurf, Territory } from '../src/context/TurfContext';

describe('TurfContext', () => {
    it('initializes with mock territories', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <TurfProvider>{children}</TurfProvider>
        );

        const { result } = renderHook(() => useTurf(), { wrapper });

        expect(result.current.territories.length).toBeGreaterThan(0);
        expect(result.current.territories[0].dominance).toBeDefined();
    });

    it('claimTurf updates territory dominance', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <TurfProvider>{children}</TurfProvider>
        );

        const { result } = renderHook(() => useTurf(), { wrapper });

        const firstTerritoryId = result.current.territories[0].id;
        const initialDominance = result.current.territories[0].dominance;

        act(() => {
            result.current.claimTurf(firstTerritoryId, 5);
        });

        const updatedTerritory = result.current.territories.find(
            (t: Territory) => t.id === firstTerritoryId,
        );

        expect(updatedTerritory?.dominance).toBe(Math.min(100, initialDominance + 5));
    });

    it('throws error when useTurf is used outside provider', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
            renderHook(() => useTurf());
        }).toThrow('useTurf must be used within a TurfProvider');

        consoleError.mockRestore();
    });
});
