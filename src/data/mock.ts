import { User, Crew, Event } from '../types';

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

export const MOCK_EVENTS: Event[] = [
    {
        id: 'event-1',
        title: 'ENCONTRO DE RUA - ZONA SUL',
        hostId: 'crew-1', // Hosted by Os Corredores
        collabId: 'crew-2', // Collab with Night Runners BR
        location: {
            latitude: -23.5815,
            longitude: -46.6663,
            address: 'POSTO IPIRANGA - AV. BRASIL',
        },
        startTime: 'SEG 24 FEV 2025 @ 21:00',
        endTime: 'SEG 24 FEV 2025 @ 23:30',
        attendees: 30,
        isPrivate: false,
        description:
            'Encontro focado em carros modificados no estilo FIRST2. Sem manobras perigosas.',
        eventType: 'meet',
    },
    {
        id: 'event-2',
        title: 'CORRIDA NOTURNA - INTERLAGOS',
        hostId: 'crew-2',
        location: {
            latitude: -23.7015,
            longitude: -46.6963,
            address: 'AV. INTERLAGOS',
        },
        startTime: 'SEX 28 FEV 2025 @ 23:00',
        endTime: 'SÁB 01 MAR 2025 @ 02:00',
        attendees: 45,
        isPrivate: false,
        description: 'Corridas underground amigáveis para todas as equipes da comunidade.',
        eventType: 'race',
        riskLevel: 'medium',
        prize: 'Aposta Amigável',
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
        startTime: 'SEX 05 MAR 2025 @ 00:00',
        endTime: 'SEX 05 MAR 2025 @ 03:00',
        attendees: 150,
        isPrivate: false,
        description:
            'Maior evento de corridas underground inspirado no FIRST2. Cuidado com a polícia.',
        eventType: 'race',
        riskLevel: 'high',
        prize: 'R$ 2.000 + Respeito',
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
        startTime: 'AGORA',
        endTime: 'DESCONHECIDO',
        attendees: 0,
        isPrivate: false,
        description: 'Blitz reportada pela Night Runners BR.',
        eventType: 'checkpoint',
    },
];
