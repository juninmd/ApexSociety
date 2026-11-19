import React from 'react';
import { render, act } from '@testing-library/react-native';
import { ConvoyProvider, useConvoy } from '../src/context/ConvoyContext';

describe('ConvoyContext', () => {
    it('renders correctly', () => {
        render(
            <ConvoyProvider>
                <></>
            </ConvoyProvider>,
        );
        expect(true).toBe(true);
    });
});

describe('ConvoyContext auto-dismiss timers', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    const setup = () => {
        let ctx!: ReturnType<typeof useConvoy>;
        const Probe = () => {
            ctx = useConvoy();
            return null;
        };
        const view = render(
            <ConvoyProvider>
                <Probe />
            </ConvoyProvider>,
        );
        return { get: () => ctx, view };
    };

    it('restarts the EBS window when it is triggered again', () => {
        const { get } = setup();
        act(() => get().triggerEBS());
        act(() => jest.advanceTimersByTime(4000));
        act(() => get().triggerEBS());
        // 1s after the second trigger the first timer would have fired: EBS must still be on.
        act(() => jest.advanceTimersByTime(1000));
        expect(get().ebsActive).toBe(true);
        act(() => jest.advanceTimersByTime(4000));
        expect(get().ebsActive).toBe(false);
    });
});
