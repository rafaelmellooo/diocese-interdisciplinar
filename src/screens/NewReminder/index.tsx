import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../../navigation';
import { styles } from './styles';
import { useTheme } from '@react-navigation/native';

type NewScheduleProps = StackScreenProps<RootStackParamList, 'NewReminder'>;

export default function NewReminder(props: NewScheduleProps) {
    const { colors } = useTheme();

    const storedReminders = useAsyncStorage('@reminders');

    const handleNewScheduleButtonPress = async () => {
        const reminders = await storedReminders.getItem();

        if (reminders) {
            await storedReminders.setItem(JSON.stringify([
                ...JSON.parse(reminders),
                {
                    name: props.route.params.name,
                    info: props.route.params.info,
                    distance: props.route.params.distance
                }
            ]));
        } else {
            await storedReminders.setItem(JSON.stringify([{
                name: props.route.params.name,
                info: props.route.params.info,
                distance: props.route.params.distance
            }]));
        }

        props.navigation.goBack();
    }

    return (
        <View style={[styles.container, {
            backgroundColor: colors.background
        }]}>
            <Text>{props.route.params.name}</Text>
            <Text>{props.route.params.info}</Text>
            <Text>{props.route.params.distance}</Text>

            <TouchableOpacity onPress={() => handleNewScheduleButtonPress()}>
                <Ionicons name='notifications' color='#fff' size={16} />
                <Text>Criar Lembrete</Text>
            </TouchableOpacity>
        </View>
    );
}