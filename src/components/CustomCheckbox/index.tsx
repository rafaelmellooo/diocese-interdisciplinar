import { useTheme } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function CustomCheckbox() {
    const { colors } = useTheme();

    const [value, setValue] = React.useState(false);

    return (
        <View style={{
            marginVertical: 10
        }}>
            <TouchableOpacity
                style={{
                    backgroundColor: colors.background,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: colors.border,
                    borderWidth: 2,
                    padding: 10,
                    borderRadius: 2
                }}
                onPress={() => setValue(!value)}
            >
                <Checkbox value={value} color={colors.primary} />
                <Text style={{
                    color: colors.text,
                    fontWeight: 'bold',
                    marginLeft: 10
                }}>
                    Hello
                </Text>
            </TouchableOpacity>
        </View>
    );
}