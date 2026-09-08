import { Friend } from '../types';

export const MOCK_HOTSPOTS = [
    {
        id: 'hs1',
        center: { latitude: -23.56, longitude: -46.64 },
        radius: 800,
        color: 'rgba(255, 100, 0, 0.4)',
        intensity: 0.8,
    },
    {
        id: 'hs2',
        center: { latitude: -23.59, longitude: -46.69 },
        radius: 1200,
        color: 'rgba(255, 50, 0, 0.5)',
        intensity: 0.9,
    },
];

export const MOCK_FRIENDS = [
    {
        id: 'f1',
        username: 'NightRider',
        avatarUrl: 'https://i.pravatar.cc/150?u=NightRider',
        location: { latitude: -23.55, longitude: -46.63 },
        lastActive: '2023-10-27T10:00:00Z',
        status: 'driving',
    },
    {
        id: 'f2',
        username: 'DriftQueen',
        avatarUrl: 'https://i.pravatar.cc/150?u=DriftQueen',
        location: { latitude: -23.56, longitude: -46.65 },
        lastActive: '2023-10-27T09:30:00Z',
        status: 'online',
    },
    {
        id: 'f3',
        username: 'TurboTom',
        avatarUrl: 'https://i.pravatar.cc/150?u=TurboTom',
        location: { latitude: -23.6, longitude: -46.7 },
        lastActive: '2023-10-26T20:00:00Z',
        status: 'offline',
    },
] as Friend[];
