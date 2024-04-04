import React, { useState, useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { Reminder } from '../../interfaces/Reminder';
import { styles } from './styles';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import moment from 'moment';
import EmptyListComponent from '../../components/EmptyListComponent';

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
    
    const ReminderItem = ({name, datetime, address}: Reminder) => (
        <View style={[styles.card, {
            backgroundColor: colors.card,
            borderColor: colors.border
        }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{name}</Text>
            <Text style={{ color: colors.text }}>{moment(datetime).format("DD/MM/YY [às] HH:mm")}</Text>
            <Text style={{ color: colors.text, marginTop: 5, ...(!address && {fontStyle: 'italic'}) }}>{address || "Endereço não informado"}</Text>
        </View>
    )

    return (
        <FlatList
            data={reminders}
            renderItem={({item}) => <ReminderItem name={item.name} datetime={item.datetime} address={item.address} />}
            showsVerticalScrollIndicator
            contentContainerStyle={{
                paddingVertical: 10,
                paddingHorizontal: 20
            }}
            style={[styles.container, {
                backgroundColor: colors.background
            }]}
            ListEmptyComponent={<EmptyListComponent text="Você ainda não possui lembretes salvos" />}
        />
    );
}