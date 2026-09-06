import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const idCounter = useRef(0);

    const removeNotification = React.useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const addNotification = React.useCallback(
        (notification: Omit<Notification, 'id'>) => {
            idCounter.current += 1;
            const id = `notif-${idCounter.current}`;
            const newNotification = { ...notification, id };
            setNotifications((prev) => [...prev, newNotification]);

            // Auto remove after 5 seconds
            setTimeout(() => {
                removeNotification(id);
            }, 5000);
        },
        [removeNotification],
    );

    // Simulate Background Push Notifications
    React.useEffect(() => {
        const fakeMessages = [
            {
                title: 'Novo Encontro',
                message: 'Encontro noturno marcado perto de você!',
                type: 'info' as const,
            },
            {
                title: 'Alerta de Radar',
                message: 'Radar reportado na sua rota.',
                type: 'warning' as const,
            },
            {
                title: 'Convite de Equipe',
                message: 'NightRiders convidou você para a equipe.',
                type: 'success' as const,
            },
            {
                title: 'Risco Elevado',
                message: 'Blitz reportada há poucos minutos na zona leste.',
                type: 'error' as const,
            },
        ];

        const interval = setInterval(() => {
            const randomMsg = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
            addNotification(randomMsg);
        }, 60000); // 1 minute

        return () => clearInterval(interval);
    }, [addNotification]);

    return (
        <NotificationContext.Provider
            value={{ notifications, addNotification, removeNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}
