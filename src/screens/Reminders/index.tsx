import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { Reminder } from '../../interfaces/Reminder';
import { styles } from './styles';
import { useFocusEffect, useTheme } from '@react-navigation/native';

export default function Reminders() {
    const { colors } = useTheme();

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
        <View style={[styles.container, {
            backgroundColor: colors.background
        }]}>
            {
                reminders.map((reminder, index) => (
                    <View key={index}>
                        <Text>{reminder.name}</Text>
                        <Text>{reminder.info}</Text>
                        <Text>{reminder.distance}</Text>
                    </View>
                ))
            }
        </View>
    );
}