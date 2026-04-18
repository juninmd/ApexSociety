import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreateCrewScreen from '../src/screens/CreateCrewScreen';
import { Alert } from 'react-native';

// Mock navigation
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
    }),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('<CreateCrewScreen />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getAllByText, getByText, getByPlaceholderText } = render(<CreateCrewScreen />);

        expect(getAllByText('CRIAR EQUIPE').length).toBe(2);
        expect(getByText('NOME DA EQUIPE')).toBeTruthy();
        expect(getByPlaceholderText('Ex: Corredores Noturnos')).toBeTruthy();
    });

    it('shows error if name or tag is empty', () => {
        const { getAllByText } = render(<CreateCrewScreen />);
        const createBtn = getAllByText('CRIAR EQUIPE')[1]; // Second one is the button

        fireEvent.press(createBtn);

        expect(Alert.alert).toHaveBeenCalledWith(
            'Erro',
            'Por favor, preencha o Nome e a Tag da Equipe',
        );
    });

    it('shows error if tag is more than 5 characters', () => {
        const { getByPlaceholderText, getAllByText } = render(<CreateCrewScreen />);

        const nameInput = getByPlaceholderText('Ex: Corredores Noturnos');
        const tagInput = getByPlaceholderText('Ex: CORR');
        const createBtn = getAllByText('CRIAR EQUIPE')[1];

        fireEvent.changeText(nameInput, 'My Crew');
        fireEvent.changeText(tagInput, 'TOOLONG');

        fireEvent.press(createBtn);

        expect(Alert.alert).toHaveBeenCalledWith('Erro', 'A Tag deve ter 5 caracteres ou menos');
    });

    it('creates crew successfully and goes back', () => {
        const { getByPlaceholderText, getAllByText } = render(<CreateCrewScreen />);

        const nameInput = getByPlaceholderText('Ex: Corredores Noturnos');
        const tagInput = getByPlaceholderText('Ex: CORR');
        const descInput = getByPlaceholderText('Sobre o que é a sua equipe?');
        const createBtn = getAllByText('CRIAR EQUIPE')[1];

        fireEvent.changeText(nameInput, 'My Crew');
        fireEvent.changeText(tagInput, 'COOL');
        fireEvent.changeText(descInput, 'A really cool crew');

        fireEvent.press(createBtn);

        expect(Alert.alert).toHaveBeenCalledWith(
            'Sucesso',
            'Equipe criada com sucesso!',
            expect.any(Array),
        );

        // Extract the OK button's onPress from the alert and call it to simulate user pressing OK
        const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
        const okButton = alertCall[2].find((btn: any) => btn.text === 'OK');
        okButton.onPress();

        expect(mockGoBack).toHaveBeenCalled();
    });

    it('calls goBack when cancel is pressed', () => {
        const { getByText } = render(<CreateCrewScreen />);
        const cancelBtn = getByText('CANCELAR');

        fireEvent.press(cancelBtn);

        expect(mockGoBack).toHaveBeenCalled();
    });
});
