import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Lock, Unlock } from 'lucide-react-native';
import CustomButton from './CustomButton';

interface MarketItemProps {
    item: {
        id: string;
        name: string;
        description: string;
        cost: number;
        type: string;
    };
    isOwned: boolean;
    canAfford: boolean;
    isConsumableActive: boolean;
    onPurchase: (item: {
        id: string;
        name: string;
        description: string;
        cost: number;
        type: string;
    }) => void;
}

export default function BlackMarketItem({
    item,
    isOwned,
    canAfford,
    isConsumableActive,
    onPurchase,
}: MarketItemProps) {
    return (
        <View style={styles.itemCard}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                {isOwned ? (
                    <Unlock size={20} color={theme.colors.primary} />
                ) : (
                    <Lock size={20} color={theme.colors.textSecondary} />
                )}
            </View>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <View style={styles.itemFooter}>
                <Text style={[styles.itemCost, !canAfford && !isOwned && styles.cannotAfford]}>
                    {item.cost} REP
                </Text>
                <CustomButton
                    title={isConsumableActive ? 'ACTIVE' : isOwned ? 'OWNED' : 'BUY'}
                    onPress={() => {
                        if (!isOwned && canAfford && !isConsumableActive) {
                            onPurchase(item);
                        }
                    }}
                    variant={isOwned || isConsumableActive ? 'secondary' : 'primary'}
                    style={styles.buyButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemCard: {
        backgroundColor: theme.colors.card,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    itemName: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 18,
        color: theme.colors.white,
    },
    itemDescription: {
        fontFamily: theme.fonts.primary.regular,
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 15,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemCost: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
        color: theme.colors.primary,
    },
    cannotAfford: {
        color: theme.colors.error,
    },
    buyButton: {
        minWidth: 100,
    },
});
