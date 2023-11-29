import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../../navigation';

type NewScheduleProps = StackScreenProps<RootStackParamList, 'NewSchedule'>;

export default function NewSchedule(props: NewScheduleProps) {
    const handleNewScheduleButtonPress = async () => {
        const schedules = await AsyncStorage.getItem('schedules');

        if (schedules) {
            await AsyncStorage.setItem('schedules', JSON.stringify([
                ...JSON.parse(schedules),
                {
                    name: props.route.params.name,
                    info: props.route.params.info,
                    distance: props.route.params.distance
                }
            ]));
        } else {
            await AsyncStorage.setItem('schedules', JSON.stringify([
                {
                    name: props.route.params.name,
                    info: props.route.params.info,
                    distance: props.route.params.distance
                }
            ]));
        }

        props.navigation.goBack();
    }

    return (
        <View>
            <Text>{props.route.params.name}</Text>
            <Text>{props.route.params.info}</Text>
            <Text>{props.route.params.distance}</Text>

            <TouchableOpacity onPress={() => handleNewScheduleButtonPress()}>
                <Ionicons name='calendar' color='#fff' size={16} />
                <Text>Agendar</Text>
            </TouchableOpacity>
        </View>
    );
}