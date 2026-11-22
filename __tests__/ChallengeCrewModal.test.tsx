import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChallengeCrewModal from '../src/components/ChallengeCrewModal';
import { showAlert } from '../src/utils/alert';

jest.mock('../src/utils/alert', () => ({ showAlert: jest.fn() }));

describe('ChallengeCrewModal wager', () => {
    beforeEach(() => jest.clearAllMocks());

    const submit = (wager: string) => {
        const onChallenge = jest.fn();
        const onClose = jest.fn();
        const screen = render(
            <ChallengeCrewModal
                visible
                crewName="Night Riders"
                onClose={onClose}
                onChallenge={onChallenge}
            />,
        );
        fireEvent.changeText(screen.getByDisplayValue('100'), wager);
        fireEvent.press(screen.getByText('ENVIAR DESAFIO'));
        return { onChallenge, onClose };
    };

    it('sends a whole-number wager', () => {
        const { onChallenge, onClose } = submit('250');
        expect(onChallenge).toHaveBeenCalledWith(250);
        expect(onClose).toHaveBeenCalled();
    });

    // "1.000" (pt-BR thousands) used to become a wager of 1 REP.
    it.each(['1.000', '50abc'])('rejects %p instead of truncating it', (wager) => {
        const { onChallenge, onClose } = submit(wager);
        expect(onChallenge).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
        expect(showAlert).toHaveBeenCalledWith('Erro', expect.stringContaining('só com números'));
    });
});
