import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';
import { Lock, Unlock, ShoppingCart } from 'lucide-react-native';
import CustomButton from '../components/CustomButton';

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
    const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

    const handlePurchase = (item: (typeof MARKET_ITEMS)[0]) => {
        if (purchasedItems.includes(item.id)) {
            Alert.alert('Already Owned', `You already own ${item.name}.`);
            return;
        }

        if (reputation >= item.cost) {
            addReputation(-item.cost);
            setPurchasedItems((prev) => [...prev, item.id]);
            Alert.alert('Purchase Successful', `You bought ${item.name} for ${item.cost} REP.`);
        } else {
            Alert.alert('Insufficient REP', `You need ${item.cost} REP to buy this item.`);
        }
    };

    const renderItem = ({ item }: { item: (typeof MARKET_ITEMS)[0] }) => {
        const isOwned = purchasedItems.includes(item.id);
        const canAfford = reputation >= item.cost;

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
                        title={isOwned ? 'OWNED' : 'BUY'}
                        onPress={() => {
                            if (!isOwned && canAfford) {
                                handlePurchase(item);
                            }
                        }}
                        variant={isOwned ? 'secondary' : 'primary'}
                        style={styles.buyButton}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ShoppingCart color={theme.colors.primary} size={32} />
                <Text style={styles.title}>BLACK MARKET</Text>
            </View>
            <Text style={styles.repText}>Current Balance: {reputation} REP</Text>

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
