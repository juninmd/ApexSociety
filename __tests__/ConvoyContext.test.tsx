import React from 'react';
import { render, act } from '@testing-library/react-native';
import { ConvoyProvider, useConvoy } from '../src/context/ConvoyContext';
import { Text, TouchableOpacity } from 'react-native';

const TestComponent = () => {
    const { isConvoyActive, toggleConvoy, updateLocation, crewMembers } = useConvoy();

    return (
        <>
            <Text testID="convoy-status">{isConvoyActive ? 'Active' : 'Inactive'}</Text>
            <TouchableOpacity testID="toggle-btn" onPress={toggleConvoy} />
            <TouchableOpacity
                testID="update-loc-btn"
                onPress={() => updateLocation('u1', 'TestUser', { latitude: 1, longitude: 2 })}
            />
            <Text testID="members-count">{crewMembers.length.toString()}</Text>
        </>
    );
};

describe('ConvoyContext', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should throw error if used outside provider', () => {
        // Suppress console.error for expected error
        const originalError = console.error;
        console.error = jest.fn();

        expect(() => render(<TestComponent />)).toThrow(
            'useConvoy must be used within a ConvoyProvider',
        );

        console.error = originalError;
    });

    it('should toggle convoy active status', () => {
        const { getByTestId } = render(
            <ConvoyProvider>
                <TestComponent />
            </ConvoyProvider>,
        );

        expect(getByTestId('convoy-status').props.children).toBe('Inactive');

        act(() => {
            getByTestId('toggle-btn').props.onClick(); // using props.onClick() directly for brevity
        });
        expect(getByTestId('convoy-status').props.children).toBe('Active');
    });

    it('should add and remove members', () => {
        const { getByTestId } = render(
            <ConvoyProvider>
                <TestComponent />
            </ConvoyProvider>,
        );

        // Turn on convoy
        act(() => {
            getByTestId('toggle-btn').props.onClick();
        });

        // Add member
        act(() => {
            getByTestId('update-loc-btn').props.onClick();
        });

        // Count should be 3 now (2 mock initialized + 1 manually added)
        expect(getByTestId('members-count').props.children).toBe('3');

        // Turn off convoy should clear members
        act(() => {
            getByTestId('toggle-btn').props.onClick();
        });

        expect(getByTestId('members-count').props.children).toBe('0');
    });
});
