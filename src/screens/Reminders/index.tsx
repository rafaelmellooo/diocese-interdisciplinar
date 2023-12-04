import React, { useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { Reminder } from '../../interfaces/Reminder';
import { styles } from './styles';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Reminders() {
    const { dark, colors } = useTheme();

    const [reminders, setReminders] = useState<Reminder[]>([]);

    const storedReminders = useAsyncStorage('@reminders');

    useFocusEffect(useCallback(() => {
        loadSchedules();
    }, []));

    const loadSchedules = async () => {
        const reminders = await storedReminders.getItem();

        if (!reminders) {
            return;
        }

        setReminders(JSON.parse(reminders));
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator style={[styles.container, {
                backgroundColor: colors.background
            }]}
            contentContainerStyle={{
                paddingVertical: 10,
                paddingHorizontal: 20
            }}
        >
            {
                reminders.map((reminder, index) => (
                    <View style={[styles.card, {
                        backgroundColor: colors.card,
                        borderColor: colors.border
                    }]} key={index}>
                        <Text style={[styles.cardTitle, { color: colors.text }]}>{reminder.name}</Text>
                        <Text style={[{ color: colors.text }]}>Endereço: {reminder.address}</Text>
                    </View>
                ))
            }
        </ScrollView>
    );
}