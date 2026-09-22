import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CrewListScreen from '../src/screens/CrewListScreen';
import { MOCK_CREWS } from '../src/data/mock';
import { ReputationProvider } from '../src/context/ReputationContext';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

describe('<CrewListScreen />', () => {
    const renderScreen = () => {
        return render(
            <ReputationProvider>
                <CrewListScreen />
            </ReputationProvider>
        );
    };

    it('renders correctly', () => {
        const { getByText } = renderScreen();

        // Header
        expect(getByText('EQUIPES')).toBeTruthy();

        // Check for mock data
        expect(getByText(MOCK_CREWS[0].name)).toBeTruthy();
        expect(getByText(MOCK_CREWS[1].name)).toBeTruthy();

        // Check for Create Crew button
        expect(getByText('CRIAR EQUIPE')).toBeTruthy();
    });

    it('navigates to CreateCrew on button press', () => {
        const { getByText } = renderScreen();

        const button = getByText('CRIAR EQUIPE');
        fireEvent.press(button);

        expect(mockNavigate).toHaveBeenCalledWith('CreateCrew');
    });

    it('navigates to CrewDetails on item press', () => {
        const { getByText } = renderScreen();

        const crewItem = getByText(MOCK_CREWS[0].name);
        fireEvent.press(crewItem);

        expect(mockNavigate).toHaveBeenCalledWith('CrewDetails', { crewId: MOCK_CREWS[0].id });
    });
});
