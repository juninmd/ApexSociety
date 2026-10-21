import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 40,
        justifyContent: 'center',
        gap: 10,
    },
    title: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 24,
        color: theme.colors.primary,
        letterSpacing: 2,
    },
    repText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        color: theme.colors.white,
        textAlign: 'center',
        marginBottom: 20,
    },
    listContainer: {
        gap: 15,
    },
    jammerBanner: {
        backgroundColor: 'rgba(211, 47, 47, 0.2)',
        borderWidth: 1,
        borderColor: theme.colors.error,
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
    },
    jammerBannerText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
    },
});
