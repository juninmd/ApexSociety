import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { NotificationProvider, useNotification } from '../src/context/NotificationContext';

describe('NotificationContext', () => {
    it('provides default values and allows adding/removing notifications', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <NotificationProvider>{children}</NotificationProvider>
        );

        const { result } = renderHook(() => useNotification(), { wrapper });

        expect(result.current.notifications).toEqual([]);

        act(() => {
            result.current.addNotification({
                title: 'Test',
                message: 'Test message',
                type: 'info',
            });
        });

        expect(result.current.notifications.length).toBe(1);
        expect(result.current.notifications[0].title).toBe('Test');

        const notificationId = result.current.notifications[0].id;

        act(() => {
            result.current.removeNotification(notificationId);
        });

        expect(result.current.notifications.length).toBe(0);
    });
});
