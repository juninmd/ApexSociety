import React from 'react';
import { render } from '@testing-library/react-native';
import MapRouteAnalyzer from '../src/components/MapScreen/MapRouteAnalyzer';
import * as HazardContext from '../src/context/HazardContext';
import * as WeatherHook from '../src/hooks/useWeather';

describe('MapRouteAnalyzer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns null if not visible', () => {
        jest.spyOn(HazardContext, 'useHazards').mockReturnValue({
            hazards: [],
            heatLevel: 0,
            addHazard: jest.fn(),
            verifyHazard: jest.fn(),
            getHeatMapDensity: jest.fn().mockReturnValue(1),
        });
        jest.spyOn(WeatherHook, 'useWeather').mockReturnValue({
            isRaining: false,
            condition: 'clear',
            isFoggy: false,
        });

        const { toJSON } = render(<MapRouteAnalyzer visible={false} />);
        expect(toJSON()).toBeNull();
    });

    it('calculates low risk for clear weather and no hazards', () => {
        jest.spyOn(HazardContext, 'useHazards').mockReturnValue({
            hazards: [],
            heatLevel: 0,
            addHazard: jest.fn(),
            verifyHazard: jest.fn(),
            getHeatMapDensity: jest.fn().mockReturnValue(1),
        });
        jest.spyOn(WeatherHook, 'useWeather').mockReturnValue({
            isRaining: false,
            condition: 'clear',
            isFoggy: false,
        });

        const { getByText } = render(<MapRouteAnalyzer visible={true} />);

        expect(getByText('AI ROUTE ANALYZER')).toBeTruthy();
        expect(getByText('1.0x')).toBeTruthy();
        expect(getByText('LOW RISK')).toBeTruthy();
    });

    it('calculates high risk for heat level 2', () => {
        jest.spyOn(HazardContext, 'useHazards').mockReturnValue({
            hazards: [],
            heatLevel: 2,
            addHazard: jest.fn(),
            verifyHazard: jest.fn(),
            getHeatMapDensity: jest.fn().mockReturnValue(1),
        });
        jest.spyOn(WeatherHook, 'useWeather').mockReturnValue({
            isRaining: false,
            condition: 'clear',
            isFoggy: false,
        });

        const { getByText } = render(<MapRouteAnalyzer visible={true} />);

        // base 1.0 + (0.5 * 2) = 2.0x -> HIGH RISK
        expect(getByText('2.0x')).toBeTruthy();
        expect(getByText('HIGH RISK')).toBeTruthy();
    });

    it('calculates extreme risk for rain and heat level 2', () => {
        jest.spyOn(HazardContext, 'useHazards').mockReturnValue({
            hazards: [],
            heatLevel: 2,
            addHazard: jest.fn(),
            verifyHazard: jest.fn(),
            getHeatMapDensity: jest.fn().mockReturnValue(1),
        });
        jest.spyOn(WeatherHook, 'useWeather').mockReturnValue({
            isRaining: true,
            condition: 'rain',
            isFoggy: false,
        });

        const { getByText } = render(<MapRouteAnalyzer visible={true} />);

        // base 1.0 + (0.5 * 2) + 1.0 = 3.0x -> EXTREME RISK
        expect(getByText('3.0x')).toBeTruthy();
        expect(getByText('EXTREME RISK')).toBeTruthy();
        expect(
            getByText('Warning: Active hazards or poor weather detected on route.'),
        ).toBeTruthy();
    });
});
