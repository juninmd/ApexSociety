import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNotification, Notification } from '../context/NotificationContext';
import { theme } from '../theme';

export default function NotificationToast() {
    const { notifications, removeNotification } = useNotification();

    if (notifications.length === 0) return null;

    return (
        <View style={styles.container}>
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}
        </View>
    );
}

function NotificationItem({
    notification,
    onClose,
}: {
    notification: Notification;
    onClose: () => void;
}) {
    const [fadeAnim] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const getBorderColor = () => {
        switch (notification.type) {
            case 'error':
                return theme.colors.error;
            case 'warning':
                return theme.colors.warning;
            case 'success':
                return '#4CAF50';
            case 'info':
            default:
                return theme.colors.primary;
        }
    };

    return (
        <Animated.View
            style={[styles.toast, { opacity: fadeAnim, borderLeftColor: getBorderColor() }]}
        >
            <View style={styles.content}>
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.message}>{notification.message}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        zIndex: 999,
        elevation: 10,
    },
    toast: {
        backgroundColor: theme.colors.card,
        borderLeftWidth: 4,
        borderRadius: 4,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    content: {
        flex: 1,
    },
    title: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4,
    },
    message: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    closeButton: {
        padding: 5,
    },
    closeText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.textSecondary,
        fontSize: 14,
    },
});
