import React from 'react';
import { StyleSheet } from 'react-native';
import { Polyline } from 'react-native-maps';
import { Location } from '../../types';

interface PerfectRouteVisualizerProps {
    waypoints: Location[];
}

export default function PerfectRouteVisualizer({ waypoints }: PerfectRouteVisualizerProps) {
    if (!waypoints || waypoints.length < 2) return null;

    return (
        <Polyline
            coordinates={waypoints}
            strokeColor="#00FF00" // Neon green for "Perfect Route"
            strokeWidth={4}
            lineDashPattern={[10, 5]}
        />
    );
}

const styles = StyleSheet.create({});
