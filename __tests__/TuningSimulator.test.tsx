import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TuningSimulator from '../src/components/TuningSimulator';
import { ReputationProvider } from '../src/context/ReputationContext';

describe('TuningSimulator', () => {
    const renderWithContext = (ui: React.ReactElement) => {
        return render(<ReputationProvider>{ui}</ReputationProvider>);
    };

    it('renders correctly with initial hp and engine', () => {
        const { getByText } = renderWithContext(<TuningSimulator initialHp="300 HP" engine="V8" />);

        expect(getByText('TUNING SIMULATOR')).toBeTruthy();
        expect(getByText('V8')).toBeTruthy();
        expect(getByText('300 HP')).toBeTruthy();
    });

    it('applies ECU tune upgrade', () => {
        const { getByText } = renderWithContext(<TuningSimulator initialHp="300 HP" engine="V8" />);

        const ecuButton = getByText('ECU TUNE (+50)');
        fireEvent.press(ecuButton);

        expect(getByText('350 HP')).toBeTruthy();
    });

    it('applies multiple upgrades', () => {
        const { getByText } = renderWithContext(<TuningSimulator initialHp="300 HP" engine="V8" />);

        fireEvent.press(getByText('ECU TUNE (+50)'));
        fireEvent.press(getByText('BIG TURBO (+120)'));

        expect(getByText('470 HP')).toBeTruthy();
    });
});
