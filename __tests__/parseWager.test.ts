import { parseWager } from '../src/utils/parseWager';

describe('parseWager', () => {
    it.each([
        ['250', 250],
        [' 250 ', 250],
        ['0', 0],
    ])('reads %p as %p', (raw, expected) => {
        expect(parseWager(raw)).toBe(expected);
    });

    // parseInt read "1.000" (pt-BR thousands) as 1 and "50abc" as 50, wagering a value the player never typed.
    it.each(['1.000', '1,000', '1e3', '50abc', '12.5', '-5', '', '   '])('rejects %p', (raw) => {
        expect(parseWager(raw)).toBeNull();
    });
});
