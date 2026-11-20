import { Alert, Platform } from 'react-native';
import { showAlert } from '../src/utils/alert';

describe('showAlert', () => {
    const originalOS = Platform.OS;
    afterEach(() => {
        Platform.OS = originalOS;
        jest.restoreAllMocks();
    });

    it('no app nativo delega ao Alert.alert', () => {
        const spy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
        showAlert('Erro', 'msg');
        expect(spy).toHaveBeenCalledWith('Erro', 'msg');
    });

    describe('na web (Alert.alert é no-op no react-native-web)', () => {
        // O ambiente jest-expo e react-native: window nao tem alert/confirm.
        const win = window as unknown as { alert: jest.Mock; confirm: jest.Mock };
        beforeEach(() => {
            Platform.OS = 'web';
            win.alert = jest.fn();
            win.confirm = jest.fn();
        });

        it('mostra o aviso e executa o botão OK', () => {
            const alertSpy = win.alert;
            const onPress = jest.fn();
            showAlert('Sucesso', 'Equipe criada!', [{ text: 'OK', onPress }]);
            expect(alertSpy).toHaveBeenCalledWith('Sucesso\n\nEquipe criada!');
            expect(onPress).toHaveBeenCalled();
        });

        it('com botão cancel usa confirm e executa a ação escolhida', () => {
            const confirmSpy = win.confirm;
            const onFlag = jest.fn();
            const onCancel = jest.fn();
            const buttons = [
                { text: 'Cancel', style: 'cancel' as const, onPress: onCancel },
                { text: 'Flag', onPress: onFlag },
            ];

            confirmSpy.mockReturnValueOnce(true);
            showAlert('Flag?', undefined, buttons);
            expect(onFlag).toHaveBeenCalledTimes(1);

            confirmSpy.mockReturnValueOnce(false);
            showAlert('Flag?', undefined, buttons);
            expect(onCancel).toHaveBeenCalledTimes(1);
            expect(onFlag).toHaveBeenCalledTimes(1);
        });
    });
});
