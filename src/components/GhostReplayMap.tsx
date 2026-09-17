import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { DriveRun } from '../context/DriveHistoryContext';
import { theme } from '../theme';

interface GhostReplayMapProps {
    run: DriveRun;
}

export default function GhostReplayMap({ run }: GhostReplayMapProps) {
    const [progress] = useState(() => new Animated.Value(0));

    useEffect(() => {
        if (!run.trajectory || run.trajectory.length === 0) return;

        Animated.timing(progress, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false, // Polyline strokeDashoffset doesn't support native driver well
        }).start();
    }, [run, progress]);

    if (!run.trajectory || run.trajectory.length === 0) {
        return null;
    }

    // A simple way to normalize coordinates to a 300x150 SVG box
    const minLat = Math.min(...run.trajectory.map((t) => t.lat));
    const maxLat = Math.max(...run.trajectory.map((t) => t.lat));
    const minLng = Math.min(...run.trajectory.map((t) => t.lng));
    const maxLng = Math.max(...run.trajectory.map((t) => t.lng));

    const width = 300;
    const height = 150;

    const points = run.trajectory
        .map((t) => {
            const x = ((t.lng - minLng) / (maxLng - minLng || 1)) * width;
            // Invert Y because SVG 0,0 is top-left, but lat increases going North (up)
            const y = height - ((t.lat - minLat) / (maxLat - minLat || 1)) * height;
            return `${x},${y}`;
        })
        .join(' ');

    // Very basic animation by animating opacity for now, as dashoffset on web can be tricky without dedicated libs
    return (
        <View style={styles.container}>
            <Svg width={width} height={height}>
                <Polyline
                    points={points}
                    fill="none"
                    stroke={theme.colors.border}
                    strokeWidth="2"
                    strokeOpacity={0.5}
                />
                <Animated.View
                    style={{
                        opacity: progress,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Svg width={width} height={height}>
                        <Polyline
                            points={points}
                            fill="none"
                            stroke={theme.colors.primary}
                            strokeWidth="3"
                        />
                    </Svg>
                </Animated.View>
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a', // Darker background for the map
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
});
