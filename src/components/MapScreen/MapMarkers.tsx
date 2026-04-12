import React from 'react';
import { Marker } from 'react-native-maps';
import { theme } from '../../theme';
import { MOCK_USERS, MOCK_EVENTS } from '../../data/mock';

export default function MapMarkers() {
    return (
        <>
            {MOCK_USERS.map((user) => (
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
