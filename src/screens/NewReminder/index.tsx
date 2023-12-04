import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as Calendar from 'expo-calendar';

import { RootStackParamList } from '../../navigation';
import { useCalendar } from '../../contexts/CalendarContext';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

type NewScheduleProps = StackScreenProps<RootStackParamList, 'NewReminder'>;

export default function NewReminder(props: NewScheduleProps) {
    const { calendar } = useCalendar();
    const storedReminders = useAsyncStorage('@reminders');
    const { colors } = useTheme();

    const handlePress = async () => {
        const reminders = await storedReminders.getItem();

        if (reminders) {
            await storedReminders.setItem(JSON.stringify([
                ...JSON.parse(reminders),
                {
                    name: props.route.params.name,
                    address: props.route.params.address
                }
            ]));
        } else {
            await storedReminders.setItem(JSON.stringify([{
                name: props.route.params.name,
                address: props.route.params.address
            }]));
        }

        await Calendar.createEventAsync(calendar, {
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
            title: props.route.params.name,
            startDate: new Date(),
            endDate: new Date(),
            status: Calendar.EventStatus.CONFIRMED
        });

        props.navigation.goBack();
    };

    return (
        <View style={{
            flex: 1,
            padding: 20,
            alignItems: 'center',
            gap: 20
        }}>
            <Text style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: 'bold'
            }}>{props.route.params.name}</Text>

            <View>
                <Text style={{
                    color: colors.text,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Data:</Text>

                <RNDateTimePicker mode="date" value={new Date()} />
            </View>

            <View>
                <Text style={{
                    color: colors.text,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Hora:</Text>

                <RNDateTimePicker mode="time" value={new Date()} />
            </View>

            <TouchableOpacity onPress={() => handlePress()} style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    color: colors.text
                }}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    );
}