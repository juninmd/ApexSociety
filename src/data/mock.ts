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
        weather: 'clear',
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
        weather: 'rain',
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
        isSecret: true,
        passcode: '05MAR',
        weather: 'fog',
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
