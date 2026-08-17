import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    carCard: {
        width: 200,
        height: 140,
        marginRight: 15,
        backgroundColor: theme.colors.card,
        position: 'relative',
        overflow: 'hidden',
    },
    carImage: {
        width: '100%',
        height: '100%',
    },
    carOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        paddingTop: 40,
    },
    carDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    carName: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        color: theme.colors.white,
    },
    specsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    carSpecsText: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        color: theme.colors.secondary,
    },
    tuneButton: {
        marginLeft: 6,
        padding: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 4,
    },
    statsContainer: {
        marginTop: 4,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
        overflow: 'hidden',
        width: '100%',
    },
    statsBar: {
        height: '100%',
        backgroundColor: theme.colors.primary,
    },
    respectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    respectCount: {
        color: theme.colors.white,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 4,
    },
});
