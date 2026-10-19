import { Location } from '../types';
import { ChatMessage } from '../hooks/useConvoyChat';

export type { ChatMessage };

export interface CrewMemberLocation {
    userId: string;
    username: string;
    location: Location;
    lastUpdated: number;
}

export interface ConvoyContextType {
    crewMembers: CrewMemberLocation[];
    isConvoyActive: boolean;
    isBroadcasting: boolean;
    ebsActive: boolean;
    sosLocation?: Location;
    ghostMode: boolean;
    ghostCoordinates: Location[];
    ghostStartTime?: number;
    convoyHeatScore: number;
    evacActive: boolean;
    rallyPoint?: Location;
    toggleConvoy: () => void;
    toggleBroadcast: () => void;
    deployRallyFlare: (location: Location) => void;
    toggleGhostMode: () => void;
    updateLocation: (userId: string, username: string, location: Location) => void;
    triggerEBS: (location?: Location) => void;
    triggerEvac: () => void;
    chatMessages: ChatMessage[];
    addChatMessage: (sender: string, message: string) => void;
}
