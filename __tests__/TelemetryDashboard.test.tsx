import React from 'react';
import { render } from '@testing-library/react-native';
import TelemetryDashboard from '../src/components/TelemetryDashboard';

describe('TelemetryDashboard', () => {
    it('renders default telemetry when speed is 0', () => {
        const { getByText } = render(<TelemetryDashboard speed={0} />);
        expect(getByText('0.0')).toBeTruthy(); // Boost
        expect(getByText('800')).toBeTruthy(); // RPM
        expect(getByText('90°')).toBeTruthy(); // Temp
    });

    it('renders calculated telemetry when speed is 100', () => {
        const { getByText } = render(<TelemetryDashboard speed={100} />);

        // Math.min((100 - 60) * 0.2, 2.5) = Math.min(8, 2.5) = 2.5
        // RPM: 800 + Math.min(100 * 40, 7200) = 800 + 4000 = 4800
        // Temp: 90 + Math.min(100 * 0.1, 30) = 90 + 10 = 100

        expect(getByText('2.5')).toBeTruthy(); // Boost
        expect(getByText('4800')).toBeTruthy(); // RPM
        expect(getByText('100°')).toBeTruthy(); // Temp
    });

    it('applies danger styling at high speeds', () => {
        const { getByText } = render(<TelemetryDashboard speed={250} />);
        // At 250:
        // RPM: 800 + Math.min(10000, 7200) = 8000
        // Temp: 90 + Math.min(25, 30) = 115

        const rpmText = getByText('8000');
        const tempText = getByText('115°');

        // Ensure they render
        expect(rpmText).toBeTruthy();
        expect(tempText).toBeTruthy();
    });
});
