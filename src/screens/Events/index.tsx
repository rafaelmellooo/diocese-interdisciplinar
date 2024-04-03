import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import * as Calendar from 'expo-calendar';

import { styles } from './styles';
import { Event } from '../../interfaces/Event';
import { getEvents } from '../../services/diocesedesantos.api';
import { useCalendar } from '../../contexts/CalendarContext';
import EventCard from '../../components/EventCard';
import EmptyListComponent from '../../components/EmptyListComponent';

export type EventElement = Event & {isAdded: boolean};

export default function Events() {
    const { calendar } = useCalendar();

    const [events, setEvents] = useState<EventElement[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useFocusEffect(useCallback(() => {
        loadEvents();
    }, []));

    const loadEvents = async () => {
        setIsLoading(true);
        const responseData = await getEvents();

        const events = responseData.data.map(item => {
            const event: EventElement = {
                id: item.id,
                title: item.title,
                date: new Date(item.start),
                isAdded: false,
            }

            return event;
        });

        setEvents(events);
        setIsLoading(false);
    };

    const addToCalendar = async (title: string, date: Date, index: number) => {
        await Calendar.createEventAsync(calendar, {
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
            title: title,
            startDate: date,
            endDate: date,
            status: Calendar.EventStatus.CONFIRMED
        });
        
        let eventsArr = [...events];
        eventsArr[index].isAdded = true;

        setEvents(eventsArr);
    };

    return (
        <FlatList
            data={events}
            renderItem={({item, index}) => <EventCard event={item} index={index} addToCalendar={addToCalendar}/>}
            showsVerticalScrollIndicator
            style={styles.container}
            contentContainerStyle={{
                paddingVertical: 10,
                paddingHorizontal: 20
            }}
            refreshing={isLoading}
            onRefresh={() => {}}
            ListEmptyComponent={<EmptyListComponent text="Nenhum evento encontrado"/>}
        />
    );
}