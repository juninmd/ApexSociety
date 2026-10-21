import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';
import { useHazards } from '../context/HazardContext';
import { ShoppingCart } from 'lucide-react-native';
import BlackMarketItem from '../components/BlackMarketItem';
import { styles } from './BlackMarketScreenStyles';

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
    const { reputation, addReputation, unlockVipPass, hasVipPass } = useReputation();
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
            } else if (item.name === 'VIP Meet Pass') {
                unlockVipPass();
                setPurchasedItems((prev) => [...prev, item.id]);
            } else {
                setPurchasedItems((prev) => [...prev, item.id]);
            }
            Alert.alert('Purchase Successful', `You bought ${item.name} for ${item.cost} REP.`);
        } else {
            Alert.alert('Insufficient REP', `You need ${item.cost} REP to buy this item.`);
        }
    };

    const renderItem = ({ item }: { item: (typeof MARKET_ITEMS)[0] }) => {
        const isOwned =
            purchasedItems.includes(item.id) || (item.name === 'VIP Meet Pass' && hasVipPass);
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
