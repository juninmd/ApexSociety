import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNotification, Notification } from '../context/NotificationContext';
import { theme } from '../theme';
import { Bell, Info, AlertTriangle, CheckCircle, XCircle, Trash2 } from 'lucide-react-native';

export default function NotificationCenterScreen() {
    // Note: In a real app we'd fetch this from a persistent store/API.
    // For this prototype, we'll keep a local history or rely on the context array.
    // However, since NotificationContext auto-removes items after 5 seconds,
    // we should ideally maintain a separate history list in the context.
    // To adhere to KISS without large context rewrites, we will use a local mock history list
    // combining the current notifications and some historical data.
    const { notifications } = useNotification();
    const [history, setHistory] = useState<Notification[]>([
        { id: 'h1', title: 'Boas vindas', message: 'Bem-vindo ao ApexSociety!', type: 'success' },
        { id: 'h2', title: 'Radar Evitado', message: 'Você evitou 1 radar ontem.', type: 'info' },
    ]);

    // Merge active notifications (not yet cleared) with our dummy history for demonstration
    const allNotifications = [...notifications, ...history].filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
    );

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return <CheckCircle color="#4CAF50" size={24} />;
            case 'warning':
                return <AlertTriangle color={theme.colors.warning} size={24} />;
            case 'error':
                return <XCircle color={theme.colors.error} size={24} />;
            case 'info':
            default:
                return <Info color={theme.colors.primary} size={24} />;
        }
    };

    const renderItem = ({ item }: { item: Notification }) => (
        <View style={styles.notificationCard}>
            <View style={styles.iconContainer}>{getIcon(item.type)}</View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CENTRAL DE NOTIFICAÇÕES</Text>
                <TouchableOpacity onPress={() => setHistory([])}>
                    <Trash2 color={theme.colors.textSecondary} size={20} />
                </TouchableOpacity>
            </View>

            {allNotifications.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Bell color={theme.colors.textSecondary} size={48} />
                    <Text style={styles.emptyText}>Nenhuma notificação no momento.</Text>
                </View>
            ) : (
                <FlatList
                    data={allNotifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    headerTitle: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.card,
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
    },
    message: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        marginTop: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 16,
        marginTop: 10,
    },
});
