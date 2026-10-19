import React, { useEffect, useState } from 'react';
import { View, Animated, Text } from 'react-native';
import Svg, { Polyline, Circle as SvgCircle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { DriveRun } from '../context/DriveHistoryContext';
import { theme } from '../theme';
import { styles } from './GhostReplayMapStyles';

interface GhostReplayMapProps {
    run: DriveRun;
}

export default function GhostReplayMap({ run }: GhostReplayMapProps) {
    const [progress] = useState(() => new Animated.Value(0));
    const [scanAnim] = useState(() => new Animated.Value(0));

    useEffect(() => {
        if (!run.trajectory || run.trajectory.length === 0) return;

        Animated.timing(progress, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false, // Polyline strokeDashoffset doesn't support native driver well
        }).start();

        Animated.loop(
            Animated.timing(scanAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false,
            }),
        ).start();
    }, [run, progress, scanAnim]);

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

    // Get start and end points for AR highlights
    const startCoords = run.trajectory[0];
    const endCoords = run.trajectory[run.trajectory.length - 1];
    const startX = ((startCoords.lng - minLng) / (maxLng - minLng || 1)) * width;
    const startY = height - ((startCoords.lat - minLat) / (maxLat - minLat || 1)) * height;
    const endX = ((endCoords.lng - minLng) / (maxLng - minLng || 1)) * width;
    const endY = height - ((endCoords.lat - minLat) / (maxLat - minLat || 1)) * height;

    const scanTop = scanAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, height + 20],
    });

    return (
        <View style={styles.container}>
            <View style={styles.arHeader}>
                <Text style={styles.arTitle}>GHOST REPLAY</Text>
                <Text style={styles.arSubtitle}>AR TRAJECTORY ANALYSIS</Text>
            </View>
            <Svg width={width} height={height}>
                <Defs>
                    <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <Stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.5" />
                        <Stop offset="100%" stopColor={theme.colors.primary} stopOpacity="0" />
                    </RadialGradient>
                </Defs>
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
                            strokeDasharray="5,5"
                        />
                        <SvgCircle cx={startX} cy={startY} r="5" fill="#00FF00" />
                        <SvgCircle cx={endX} cy={endY} r="5" fill="#FF0000" />
                    </Svg>
                </Animated.View>
            </Svg>
            <Animated.View
                style={[
                    styles.scanLine,
                    {
                        top: scanTop,
                    },
                ]}
            />
        </View>
    );
}
