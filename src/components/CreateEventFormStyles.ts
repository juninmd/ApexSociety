import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    form: { padding: 20 },
    weatherWarning: {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: theme.colors.error,
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 4,
    },
    weatherWarningText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        textAlign: 'center',
    },
    createButton: {
        marginTop: 30,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    buttonBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.colors.primary },
    buttonText: {
        fontFamily: theme.fonts.primary.bold,
        color: '#000',
        fontSize: 18,
        letterSpacing: 2,
        position: 'relative',
        zIndex: 1,
    },
    cancelButton: {
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 40,
    },
    cancelText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.textSecondary,
        fontSize: 14,
        letterSpacing: 1,
    },
});
