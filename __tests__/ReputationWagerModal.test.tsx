import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReputationWagerModal from '../src/components/ReputationWagerModal';
import { ReputationProvider } from '../src/context/ReputationContext';
import { showAlert } from '../src/utils/alert';

jest.mock('../src/utils/alert', () => ({ showAlert: jest.fn() }));

const submit = (wager: string) => {
    const screen = render(
        <ReputationProvider>
            <ReputationWagerModal visible onClose={jest.fn()} rivalName="Ghost" />
        </ReputationProvider>,
    );
    fireEvent.changeText(screen.getByPlaceholderText('Enter amount...'), wager);
    fireEvent.press(screen.getByText('RACE'));
};

describe('ReputationWagerModal', () => {
    beforeEach(() => jest.clearAllMocks());

    it('races with a whole-number wager', () => {
        submit('100');
        expect(showAlert).toHaveBeenCalledWith(
            expect.stringMatching(/^Race (Won|Lost)!?$/),
            expect.stringContaining('100 REP'),
        );
    });

    // parseInt turned "1,000" into a 1 REP race instead of asking again.
    it.each(['1,000', '1.000', '50abc'])('rejects %p', (wager) => {
        submit(wager);
        expect(showAlert).toHaveBeenCalledTimes(1);
        expect(showAlert).toHaveBeenCalledWith('Invalid Amount', expect.any(String));
    });
});
