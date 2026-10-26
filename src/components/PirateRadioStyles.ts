import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 10,
        marginVertical: 10,
    },
    containerActive: {
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(255, 0, 85, 0.05)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginLeft: 6,
        letterSpacing: 1,
    },
    titleActive: {
        color: theme.colors.primary,
    },
    powerBtn: {
        padding: 4,
    },
    display: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333',
    },
    stationInfo: {
        flex: 1,
    },
    stationName: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
        color: '#fff',
    },
    genre: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        color: theme.colors.primary,
        marginTop: 2,
    },
    equalizer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 24,
        width: 40,
        justifyContent: 'space-between',
    },
    eqBar: {
        width: 4,
        backgroundColor: theme.colors.primary,
        borderRadius: 2,
    },
    offDisplay: {
        backgroundColor: '#000',
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
        height: 42,
    },
    offText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: '#333',
        letterSpacing: 2,
    },
});
