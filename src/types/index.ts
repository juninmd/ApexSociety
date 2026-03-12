export interface Location {
    latitude: number;
    longitude: number;
    address?: string;
}

export interface User {
    id: string;
    username: string;
    avatarUrl?: string;
    location: Location;
    crewId?: string;
    lastActive: string;
}

export interface Crew {
    id: string;
    name: string;
    tag: string;
    logoUrl?: string;
    bannerUrl?: string;
    rank: string;
    memberCount: number;
    foundedYear: string;
}

export interface Event {
    id: string;
    title: string;
    hostId: string;
    crewId?: string;
    collabId?: string;
    location: Location;
    startTime: string;
    endTime: string;
    attendees: number;
    isPrivate: boolean;
    description?: string;
}
