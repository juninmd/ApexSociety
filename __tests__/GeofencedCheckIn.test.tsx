import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import GeofencedCheckIn from '../src/components/GeofencedCheckIn';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

import { ReputationProvider } from '../src/context/ReputationContext';

// Mock expo-location
jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(),
    getCurrentPositionAsync: jest.fn(),
    Accuracy: { Balanced: 3 },
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

const renderWithProvider = (component: React.ReactElement) => {
    return render(<ReputationProvider>{component}</ReputationProvider>);
};

describe('GeofencedCheckIn', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders null if no coordinates are provided', () => {
        const { toJSON } = renderWithProvider(<GeofencedCheckIn eventId="e1" />);
        expect(toJSON()).toBeNull();
    });

    it('renders button if coordinates are provided', () => {
        const { getByText } = renderWithProvider(
            <GeofencedCheckIn eventId="e1" eventLatitude={-23.5} eventLongitude={-46.6} />,
        );
        expect(getByText('GEOFENCED CHECK-IN')).toBeTruthy();
    });

    it('handles successful check-in', async () => {
        (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
            status: 'granted',
        });
        (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
            coords: { latitude: -23.5, longitude: -46.6 },
        });

        const { getByText } = renderWithProvider(
            <GeofencedCheckIn eventId="e1" eventLatitude={-23.5} eventLongitude={-46.6} />,
        );

        fireEvent.press(getByText('GEOFENCED CHECK-IN'));

        await waitFor(() => {
            expect(getByText('CHECKED IN')).toBeTruthy();
            expect(Alert.alert).toHaveBeenCalledWith(
                'CHECK-IN SUCESSO',
                'Você ganhou 50 REP por comparecer!',
            );
        });
    });

    it('handles out of range check-in', async () => {
        (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
            status: 'granted',
        });
        // Far away coordinates
        (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
            coords: { latitude: 0, longitude: 0 },
        });

        const { getByText } = renderWithProvider(
            <GeofencedCheckIn eventId="e1" eventLatitude={-23.5} eventLongitude={-46.6} />,
        );

        fireEvent.press(getByText('GEOFENCED CHECK-IN'));

        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                'Fora de Alcance',
                expect.stringContaining('km do evento. O limite é'),
            );
        });
    });
});
