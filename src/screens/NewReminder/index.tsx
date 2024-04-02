import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as Calendar from 'expo-calendar';
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from '../../navigation';
import { useCalendar } from '../../contexts/CalendarContext';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import moment, { Moment } from 'moment';

type NewScheduleProps = StackScreenProps<RootStackParamList, 'NewReminder'>;

export default function NewReminder(props: NewScheduleProps) {
    const { calendar } = useCalendar();
    const storedReminders = useAsyncStorage('@reminders');
    const { dark, colors } = useTheme();
    const [date, setDate] = useState<Moment>(moment());
    const [time, setTime] = useState<Moment>(moment());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(true);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(true);

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        if (event.type === 'dismissed') {
            setShowDatePicker(false);
            return;
        }

        setShowDatePicker(false);
        setDate(moment(selectedDate));
    };

    const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date): void => {
        if (event.type === 'dismissed') {
            setShowTimePicker(false);
            return;
        }

        setShowTimePicker(false);
        setTime(moment(selectedTime));
    };
    
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

        const {hours, minutes} = time.toObject();
        const finalDate = date.set({hours, minutes}).toDate();
        
        await Calendar.createEventAsync(calendar, {
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
            title: props.route.params.name,
            startDate: finalDate,
            endDate: finalDate,
            status: Calendar.EventStatus.CONFIRMED,
            ...(props.route.params.address && {location: props.route.params.address})
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
                <View style={{
                    flexDirection: 'row',
                    gap: 10
                }}>
                    <Text style={{
                        color: colors.text,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Data:</Text>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            columnGap: 5
                        }} 
                        onPressOut={() => setShowDatePicker(true)}
                    >
                        <Text style={{fontSize: 20, fontWeight: 'normal'}}>{date.format("DD/MM/YY")}</Text>
                        <Ionicons name='create-outline' color={colors.primary} size={20} />
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: 'row',
                    gap: 10
                }}>
                    <Text style={{
                        color: colors.text,
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>Hora:</Text>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            columnGap: 5
                        }}
                        onPressOut={() => setShowTimePicker(true)}
                    >
                        <Text style={{fontSize: 20, fontWeight: 'normal'}}>{time.format("HH:mm")}</Text>
                        <Ionicons name='create-outline' color={colors.primary} size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                {showTimePicker &&
                    <RNDateTimePicker
                    mode="time"
                    value={time.toDate()}
                    onChange={onTimeChange}
                    />
                }

                {showDatePicker &&
                    <RNDateTimePicker
                        mode="date"
                        value={date.toDate()}
                        onChange={onDateChange}
                    />
                }
            </View>

            <TouchableOpacity onPress={() => handlePress()} style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    color: dark ? '#0A1D33' : '#F5F3F3'
                }}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    );
}