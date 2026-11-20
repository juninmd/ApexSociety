import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import CreateEventForm from '../src/components/CreateEventForm';

const mockAddEvent = jest.fn();
jest.mock('../src/context/EventContext', () => ({ useEvents: () => ({ addEvent: mockAddEvent }) }));
jest.mock('../src/hooks/useWeather', () => ({ useWeather: () => ({ isRaining: false }) }));
jest.mock('@react-navigation/native', () => ({ useNavigation: () => ({ goBack: jest.fn() }) }));

const fill = (utils: ReturnType<typeof render>, date: string, time: string) => {
    fireEvent.changeText(utils.getByPlaceholderText('Ex: Encontro de Sexta à Noite'), 'Meet');
    fireEvent.changeText(utils.getByPlaceholderText('Onde vamos nos encontrar?'), 'Posto 24h');
    fireEvent.changeText(utils.getByPlaceholderText('DD/MM/AAAA'), date);
    fireEvent.changeText(utils.getByPlaceholderText('HH:MM'), time);
    fireEvent.press(utils.getByText('PUBLICAR EVENTO'));
};

describe('<CreateEventForm />', () => {
    beforeEach(() => {
        mockAddEvent.mockClear();
        jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    });
    afterEach(() => jest.restoreAllMocks());

    it('não publica evento com data/hora em texto livre', () => {
        fill(render(<CreateEventForm />), 'amanhã', '9h');
        expect(mockAddEvent).not.toHaveBeenCalled();
        expect(Alert.alert).toHaveBeenCalledWith('Erro', expect.stringMatching(/Data inválida/));
    });

    it('publica evento válido com campos sem espaços sobrando', () => {
        fill(render(<CreateEventForm />), ' 20/11/2026 ', '22:30');
        expect(mockAddEvent).toHaveBeenCalledWith(
            expect.objectContaining({ title: 'Meet', startTime: '20/11/2026 @ 22:30' }),
        );
    });
});
