import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

export interface Friend extends User {
    status: 'online' | 'offline' | 'driving';
}

interface FriendContextType {
    friends: Friend[];
    addFriend: (friend: Friend) => void;
    removeFriend: (id: string) => void;
}

const FriendContext = createContext<FriendContextType | undefined>(undefined);

export function useFriends() {
    const context = useContext(FriendContext);
    if (!context) {
        throw new Error('useFriends must be used within a FriendProvider');
    }
    return context;
}

interface FriendProviderProps {
    children: ReactNode;
    initialFriends?: Friend[];
}

export const FriendProvider: React.FC<FriendProviderProps> = ({
    children,
    initialFriends = [],
}) => {
    const [friends, setFriends] = useState<Friend[]>(initialFriends);

    const addFriend = (friend: Friend) => {
        setFriends((prev) => [...prev, friend]);
    };

    const removeFriend = (id: string) => {
        setFriends((prev) => prev.filter((f) => f.id !== id));
    };

    return (
        <FriendContext.Provider value={{ friends, addFriend, removeFriend }}>
            {children}
        </FriendContext.Provider>
    );
};
