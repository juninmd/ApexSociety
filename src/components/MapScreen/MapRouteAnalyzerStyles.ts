import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 130, // Below top controls
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        zIndex: 10,
    },
    title: {
        fontFamily: theme.fonts.primary.bold,
        color: theme.colors.primary,
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statBox: {
        alignItems: 'center',
    },
    statLabel: {
        fontFamily: theme.fonts.secondary.regular,
        color: theme.colors.textSecondary,
        fontSize: 10,
        marginBottom: 4,
    },
    statValue: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.text,
        fontSize: 16,
    },
    warning: {
        fontFamily: theme.fonts.secondary.regular,
        color: theme.colors.error,
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
    },
    evasionButton: {
        marginTop: 15,
        backgroundColor: 'rgba(211, 47, 47, 0.2)',
        borderWidth: 1,
        borderColor: theme.colors.error,
        paddingVertical: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    evasionText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
    },
});
