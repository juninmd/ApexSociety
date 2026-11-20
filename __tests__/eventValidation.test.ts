import { validateEventForm } from '../src/utils/eventValidation';

const valid = { title: 'Meet de sexta', date: '20/11/2026', time: '22:30', location: 'Posto 24h' };

describe('validateEventForm', () => {
    it('aceita um evento válido', () => {
        expect(validateEventForm(valid)).toBeNull();
    });

    it('recusa campos obrigatórios só com espaços', () => {
        expect(validateEventForm({ ...valid, title: '   ' })).toMatch(/campos obrigatórios/);
        expect(validateEventForm({ ...valid, location: ' ' })).toMatch(/campos obrigatórios/);
    });

    it.each(['amanhã', '2026-11-20', '31/02/2026', '00/01/2026', '1/1/2026'])(
        'recusa data inválida %s',
        (date) => {
            expect(validateEventForm({ ...valid, date })).toMatch(/Data inválida/);
        },
    );

    it('aceita 29/02 em ano bissexto', () => {
        expect(validateEventForm({ ...valid, date: '29/02/2028' })).toBeNull();
    });

    it.each(['24:00', '9h', '12:60', '7:30'])('recusa hora inválida %s', (time) => {
        expect(validateEventForm({ ...valid, time })).toMatch(/Hora inválida/);
    });
});
