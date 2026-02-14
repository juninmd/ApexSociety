import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import App from '../App';

// Mock the navigator to isolate App component
jest.mock('../src/navigation/AppNavigator', () => {
    const { View } = require('react-native');
    const MockAppNavigator = () => <View testID="app-navigator" />;
    MockAppNavigator.displayName = 'MockAppNavigator';
    return MockAppNavigator;
});

describe('<App />', () => {
    it('renders correctly', async () => {
        const { getByTestId } = render(<App />);
        await waitFor(() => {
            expect(getByTestId('app-navigator')).toBeDefined();
        });
    });
});
