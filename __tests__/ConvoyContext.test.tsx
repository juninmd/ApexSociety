import React from 'react';
import { render } from '@testing-library/react-native';
import { ConvoyProvider } from '../src/context/ConvoyContext';

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
