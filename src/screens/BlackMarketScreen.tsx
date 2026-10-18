import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';
import { useHazards } from '../context/HazardContext';
import { ShoppingCart } from 'lucide-react-native';
import BlackMarketItem from '../components/BlackMarketItem';

const MARKET_ITEMS = [
    {
        id: '1',
        name: 'Radar Jammer',
        description: 'Temporarily masks your speed from radars.',
        cost: 1000,
        type: 'consumable',
    },
    {
        id: '2',
        name: 'Fake Plates',
        description: 'Reduces heat level gain during chases.',
        cost: 2500,
        type: 'mod',
    },
    {
        id: '3',
        name: 'VIP Meet Pass',
        description: 'Guarantees entry to private high-stakes meets.',
        cost: 5000,
        type: 'pass',
    },
];

export default function BlackMarketScreen() {
    const { reputation, addReputation } = useReputation();
    const { activateJammer, isJammerActive, activateFakePlates, isFakePlatesActive } = useHazards();
    const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

    const handlePurchase = (item: (typeof MARKET_ITEMS)[0]) => {
        if (purchasedItems.includes(item.id)) {
            Alert.alert('Already Owned', `You already own ${item.name}.`);
            return;
        }

        if (reputation >= item.cost) {
            addReputation(-item.cost);
            if (item.name === 'Radar Jammer') {
                activateJammer();
            } else if (item.name === 'Fake Plates') {
                activateFakePlates();
            } else {
                setPurchasedItems((prev) => [...prev, item.id]);
            }
            Alert.alert('Purchase Successful', `You bought ${item.name} for ${item.cost} REP.`);
        } else {
            Alert.alert('Insufficient REP', `You need ${item.cost} REP to buy this item.`);
        }
    };

    const renderItem = ({ item }: { item: (typeof MARKET_ITEMS)[0] }) => {
        const isOwned = purchasedItems.includes(item.id);
        const canAfford = reputation >= item.cost;
        const isConsumableActive =
            (item.name === 'Radar Jammer' && isJammerActive) ||
            (item.name === 'Fake Plates' && isFakePlatesActive);

        return (
            <BlackMarketItem
                item={item}
                isOwned={isOwned}
                canAfford={canAfford}
                isConsumableActive={isConsumableActive}
                onPurchase={handlePurchase}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ShoppingCart color={theme.colors.primary} size={32} />
                <Text style={styles.title}>BLACK MARKET</Text>
            </View>
            <Text style={styles.repText}>Current Balance: {reputation} REP</Text>

            {(isJammerActive || isFakePlatesActive) && (
                <View style={styles.jammerBanner}>
                    <Text style={styles.jammerBannerText}>
                        {isJammerActive ? 'RADAR JAMMER ACTIVE (60s)' : ''}
                        {isJammerActive && isFakePlatesActive ? ' | ' : ''}
                        {isFakePlatesActive ? 'FAKE PLATES ACTIVE (120s)' : ''}
                    </Text>
                </View>
            )}

            <FlatList
                data={MARKET_ITEMS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 40,
        justifyContent: 'center',
        gap: 10,
    },
    title: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 24,
        color: theme.colors.primary,
        letterSpacing: 2,
    },
    repText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        color: theme.colors.white,
        textAlign: 'center',
        marginBottom: 20,
    },
    listContainer: {
        gap: 15,
    },
    jammerBanner: {
        backgroundColor: 'rgba(211, 47, 47, 0.2)',
        borderWidth: 1,
        borderColor: theme.colors.error,
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
    },
    jammerBannerText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
    },
});
