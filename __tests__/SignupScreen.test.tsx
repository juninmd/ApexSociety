import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import SignupScreen from '../src/screens/SignupScreen';

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('<SignupScreen />', () => {
    beforeEach(() => {
        jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    });
    afterEach(() => jest.restoreAllMocks());

    const fill = (utils: ReturnType<typeof render>, user: string, pass: string) => {
        fireEvent.changeText(utils.getByPlaceholderText('Escolha seu nome de rua'), user);
        fireEvent.changeText(utils.getByPlaceholderText('Sua senha secreta'), pass);
        fireEvent.press(utils.getByText('CRIAR CONTA'));
    };

    it('não confirma conta com campos vazios e mostra o erro na tela', () => {
        const utils = render(<SignupScreen />);
        fill(utils, '  ', '');
        expect(Alert.alert).not.toHaveBeenCalled();
        expect(utils.getByRole('alert')).toHaveTextContent(/pelo menos 3 caracteres/);
    });

    it('exige senha com pelo menos 6 caracteres', () => {
        const utils = render(<SignupScreen />);
        fill(utils, 'NightRider', '123');
        expect(Alert.alert).not.toHaveBeenCalled();
        expect(utils.getByRole('alert')).toHaveTextContent(/senha precisa ter pelo menos 6/);
    });

    it('confirma a conta com dados válidos', () => {
        const utils = render(<SignupScreen />);
        fill(utils, 'NightRider', 'segredo1');
        expect(Alert.alert).toHaveBeenCalledWith(
            'Sucesso',
            'Conta criada com sucesso! Você pode fazer login agora.',
            expect.any(Array),
        );
        expect(utils.queryByRole('alert')).toBeNull();
    });
});
