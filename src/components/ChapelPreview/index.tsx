import React from 'react';
import { Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from "./styles";

type ChapelPreviewProps = {
    name: string;
    info: string;
    distance: string;
}

export default function ChapelPreview(props: ChapelPreviewProps) {
    const dimensions = useWindowDimensions();

    const handleScheduleButtonPress = async () => {
        const schedules = await AsyncStorage.getItem('schedules');

        if (schedules) {
            await AsyncStorage.setItem('schedules', JSON.stringify([
                ...JSON.parse(schedules),
                {
                    name: props.name,
                    info: props.info,
                    distance: props.distance
                }
            ]));

            return;
        }

        await AsyncStorage.setItem('schedules', JSON.stringify([
            {
                name: props.name,
                info: props.info,
                distance: props.distance
            }
        ]));
    }

    return (
        <View style={[
            styles.card,
            {
                width: dimensions.width * 0.8,
            }
        ]}>
            <Text>{props.name}</Text>
            <Text>{props.info}</Text>
            <Text>{props.distance}</Text>

            <TouchableOpacity style={styles.scheduleButton} onPress={() => handleScheduleButtonPress()}>
                <Ionicons name='calendar' color='#fff' size={16} />
                <Text style={styles.scheduleButtonText}>Agendar</Text>
            </TouchableOpacity>
        </View>
    );
}