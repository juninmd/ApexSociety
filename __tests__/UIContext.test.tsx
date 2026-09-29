import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { UIProvider, useUI } from '../src/context/UIContext';

describe('UIContext', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('provides default alert state', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <UIProvider>{children}</UIProvider>
        );
        const { result } = renderHook(() => useUI(), { wrapper });
        expect(result.current.alertMessage).toBeNull();
    });

    it('shows and hides alert', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <UIProvider>{children}</UIProvider>
        );
        const { result } = renderHook(() => useUI(), { wrapper });

        act(() => {
            result.current.showAlert('Test Alert');
        });

        expect(result.current.alertMessage).toBe('Test Alert');

        act(() => {
            result.current.hideAlert();
        });

        expect(result.current.alertMessage).toBeNull();
    });

    it('auto hides alert after timeout', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <UIProvider>{children}</UIProvider>
        );
        const { result } = renderHook(() => useUI(), { wrapper });

        act(() => {
            result.current.showAlert('Test Alert Timeout');
        });

        expect(result.current.alertMessage).toBe('Test Alert Timeout');

        act(() => {
            jest.advanceTimersByTime(4000);
        });

        expect(result.current.alertMessage).toBeNull();
    });

    it('provides default notification state', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <UIProvider>{children}</UIProvider>
        );
        const { result } = renderHook(() => useUI(), { wrapper });
        expect(result.current.notifications).toEqual([]);
    });

    it('adds and removes notifications', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <UIProvider>{children}</UIProvider>
        );
        const { result } = renderHook(() => useUI(), { wrapper });

        act(() => {
            result.current.addNotification({
                title: 'Test',
                message: 'Message',
                type: 'info',
            });
        });

        expect(result.current.notifications.length).toBe(1);
        expect(result.current.notifications[0].title).toBe('Test');

        const id = result.current.notifications[0].id;

        act(() => {
            result.current.removeNotification(id);
        });

        expect(result.current.notifications.length).toBe(0);
    });
});
