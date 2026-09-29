import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { ConvoyProvider, useConvoy } from '../src/context/ConvoyContext';

describe('ConvoyContext', () => {
    it('provides default values', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <ConvoyProvider>{children}</ConvoyProvider>
        );

        const { result } = renderHook(() => useConvoy(), { wrapper });

        expect(result.current.isConvoyActive).toBe(false);
        expect(result.current.ghostMode).toBe(false);
    });

    it('toggles ghost mode', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <ConvoyProvider>{children}</ConvoyProvider>
        );

        const { result } = renderHook(() => useConvoy(), { wrapper });

        act(() => {
            result.current.toggleGhostMode();
        });

        expect(result.current.ghostMode).toBe(true);
    });

    it('throws error when used outside provider', () => {
        // Prevent console.error from polluting the test output for expected errors
        const consoleSpy = jest.spyOn(console, 'error');
        consoleSpy.mockImplementation(() => {});

        expect(() => {
            renderHook(() => useConvoy());
        }).toThrow('useConvoy must be used within a ConvoyProvider');

        consoleSpy.mockRestore();
    });
});
