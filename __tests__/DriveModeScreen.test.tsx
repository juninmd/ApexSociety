import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DriveModeScreen from '../src/screens/DriveModeScreen';
import { useAlert } from '../src/context/AlertContext';

// Mock dependencies
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: jest.fn(),
        navigate: jest.fn(),
    }),
}));

jest.mock('../src/context/AlertContext', () => ({
    useAlert: jest.fn(),
}));

jest.mock('lucide-react-native', () => ({
    AlertTriangle: 'AlertTriangle',
    Map: 'Map',
    X: 'X',
}));

describe('DriveModeScreen', () => {
    it('renders the speedometer and action buttons', () => {
        (useAlert as jest.Mock).mockReturnValue({ showAlert: jest.fn() });

        const { getByText, getByTestId } = render(<DriveModeScreen />);

        expect(getByText('DRIVE MODE')).toBeTruthy();
        expect(getByText('KM/H')).toBeTruthy();
        expect(getByTestId('map-button')).toBeTruthy();
        expect(getByTestId('report-blitz-button')).toBeTruthy();
    });

    it('calls showAlert when "REPORT BLITZ" is pressed', () => {
        const mockShowAlert = jest.fn();
        (useAlert as jest.Mock).mockReturnValue({ showAlert: mockShowAlert });

        const { getByTestId } = render(<DriveModeScreen />);

        fireEvent.press(getByTestId('report-blitz-button'));

        expect(mockShowAlert).toHaveBeenCalledWith(
            'Blitz reportada! Alerta emitido para a rede ApexSociety.',
        );
    });
});
