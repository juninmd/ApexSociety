import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface DriveRun {
    id: string;
    date: number;
    maxSpeed: number;
    maxRpm: number;
    maxBoost: number;
}

interface DriveHistoryContextType {
    runs: DriveRun[];
    addRun: (run: Omit<DriveRun, 'id' | 'date'>) => void;
}

const DriveHistoryContext = createContext<DriveHistoryContextType | undefined>(undefined);

export function useDriveHistory() {
    const context = useContext(DriveHistoryContext);
    if (!context) {
        throw new Error('useDriveHistory must be used within a DriveHistoryProvider');
    }
    return context;
}

interface DriveHistoryProviderProps {
    children: ReactNode;
}

export const DriveHistoryProvider: React.FC<DriveHistoryProviderProps> = ({ children }) => {
    const [runs, setRuns] = useState<DriveRun[]>([]);

    const addRun = (run: Omit<DriveRun, 'id' | 'date'>) => {
        const newRun: DriveRun = {
            ...run,
            id: Math.random().toString(36).substring(2, 9),
            date: Date.now(),
        };
        setRuns((prev) => [newRun, ...prev]);
    };

    return (
        <DriveHistoryContext.Provider value={{ runs, addRun }}>
            {children}
        </DriveHistoryContext.Provider>
    );
};
