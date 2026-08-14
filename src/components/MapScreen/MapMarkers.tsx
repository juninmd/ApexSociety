import React from 'react';
import { Marker } from 'react-native-maps';
import { theme } from '../../theme';
import { MOCK_USERS, MOCK_EVENTS } from '../../data/mock';
import { useConvoy } from '../../context/ConvoyContext';

export default function MapMarkers() {
    const { crewMembers, isConvoyActive } = useConvoy();

    return (
        <>
            {/* Display active convoy members if convoy mode is enabled */}
            {isConvoyActive &&
                crewMembers.map((member) => (
                    <Marker
                        key={`convoy-${member.userId}`}
                        coordinate={{
                            latitude: member.location.latitude,
                            longitude: member.location.longitude,
                        }}
                        title={member.username}
                        description="Convoy Member"
                        pinColor="#00FF00" // Green for convoy members
                    />
                ))}

            {/* Display static mock users only if convoy is inactive */}
            {!isConvoyActive &&
                MOCK_USERS.map((user) => (
                    <Marker
                        key={user.id}
                        coordinate={{
                            latitude: user.location.latitude,
                            longitude: user.location.longitude,
                        }}
                        title={user.username}
                        description={`Last active: ${user.lastActive}`}
                        pinColor={theme.colors.primary} // Yellow for users
                    />
                ))}

            {MOCK_EVENTS.map((event) => {
                let markerColor = theme.colors.error; // default red
                if (event.eventType === 'meet') {
                    markerColor = theme.colors.primary; // yellow
                } else if (event.eventType === 'race') {
                    markerColor = theme.colors.error; // red
                } else if (event.eventType === 'checkpoint') {
                    markerColor = '#0000FF'; // blue
                }

                return (
                    <Marker
                        key={event.id}
                        coordinate={{
                            latitude: event.location.latitude,
                            longitude: event.location.longitude,
                        }}
                        title={event.title}
                        description={event.startTime}
                        pinColor={markerColor}
                    />
                );
            })}
        </>
    );
}
