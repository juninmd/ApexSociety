import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderColor: theme.colors.primary,
        padding: 20,
        height: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
    },
    subtitle: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        marginBottom: 20,
    },
    categoriesScroll: {
        maxHeight: 40,
        marginBottom: 20,
    },
    categoryButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginRight: 10,
        borderRadius: 20,
    },
    categoryButtonActive: {
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
    },
    categoryText: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
    },
    categoryTextActive: {
        color: theme.colors.primary,
    },
});
