import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

interface UIContextType {
    // Alert State
    alertMessage: string | null;
    showAlert: (message: string) => void;
    hideAlert: () => void;

    // Notification State
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    removeNotification: (id: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    // --- Alert Logic ---
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    const showAlert = (message: string) => {
        setAlertMessage(message);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Automatically hide after 4 seconds
        const id = setTimeout(() => {
            setAlertMessage(null);
        }, 4000);
        setTimeoutId(id);
    };

    const hideAlert = () => {
        setAlertMessage(null);
    };

    // --- Notification Logic ---
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
        <UIContext.Provider
            value={{
                alertMessage,
                showAlert,
                hideAlert,
                notifications,
                addNotification,
                removeNotification,
            }}
        >
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
