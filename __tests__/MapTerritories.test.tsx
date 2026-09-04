import React from 'react';
import { render, act } from '@testing-library/react-native';
import MapTerritories from '../src/components/MapScreen/MapTerritories';

// Mock react-native-maps Circle
jest.mock('react-native-maps', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
        Circle: (props: any) => <View testID={props.testID} {...props} />,
    };
});

describe('MapTerritories', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders territories correctly', () => {
        const { getByTestId } = render(<MapTerritories />);
        expect(getByTestId('territory-circle-t1')).toBeTruthy();
        expect(getByTestId('territory-circle-t2')).toBeTruthy();
    });

    it('pulses territories with intruders', () => {
        const { getByTestId } = render(<MapTerritories />);

        // Fast forward 1 second for the pulse effect
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        const territory1 = getByTestId('territory-circle-t1');

        // Check if props reflect intrusion (pulsing logic)
        // Note: mock data might or might not have intruders depending on radius and location.
        // Mock User 2 is at -23.5615, -46.6563 and belongs to crew-2.
        // Territory 1 is crew-1 at -23.5505, -46.6333, radius 3000m.
        // Distance is ~2.6km, which is < 3km. So User 2 is an intruder in Territory 1.
        expect(territory1.props.strokeColor).toBe('#D32F2F'); // theme.colors.error
    });
});
