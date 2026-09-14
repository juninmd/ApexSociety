import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#0d0d1a',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    title: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 20,
        marginBottom: 20,
        letterSpacing: 2,
    },
    scanContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    scanIndicator: {
        marginBottom: 20,
    },
    scanningText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        letterSpacing: 1,
    },
    resultsContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    threatText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        marginTop: 15,
        marginBottom: 10,
        letterSpacing: 1,
    },
    detailsText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        marginBottom: 10,
    },
    adviceText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
        borderRadius: 4,
    },
    closeButtonText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
    },
});
