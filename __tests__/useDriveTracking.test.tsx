import { renderHook, act, waitFor } from '@testing-library/react-native';
import * as Location from 'expo-location';
import { useDriveTracking } from '../src/hooks/useDriveTracking';
import type { Hazard } from '../src/context/HazardContext';

jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(),
    watchPositionAsync: jest.fn(),
    Accuracy: { High: 5 },
}));
jest.mock('../src/context/AuthContext', () => ({ useAuth: () => ({ user: null }) }));
jest.mock('../src/context/TurfContext', () => ({ useTurf: () => ({ boostCrewHeat: jest.fn() }) }));
jest.mock('../src/context/ConvoyContext', () => ({
    useConvoy: () => ({ toggleGhostMode: jest.fn() }),
}));
jest.mock('../src/data/mock', () => ({ MOCK_EVENTS: [] }));

const hazard = {
    id: 'h1',
    type: 'blitz',
    location: { latitude: -23.55, longitude: -46.63 },
} as unknown as Hazard;

describe('useDriveTracking', () => {
    it('keeps a single GPS subscription and alerts once per hazard', async () => {
        let onPosition: (p: { coords: Record<string, number> }) => void = () => {};
        const remove = jest.fn();
        (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
            status: 'granted',
        });
        (Location.watchPositionAsync as jest.Mock).mockImplementation(async (_o, cb) => {
            onPosition = cb;
            return { remove };
        });
        const showAlert = jest.fn();

        renderHook(() => useDriveTracking({ hazards: [hazard], showAlert }));
        await waitFor(() => expect(Location.watchPositionAsync).toHaveBeenCalledTimes(1));

        const near = { coords: { latitude: -23.55, longitude: -46.63 } };
        act(() => onPosition(near));
        act(() => onPosition(near));

        expect(showAlert).toHaveBeenCalledTimes(1);
        // Raising the alert must not tear down and recreate the subscription.
        expect(Location.watchPositionAsync).toHaveBeenCalledTimes(1);
        expect(remove).not.toHaveBeenCalled();
    });
});
