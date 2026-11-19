import { getDistance } from '../src/utils/location';

describe('getDistance (haversine, km)', () => {
    it('returns 0 for identical points', () => {
        expect(getDistance(-23.55, -46.63, -23.55, -46.63)).toBe(0);
    });

    it('matches the known Sao Paulo -> Rio de Janeiro distance (~357 km)', () => {
        const d = getDistance(-23.5505, -46.6333, -22.9068, -43.1729);
        expect(d).toBeGreaterThan(350);
        expect(d).toBeLessThan(365);
    });

    it('is symmetric, so geofence checks do not depend on argument order', () => {
        const ab = getDistance(10, 20, 30, 40);
        const ba = getDistance(30, 40, 10, 20);
        expect(ab).toBeCloseTo(ba, 9);
    });

    it('measures one degree of latitude as ~111.19 km', () => {
        expect(getDistance(0, 0, 1, 0)).toBeCloseTo(111.19, 1);
    });

    it('handles the antimeridian without wrapping the long way round', () => {
        expect(getDistance(0, 179.5, 0, -179.5)).toBeCloseTo(111.19, 1);
    });
});
