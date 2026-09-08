import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontFamily: theme.fonts.primary.bold,
        color: theme.colors.error,
        fontSize: 18,
    },
    sectionHeader: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.textSecondary,
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    menuList: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    actionContainer: {
        paddingHorizontal: 20,
        marginVertical: 15,
    },
    challengeButton: {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        borderWidth: 1,
        borderColor: theme.colors.error,
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
        transform: [{ skewX: '-10deg' }],
    },
    challengeButtonText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
        letterSpacing: 1,
        transform: [{ skewX: '10deg' }],
    },
});
