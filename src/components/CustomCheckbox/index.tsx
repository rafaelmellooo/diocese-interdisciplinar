import { useTheme } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CustomCheckboxProps = {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
};

export default function CustomCheckbox(props: CustomCheckboxProps) {
    const { colors } = useTheme();

    return (
        <View style={{
            marginVertical: 10
        }}>
            <TouchableOpacity
                style={{
                    backgroundColor: colors.background,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10
                }}
                onPress={() => props.onChange(!props.value)}
            >
                <Checkbox value={props.value} color={colors.primary} />
                <Text style={{
                    color: colors.text,
                    fontWeight: 'bold',
                    marginLeft: 10
                }}>
                    {props.label}
                </Text>
            </TouchableOpacity>
        </View>
    );
}