import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import * as Calendar from 'expo-calendar';

import { styles } from './styles';
import { Event } from '../../interfaces/Event';
import { getCalendarSavedEvents, getEvents } from '../../services/diocesedesantos.api';
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
        const savedEvents = await getCalendarSavedEvents([calendar]);
        const savedEventTitles = savedEvents.map(({title}) => title);

        const events = responseData.data.map(item => {
            const event: EventElement = {
                id: item.id,
                title: item.title,
                date: new Date(item.start),
                address: item.location[0]?.location,
                isAdded: savedEventTitles.includes(item.title),
            }

            return event;
        });

        setEvents(events);
        setIsLoading(false);
    };

    const addToCalendar = async (event: EventElement, index: number) => {
        await Calendar.createEventAsync(calendar, {
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
            title: event.title,
            startDate: event.date,
            endDate: event.date,
            status: Calendar.EventStatus.CONFIRMED,
            ...(event.address && {location: event.address})
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