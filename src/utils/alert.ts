import { Alert, Platform } from 'react-native';

// react-native-web implementa Alert.alert como no-op: no site, todo aviso sumia.
// No navegador cai para window.alert/confirm; no app nativo segue o Alert padrao.
export function showAlert(...args: Parameters<typeof Alert.alert>): void {
    if (Platform.OS !== 'web') {
        Alert.alert(...args);
        return;
    }

    const [title, message, buttons] = args;
    const text = message ? `${title}\n\n${message}` : title;
    const cancel = buttons?.find((b) => b.style === 'cancel');
    const action = buttons?.find((b) => b !== cancel);

    if (!cancel) {
        window.alert(text);
        action?.onPress?.();
        return;
    }

    if (window.confirm(text)) action?.onPress?.();
    else cancel.onPress?.();
}
