import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Schedule } from '../../interfaces/Schedule';

export default function Schedules() {
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    useEffect(() => {
        loadSchedules();
    }, []);

    const loadSchedules = async () => {
        const schedules = await AsyncStorage.getItem('schedules');

        if (!schedules) {
            return;
        }

        setSchedules(JSON.parse(schedules));
    };

    return (
        <View>
            {
                schedules.map((schedule, index) => (
                    <View key={index}>
                        <Text>{schedule.name}</Text>
                        <Text>{schedule.info}</Text>
                        <Text>{schedule.distance}</Text>
                    </View>
                ))
            }
        </View>
    );
}