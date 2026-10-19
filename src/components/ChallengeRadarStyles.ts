import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: 'center',
    },
    radarButton: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderWidth: 2,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    radarButtonActive: {
        borderColor: theme.colors.secondary,
    },
    radarSweep: {
        position: 'absolute',
        top: 0,
        left: '50%',
        width: 100,
        height: 100,
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        borderBottomRightRadius: 100,
        transformOrigin: 'bottom left',
    },
    radarText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        zIndex: 10,
    },
    targetContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.error,
    },
    targetIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.error,
        marginBottom: 10,
    },
    targetText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 18,
        marginBottom: 15,
    },
    challengeButton: {
        backgroundColor: theme.colors.error,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    challengeButtonText: {
        color: '#FFF',
        fontFamily: theme.fonts.primary.bold,
    },
});
