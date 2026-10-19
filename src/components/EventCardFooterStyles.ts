import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: 10,
    },
    attendeesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attendees: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 6,
    },
    boostButton: {
        marginLeft: 15,
        backgroundColor: 'rgba(255, 69, 0, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 69, 0, 0.3)',
    },
    boostText: {
        color: '#FF4500',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
    },
});
