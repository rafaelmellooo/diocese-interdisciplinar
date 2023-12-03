import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import CustomCheckbox from '../CustomCheckbox';

export default function Multiselect() {
    const { colors } = useTheme();

    //const scrollViewOpacity = useSharedValue(0);
    const scrollViewHeight = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: scrollViewHeight.value
        }
    });

    const handlePress = () => {
        if (scrollViewHeight.value === 0) {
            scrollViewHeight.value = withTiming(300, {
                duration: 100
            });
        } else {
            scrollViewHeight.value = withTiming(0, {
                duration: 100
            });
        }
    };

    return (
        <View style={{
            borderTopColor: colors.text,
            borderTopWidth: 2
        }}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.background,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
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

                <Ionicons name="chevron-down" size={16} color={colors.text} style={{
                    marginLeft: 'auto'
                }} />
            </TouchableOpacity>

            <Animated.ScrollView
                entering={FadeIn}
                exiting={FadeOut}
                style={[{
                    backgroundColor: colors.background,
                    //height: 300
                }, animatedStyle]}
                contentContainerStyle={{
                    paddingVertical: 10
                }}
            >
                <CustomCheckbox />

                <CustomCheckbox />

                <CustomCheckbox />

                <CustomCheckbox />

                <CustomCheckbox />

                <CustomCheckbox />

                <CustomCheckbox />

                <CustomCheckbox />
            </Animated.ScrollView>
        </View>
    );
}