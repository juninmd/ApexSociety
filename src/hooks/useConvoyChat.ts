import { useState } from 'react';

export interface ChatMessage {
    id: string;
    sender: string;
    message: string;
    timestamp: number;
}

export function useConvoyChat() {
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

    const addChatMessage = (sender: string, message: string) => {
        setChatMessages((prev) =>
            [
                ...prev,
                {
                    id: Math.random().toString(36).substring(7),
                    sender,
                    message,
                    timestamp: Date.now(),
                },
            ].slice(-50),
        );
    };

    return { chatMessages, addChatMessage };
}
