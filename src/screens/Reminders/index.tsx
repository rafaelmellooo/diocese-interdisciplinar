import React, { useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { Reminder } from '../../interfaces/Reminder';
import { styles } from './styles';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

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
            {reminders.length ?
                reminders.map((reminder, index) => (
                    <View style={[styles.card, {
                        backgroundColor: colors.card,
                        borderColor: colors.border
                    }]} key={index}>
                        <Text style={[styles.cardTitle, { color: colors.text }]}>{reminder.name}</Text>
                        <Text style={{ color: colors.text }}>{moment(reminder.datetime).format("DD/MM/YY HH:mm")}</Text>
                        <Text style={{ color: colors.text, marginTop: 5, ...(!reminder.address && {fontStyle: 'italic'}) }}>{reminder.address || "Endereço não informado"}</Text>
                    </View>
                ))
                :
                <View style={[styles.card, {
                    alignItems: 'center',
                    borderWidth: 0
                }]}>
                    <Text style={{ fontSize: 16, color: colors.border }}>Você ainda não possui lembretes salvos</Text>
                </View>
            }
        </ScrollView>
    );
}