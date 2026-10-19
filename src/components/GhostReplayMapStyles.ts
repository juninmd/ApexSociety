import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 15, 0, 0.9)', // AR Green tint
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 0, 0.3)',
        overflow: 'hidden',
        position: 'relative',
    },
    arHeader: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
    },
    arTitle: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 10,
        color: '#00FF00',
        letterSpacing: 2,
    },
    arSubtitle: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 8,
        color: 'rgba(0, 255, 0, 0.6)',
    },
    scanLine: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: 2,
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        shadowColor: '#00FF00',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        zIndex: 5,
    },
});
