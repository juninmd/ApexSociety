import React from 'react';
import { render } from '@testing-library/react-native';
import CreateCrewScreen from '../src/screens/CreateCrewScreen';

// Mock navigation
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
    }),
}));

describe('<CreateCrewScreen />', () => {
    it('renders correctly', () => {
        const { getAllByText, getByText, getByPlaceholderText } = render(<CreateCrewScreen />);

        expect(getAllByText('CREATE CREW').length).toBe(2);
        expect(getByText('CREW NAME')).toBeTruthy();
        expect(getByPlaceholderText('Ex: Night Runners')).toBeTruthy();
    });
});
