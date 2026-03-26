import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AlertContextType {
    alertMessage: string | null;
    showAlert: (message: string) => void;
    hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

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

    return (
        <AlertContext.Provider value={{ alertMessage, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
}
