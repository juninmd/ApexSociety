import { User, Crew } from '../types';

export const MOCK_CREWS: Crew[] = [
    {
        id: 'crew-1',
        name: 'OS CORREDORES',
        tag: 'FIRST2',
        rank: '♔ FIRST2',
        memberCount: 24,
        foundedYear: "'25",
        logoUrl: undefined, // Placeholder handled in UI
        bannerUrl: undefined,
    },
    {
        id: 'crew-2',
        name: 'NIGHT RUNNERS BR',
        tag: 'NRBR',
        rank: 'ELITE',
        memberCount: 12,
        foundedYear: "'23",
    },
];

export const MOCK_USERS: User[] = [
    {
        id: 'user-1',
        username: 'DriftKingBR',
        location: {
            latitude: -23.5505,
            longitude: -46.6333,
        },
        crewId: 'crew-1',
        lastActive: 'Agora',
    },
    {
        id: 'user-2',
        username: 'SpeedDemon',
        location: {
            latitude: -23.5615,
            longitude: -46.6563,
        },
        crewId: 'crew-2',
        lastActive: 'Há 5 min',
    },
    {
        id: 'user-3',
        username: 'StreetRacer',
        location: {
            latitude: -23.5715,
            longitude: -46.6463,
        },
        lastActive: 'Há 1 hora',
    },
];

export const MOCK_PROFILE_USER = {
    name: 'ALEX RACER',
    handle: '@driftking_99',
    bio: 'JDM Enthusiast | Touge Runner | Building a 180SX',
    location: 'Tokyo, Japan',
    stats: {
        followers: '12.5K',
        following: '420',
        reputation: 'ELITE',
    },
    garage: [
        {
            id: '1',
            name: 'NISSAN 180SX',
            image: 'https://images.unsplash.com/photo-1626668893632-6f3d4466d25f?auto=format&fit=crop&q=80&w=800',
            specs: { engine: 'SR20DET', hp: '350 HP' },
        },
        {
            id: '2',
            name: 'MAZDA RX-7',
            image: 'https://images.unsplash.com/photo-1621251978255-a04454d65146?auto=format&fit=crop&q=80&w=800',
            specs: { engine: '13B-REW', hp: '400 HP' },
        },
        {
            id: '3',
            name: 'TOYOTA SUPRA',
            image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800',
            specs: { engine: '2JZ-GTE', hp: '800 HP' },
        },
    ],
    crews: [
        { id: 'crew-1', name: 'SPORTS CLUB US', rank: 'LEADER' },
        { id: 'crew-2', name: 'MIDNIGHT RUNNERS', rank: 'MEMBER' },
        { id: 'crew-3', name: 'TOKYO DRIFT', rank: 'ELITE' },
    ],
    stickers: [
        { id: 's1', name: 'NIGHT RIDER', color: '#00F0FF' },
        { id: 's2', name: 'TOUGE KING', color: '#FF0055' },
        { id: 's3', name: 'JDM LEGEND', color: '#FFE600' },
        { id: 's4', name: '1ST MEET', color: '#00FF00' },
    ],
};

export { MOCK_EVENTS } from './mockEvents';
