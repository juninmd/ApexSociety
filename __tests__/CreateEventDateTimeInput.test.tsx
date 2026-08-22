import React from 'react';
import renderer from 'react-test-renderer';
import CreateEventDateTimeInput from '../src/components/CreateEventDateTimeInput';

describe('CreateEventDateTimeInput', () => {
    it('renders date and time inputs correctly', () => {
        let tree: any;
        renderer.act(() => {
            tree = renderer.create(
                <CreateEventDateTimeInput
                    date="01/01/2025"
                    setDate={() => {}}
                    time="12:00"
                    setTime={() => {}}
                />,
            );
        });
        expect(tree.toJSON()).toBeTruthy();
    });
});
