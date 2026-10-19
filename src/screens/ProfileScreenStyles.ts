import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    contentSection: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    bio: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        color: theme.colors.text,
        lineHeight: 20,
        marginBottom: 10,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationText: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        color: theme.colors.secondary,
        marginLeft: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    editButton: {
        flex: 1,
        marginRight: 10,
    },
    shareButton: {
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    decayWarningContainer: {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: theme.colors.error,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    decayWarningText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
    },
});
