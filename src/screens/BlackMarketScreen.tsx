import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ShoppingCart, ShieldAlert } from 'lucide-react-native';
import { useReputation } from '../context/ReputationContext';
import { theme } from '../theme';
import CustomButton from '../components/CustomButton';

const MARKET_ITEMS = [
    {
        id: 'item-1',
        name: 'Radar Jammer',
        description: 'Prevents speed detection for 30 mins.',
        cost: 500,
        risk: 'high',
    },
    {
        id: 'item-2',
        name: 'Fake Plates',
        description: 'Lowers heat increase rate by 50%.',
        cost: 1000,
        risk: 'extreme',
    },
    {
        id: 'item-3',
        name: 'Ghost Mode Pass',
        description: 'Hide location on the map for 1 hr.',
        cost: 200,
        risk: 'medium',
    },
];

export default function BlackMarketScreen() {
    const { reputation, spendReputation } = useReputation();
    const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

    const handlePurchase = (itemId: string, cost: number, name: string) => {
        if (reputation < cost) {
            Alert.alert('Insuficiente', 'Você não tem REP suficiente para isso.');
            return;
        }

        Alert.alert('Confirmar Compra', `Deseja comprar ${name} por ${cost} REP?`, [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Comprar',
                style: 'destructive',
                onPress: () => {
                    if (spendReputation) {
                        const success = spendReputation(cost);
                        if (success) {
                            setPurchasedItems([...purchasedItems, itemId]);
                            Alert.alert(
                                'Sucesso',
                                'Item adquirido e adicionado ao seu inventário.',
                            );
                        } else {
                            Alert.alert('Erro', 'Falha ao processar a compra.');
                        }
                    } else {
                        Alert.alert(
                            'Erro',
                            'Contexto de reputação não implementa spendReputation.',
                        );
                    }
                },
            },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <ShoppingCart color={theme.colors.error} size={32} />
                <Text style={styles.headerTitle}>MERCADO NEGRO</Text>
            </View>

            <View style={styles.repBanner}>
                <Text style={styles.repText}>SEU REP: {reputation}</Text>
            </View>

            <View style={styles.itemsContainer}>
                {MARKET_ITEMS.map((item) => (
                    <View key={item.id} style={styles.itemCard}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                            <View style={styles.riskBadge}>
                                <ShieldAlert size={12} color={theme.colors.error} />
                                <Text style={styles.riskText}>
                                    Risco: {item.risk.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        <CustomButton
                            title={
                                purchasedItems.includes(item.id)
                                    ? 'COMPRADO'
                                    : `COMPRAR (${item.cost})`
                            }
                            onPress={() => {
                                if (!purchasedItems.includes(item.id)) {
                                    handlePurchase(item.id, item.cost, item.name);
                                }
                            }}
                            style={styles.buyButton}
                            variant={purchasedItems.includes(item.id) ? 'secondary' : 'primary'}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
        gap: 10,
    },
    headerTitle: {
        color: theme.colors.error,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 32,
    },
    repBanner: {
        backgroundColor: theme.colors.card,
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    repText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 18,
    },
    itemsContainer: {
        paddingHorizontal: 20,
        gap: 15,
    },
    itemCard: {
        backgroundColor: theme.colors.card,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemInfo: {
        flex: 1,
        marginRight: 10,
    },
    itemName: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
        marginBottom: 5,
    },
    itemDescription: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        marginBottom: 8,
    },
    riskBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    riskText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
    },
    buyButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
});
