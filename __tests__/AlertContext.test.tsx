import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import { AlertProvider, useAlert } from '../src/context/AlertContext';
import { Text, Button } from 'react-native';

const TestComponent = () => {
    const { alertMessage, showAlert, hideAlert } = useAlert();

    return (
        <>
            <Text testID="alert-message">{alertMessage ?? 'No alert'}</Text>
            <Button testID="show-alert-btn" title="Show" onPress={() => showAlert('Test Alert')} />
            <Button testID="hide-alert-btn" title="Hide" onPress={hideAlert} />
        </>
    );
};

describe('AlertContext', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should show an alert and then automatically hide it after timeout', () => {
        const { getByTestId } = render(
            <AlertProvider>
                <TestComponent />
            </AlertProvider>,
        );

        const alertText = getByTestId('alert-message');
        const showBtn = getByTestId('show-alert-btn');

        expect(alertText.props.children).toBe('No alert');

        act(() => {
            fireEvent.press(showBtn);
        });

        expect(alertText.props.children).toBe('Test Alert');

        act(() => {
            jest.advanceTimersByTime(4000);
        });

        expect(alertText.props.children).toBe('No alert');
    });

    it('should hide alert manually when hideAlert is called', () => {
        const { getByTestId } = render(
            <AlertProvider>
                <TestComponent />
            </AlertProvider>,
        );

        const alertText = getByTestId('alert-message');
        const showBtn = getByTestId('show-alert-btn');
        const hideBtn = getByTestId('hide-alert-btn');

        act(() => {
            fireEvent.press(showBtn);
        });

        expect(alertText.props.children).toBe('Test Alert');

        act(() => {
            fireEvent.press(hideBtn);
        });

        expect(alertText.props.children).toBe('No alert');
    });

    it('should reset the timeout when showAlert is called multiple times', () => {
        const { getByTestId } = render(
            <AlertProvider>
                <TestComponent />
            </AlertProvider>,
        );

        const alertText = getByTestId('alert-message');
        const showBtn = getByTestId('show-alert-btn');

        act(() => {
            fireEvent.press(showBtn);
        });

        expect(alertText.props.children).toBe('Test Alert');

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        // Call show again to reset the 4-second timer
        act(() => {
            fireEvent.press(showBtn);
        });

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        // Should still be visible because timer was reset
        expect(alertText.props.children).toBe('Test Alert');

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        // Now it should be hidden
        expect(alertText.props.children).toBe('No alert');
    });
});
