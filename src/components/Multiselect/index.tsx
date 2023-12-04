import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import CustomCheckbox from '../CustomCheckbox';

const schedules = [
    {
        id: 69,
        value: 'Domingo de manhã'
    },
    {
        id: 71,
        value: 'Domingo à tarde'
    },
    {
        id: 70,
        value: 'Domingo à noite'
    },
    {
        id: 57,
        value: 'Segunda de manhã'
    },
    {
        id: 76,
        value: 'Segunda às 12h (meio dia)'
    },
    {
        id: 82,
        value: 'Segunda 12h30'
    },
    {
        id: 72,
        value: 'Segunda à tarde'
    },
    {
        id: 58,
        value: 'Segunda à noite'
    },
    {
        id: 59,
        value: 'Terça de manhã'
    },
    {
        id: 77,
        value: 'Terça às 12h (meio dia)'
    },
    {
        id: 83,
        value: 'Terça 12h30'
    },
    {
        id: 88,
        value: 'Terça à tarde'
    },
    {
        id: 60,
        value: 'Terça à noite'
    },
    {
        id: 61,
        value: 'Quarta de manhã'
    },
    {
        id: 78,
        value: 'Quarta às 12h (meio dia)'
    },
    {
        id: 73,
        value: 'Quarta à tarde'
    },
    {
        id: 62,
        value: 'Quarta à noite'
    },
    {
        id: 63,
        value: 'Quinta de manhã'
    },
    {
        id: 79,
        value: 'Quinta às 12h (meio dia)'
    },
    {
        id: 74,
        value: 'Quinta à tarde'
    },
    {
        id: 64,
        value: 'Quinta à noite'
    },
    {
        id: 65,
        value: 'Sexta de manhã'
    },
    {
        id: 80,
        value: 'Sexta às 12h (meio dia)'
    },
    {
        id: 75,
        value: 'Sexta à tarde'
    },
    {
        id: 66,
        value: 'Sexta à noite'
    },
    {
        id: 67,
        value: 'Sábado de manhã'
    },
    {
        id: 81,
        value: 'Sábado às 12h (meio dia)'
    },
    {
        id: 87,
        value: 'Sábado à tarde'
    },
    {
        id: 68,
        value: 'Sábado à noite'
    }
]

export default function Multiselect() {
    const { colors } = useTheme();

    const [isOpen, setIsOpen] = React.useState(false);

    //const scrollViewOpacity = useSharedValue(0);
    const scrollViewHeight = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: scrollViewHeight.value
        }
    });

    const handlePress = () => {
        if (!isOpen) {
            scrollViewHeight.value = withSpring(250, {
                overshootClamping: true
            });

            setIsOpen(true);
        } else {
            scrollViewHeight.value = withSpring(0, {
                overshootClamping: true
            });

            setIsOpen(false);
        }
    };

    return (
        <View style={{
            borderTopColor: colors.text,
            borderTopWidth: 2
        }}>
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.background,
                    paddingHorizontal: 20,
                    paddingVertical: 20
                }}
                onPress={() => handlePress()}
            >
                <Ionicons name="time" size={24} color={colors.text} />

                <Text style={{
                    color: colors.text,
                    fontSize: 16,
                    marginLeft: 10
                }}>
                    Selecione os dias da semana
                </Text>

                <Ionicons name="caret-down" size={16} color={colors.text} style={{
                    marginLeft: 'auto'
                }} />
            </TouchableOpacity>

            <Animated.ScrollView
                showsVerticalScrollIndicator
                style={[{
                    backgroundColor: colors.background,
                }, animatedStyle]}
                contentContainerStyle={{
                    paddingVertical: 10,
                    paddingHorizontal: 10
                }}
            >
                {
                    schedules.map((schedule, index) => (
                        <CustomCheckbox
                            key={index}
                            label={schedule.value}
                        />
                    ))
                }
            </Animated.ScrollView>
        </View>
    );
}