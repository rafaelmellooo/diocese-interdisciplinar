import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

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
];

type MultiselectProps = {
    selectedValues: number[];
    onChange: (values: number[]) => void;
};

export default function Multiselect(props: MultiselectProps) {
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

    const onChange = (scheduleId: number) => {
        if (props.selectedValues.includes(scheduleId)) {
            props.onChange(props.selectedValues.filter(selectedValue => selectedValue !== scheduleId));
        } else {
            props.onChange([...props.selectedValues, scheduleId]);
        }
    }

    return (
        <View style={{
            borderTopColor: colors.text,
            borderTopWidth: 2
        }}>
            <TouchableWithoutFeedback
                onPress={() => handlePress()}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: colors.background,
                    paddingLeft: 18,
                    paddingRight: 25,
                    paddingVertical: 15,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Ionicons name="time" size={20} color={colors.text} />

                        <Text style={{
                            color: colors.text,
                            fontSize: 16,
                            marginLeft: 13
                        }}>
                            Selecione os dias e horários
                        </Text>
                    </View>

                    <Ionicons name="caret-down" size={12} color={colors.text} />
                </View>
            </TouchableWithoutFeedback>

            <Animated.ScrollView
                showsVerticalScrollIndicator
                style={[{
                    backgroundColor: colors.background,
                }, animatedStyle]}
                contentContainerStyle={{
                    paddingHorizontal: 10
                }}
            >
                {
                    schedules.map((schedule, index) => (
                        <CustomCheckbox
                            value={props.selectedValues.includes(schedule.id)}
                            onChange={() => onChange(schedule.id)}
                            key={index}
                            label={schedule.value}
                        />
                    ))
                }
            </Animated.ScrollView>
        </View>
    );
}