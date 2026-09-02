import React from 'react';
import { Animated, Text } from 'react-native';
import { styles } from './CarCardStyles';

interface CarCardShowcaseProps {
    scanAnim: Animated.Value;
}

export default function CarCardShowcase({ scanAnim }: CarCardShowcaseProps) {
    return (
        <Animated.View
            style={[
                styles.showcaseOverlay,
                {
                    opacity: scanAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                    }),
                },
            ]}
            pointerEvents="none"
        >
            <Text style={styles.showcaseText}>AR SHOWCASE ACTIVE</Text>
        </Animated.View>
    );
}
