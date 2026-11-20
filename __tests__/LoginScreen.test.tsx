import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';
import { AuthProvider } from '../src/context/AuthContext';

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({ navigate: jest.fn() }),
}));

const renderLogin = () =>
    render(
        <AuthProvider>
            <LoginScreen />
        </AuthProvider>,
    );

describe('<LoginScreen />', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('mostra o erro na tela quando o usuário está vazio', () => {
        const { getByText, getByRole } = renderLogin();
        fireEvent.press(getByText('ENTRAR'));
        expect(getByRole('alert')).toHaveTextContent('Por favor, insira o nome de usuário.');
    });

    it('mostra carregando e depois o erro de usuário inexistente na tela', async () => {
        const { getByText, getByPlaceholderText, findByRole } = renderLogin();
        fireEvent.changeText(getByPlaceholderText('Ex: DriftKingBR'), 'ghost');
        fireEvent.press(getByText('ENTRAR'));

        expect(getByText('ENTRANDO...')).toBeTruthy();
        await act(async () => {
            jest.advanceTimersByTime(500);
        });

        expect(await findByRole('alert')).toHaveTextContent(/User not found/);
        expect(getByText('ENTRAR')).toBeTruthy();
    });

    it('limpa o erro quando o usuário volta a digitar', () => {
        const { getByText, getByPlaceholderText, queryByRole } = renderLogin();
        fireEvent.press(getByText('ENTRAR'));
        fireEvent.changeText(getByPlaceholderText('Ex: DriftKingBR'), 'D');
        expect(queryByRole('alert')).toBeNull();
    });
});
