import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        width: '100%',
        zIndex: 10,
    },
    ghostButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    ghostButtonActive: {
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(255, 0, 85, 0.1)',
    },
    ghostText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 8,
    },
    ghostTextActive: {
        color: theme.colors.primary,
    },
    evacButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.error,
        marginLeft: 10,
    },
    evacButtonActive: {
        backgroundColor: theme.colors.error,
    },
    evacText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 8,
    },
    evacTextActive: {
        color: '#FFFFFF',
    },
    decoyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.warning,
        marginRight: 10,
    },
    decoyText: {
        color: theme.colors.warning,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 8,
    },
});
