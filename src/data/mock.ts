import { User, Crew, Event } from '../types';

export const MOCK_CREWS: Crew[] = [
    {
        id: 'crew-1',
        name: 'SPORTS CLUB US',
        tag: 'FIRST2',
        rank: '♔ FIRST2',
        memberCount: 1,
        foundedYear: "'25",
        logoUrl: undefined, // Placeholder handled in UI
        bannerUrl: undefined,
    },
    {
        id: 'crew-2',
        name: 'NIGHT RUNNERS',
        tag: 'NRUN',
        rank: 'ELITE',
        memberCount: 12,
        foundedYear: "'23",
    },
];

export const MOCK_USERS: User[] = [
    {
        id: 'user-1',
        username: 'DriftKing',
        location: {
            latitude: 37.78825,
            longitude: -122.4324,
        },
        crewId: 'crew-1',
        lastActive: 'Now',
    },
    {
        id: 'user-2',
        username: 'SpeedDemon',
        location: {
            latitude: 37.78325,
            longitude: -122.4424,
        },
        crewId: 'crew-2',
        lastActive: '5m ago',
    },
    {
        id: 'user-3',
        username: 'StreetRacer',
        location: {
            latitude: 37.79325,
            longitude: -122.4224,
        },
        lastActive: '1h ago',
    },
];

export const MOCK_EVENTS: Event[] = [
    {
        id: 'event-1',
        title: 'NOSHOW',
        hostId: 'crew-1', // Hosted by Sports Club US
        collabId: 'crew-2', // Collab with Night Runners
        location: {
            latitude: 37.78325,
            longitude: -122.4424,
            address: 'NOPE',
        },
        startTime: 'MON 24 FEB 2025 @ 21:17',
        endTime: 'MON 24 FEB 2025 @ 22:17',
        attendees: 2,
        isPrivate: true,
        description: 'Exclusive meet for top tier racers.',
        eventType: 'meet',
    },
    {
        id: 'event-2',
        title: 'MIDNIGHT RUN',
        hostId: 'crew-2',
        location: {
            latitude: 37.75325,
            longitude: -122.4124,
            address: 'DOWNTOWN',
        },
        startTime: 'FRI 28 FEB 2025 @ 23:00',
        endTime: 'SAT 01 MAR 2025 @ 02:00',
        attendees: 45,
        isPrivate: false,
        description: 'Open invite for all crews.',
        eventType: 'race',
    },
    {
        id: 'event-3',
        title: 'CORRIDA DE RUA - SÃO PAULO',
        hostId: 'crew-1',
        location: {
            latitude: -23.5505,
            longitude: -46.6333,
            address: 'AVENIDA PAULISTA',
        },
        startTime: 'FRI 05 MAR 2025 @ 00:00',
        endTime: 'FRI 05 MAR 2025 @ 03:00',
        attendees: 150,
        isPrivate: false,
        description: 'Street race event. No cops allowed.',
        eventType: 'race',
    },
    {
        id: 'event-4',
        title: 'BLITZ POLICIAL',
        hostId: 'crew-2',
        location: {
            latitude: -23.5615,
            longitude: -46.6563,
            address: 'RUA AUGUSTA',
        },
        startTime: 'NOW',
        endTime: 'UNKNOWN',
        attendees: 0,
        isPrivate: false,
        description: 'Blitz reportada pela Night Runners.',
        eventType: 'checkpoint',
    },
];
