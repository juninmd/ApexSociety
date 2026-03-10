import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../src/components/CustomButton';

describe('<CustomButton />', () => {
    it('renders with default primary variant', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(<CustomButton title="Click Me" onPress={onPressMock} />);

        const text = getByText('Click Me');
        expect(text).toBeTruthy();
        expect(text.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ color: '#000000' })]));

        fireEvent.press(text);
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('renders with secondary variant', () => {
        const { getByText } = render(
            <CustomButton title="Secondary" onPress={() => {}} variant="secondary" />
        );

        const text = getByText('Secondary');
        expect(text.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ color: '#FFFFFF' })]));
    });

    it('renders with danger variant', () => {
        const { getByText } = render(
            <CustomButton title="Danger" onPress={() => {}} variant="danger" />
        );

        const text = getByText('Danger');
        expect(text.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ color: '#FFFFFF' })]));
    });

    it('renders with invalid variant falling back to default styling', () => {
        const { getByText } = render(
            // @ts-ignore testing invalid prop
            <CustomButton title="Invalid" onPress={() => {}} variant="unknown" />
        );

        const text = getByText('Invalid');
        // Both the text color and background color should fall back
        expect(text.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ color: '#000000' })]));
    });
});