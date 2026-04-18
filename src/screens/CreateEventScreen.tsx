import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../theme';
import CreateEventForm from '../components/CreateEventForm';

export default function CreateEventScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CRIAR EVENTO</Text>
            </View>
            <CreateEventForm />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        color: theme.colors.primary,
        letterSpacing: 2,
    },
});
