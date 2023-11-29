import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getRandomVerse } from '../../services/abibliadigital.api';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Verse } from '../../interfaces/Verse';
import { RootStackParamList } from '../../navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from './styles';

type DailyVerseProps = StackScreenProps<RootStackParamList, 'DailyVerse'>;

export default function DailyVerse(props: DailyVerseProps) {
    const [verse, setVerse] = useState<Verse>();

    useEffect(() => {
        loadDailyVerse().then(() => {
            setTimeout(() => {
                props.navigation.navigate('Home');
            }, 5000);
        });
    }, []);

    const textOpacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: textOpacity.value
        }
    });

    const loadDailyVerse = async () => {
        const responseData = await getRandomVerse();

        const verse: Verse = {
            bookName: responseData.book.name,
            chapter: responseData.chapter,
            number: responseData.number,
            text: responseData.text
        };

        setVerse(verse);
        textOpacity.value = withTiming(1, {
            duration: 1000
        });
    }

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[styles.title, animatedStyle]}
            >
                {verse?.bookName} {verse?.chapter}:{verse?.number}
            </Animated.Text>

            <Animated.Text
                style={[styles.text, animatedStyle]}
            >
                {verse?.text}
            </Animated.Text>
        </View>
    );
}