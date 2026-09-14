import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        padding: 20,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.primary,
        marginBottom: 20,
    },
    title: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
        color: theme.colors.primary,
        marginBottom: 15,
        letterSpacing: 1,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statBox: {
        flex: 1,
    },
    statLabel: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    statValue: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.white,
    },
    boostedValue: {
        color: '#4CAF50',
    },
    partsContainer: {
        gap: 10,
    },
    partButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    partButtonActive: {
        backgroundColor: theme.colors.primary,
    },
    partText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.primary,
        marginLeft: 10,
    },
    partTextActive: {
        color: theme.colors.black,
    },
    normalWear: {
        color: theme.colors.white,
    },
    highWear: {
        color: theme.colors.error,
    },
    repairButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 4,
        marginBottom: 15,
    },
    repairButtonText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.black,
        marginLeft: 8,
    },
});
