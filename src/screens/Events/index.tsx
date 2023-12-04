import React, { useState, useCallback } from 'react';
import { View, Text, Share, Platform } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import * as Calendar from 'expo-calendar';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';
import { Event } from '../../interfaces/Event';
import { getEvents } from '../../services/diocesedesantos.api';
import { useCalendar } from '../../contexts/CalendarContext';

export default function Events() {
    const { colors } = useTheme();
    const { calendar } = useCalendar();

    const [events, setEvents] = useState<Event[]>([]);

    useFocusEffect(useCallback(() => {
        loadEvents();
    }, []));

    const loadEvents = async () => {
        const responseData = await getEvents();

        const events = responseData.data.map(item => {
            const event: Event = {
                id: item.id,
                title: item.title,
                date: new Date(item.start)
            }

            return event;
        });

        setEvents(events);
    };

    const handleShareButtonPress = (title: string, date: string) => {
        Share.share({
            message: `Evento da Diocese de Santos\n${title} - ${date}`,
        })
    };

    const handleAddToCalendarButtonPress = async (title: string, date: Date) => {
        await Calendar.createEventAsync(calendar, {
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
            title: title,
            startDate: date,
            endDate: date,
            status: Calendar.EventStatus.CONFIRMED
        });
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator
            style={styles.container}
            contentContainerStyle={{
                paddingVertical: 10,
                paddingHorizontal: 20
            }}
        >
            {
                events.map((event, index) => (
                    <View
                        style={[styles.card, {
                            backgroundColor: colors.card,
                            borderColor: colors.border
                        }]}
                        key={index}
                    >
                        <View>
                            <View style={[styles.cardTitleContainer]}>
                                <Text
                                    style={[styles.cardTitleText, {
                                        color: colors.text
                                    }]}
                                >
                                    {event.title}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => handleShareButtonPress(event.title, event.date.toLocaleDateString())}
                                >
                                    <Ionicons name="share-social" color={colors.text} size={32} />
                                </TouchableOpacity>
                            </View>
                            <Text
                                style={[{
                                    color: colors.text
                                }]}
                            >
                                {event.date.toLocaleDateString()} - {event.date.toLocaleDateString()}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10
                                }}
                                onPress={() => handleAddToCalendarButtonPress(event.title, event.date)}
                            >
                                <Ionicons name="calendar" color={colors.text} size={32} />
                                <Text style={{
                                    marginLeft: 10,
                                    color: colors.text,
                                    fontSize: 16
                                }}>
                                    Adicionar à agenda
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
    );
}