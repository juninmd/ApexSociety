import React from 'react';
import { render } from '@testing-library/react-native';
import TelemetryDashboard from '../src/components/TelemetryDashboard';
import { ConvoyProvider } from '../src/context/ConvoyContext';

describe('TelemetryDashboard', () => {
    it('renders default metrics correctly', () => {
        const { getByText } = render(
            <ConvoyProvider>
                <TelemetryDashboard speed={50} />
            </ConvoyProvider>,
        );
        expect(getByText('BOOST (BAR)')).toBeTruthy();
        expect(getByText('RPM')).toBeTruthy();
        expect(getByText('TEMP (C)')).toBeTruthy();
    });

    it('applies danger styling at high speeds', () => {
        const { getByText } = render(
            <ConvoyProvider>
                <TelemetryDashboard speed={200} />
            </ConvoyProvider>,
        );
        expect(getByText('2.5')).toBeTruthy(); // Boost maxes at 2.5
        expect(getByText('110°')).toBeTruthy(); // Temp maxes at 120, danger styling over 110
    });

    it('renders ROAD SLIPPERY warning when isRaining is true', () => {
        const { getByText } = render(
            <ConvoyProvider>
                <TelemetryDashboard speed={60} isRaining={true} />
            </ConvoyProvider>,
        );
        expect(getByText('ROAD SLIPPERY / GRIP REDUCED')).toBeTruthy();
    });
});
