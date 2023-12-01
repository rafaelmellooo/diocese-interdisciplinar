import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { LayoutChangeEvent, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';
import { useTheme } from '@react-navigation/native';

const cities = [
    {
        id: 60,
        value: 'Bertioga - SP'
    },
    {
        id: 57,
        value: 'Cubatão - SP'
    },
    {
        id: 58,
        value: 'Guarujá - SP'
    },
    {
        id: 61,
        value: 'Itanhaém - SP'
    },
    {
        id: 63,
        value: 'Mongaguá - SP'
    },
    {
        id: 62,
        value: 'Peruíbe - SP'
    },
    {
        id: 64,
        value: 'Praia Grande - SP'
    },
    {
        id: 59,
        value: 'Santos - SP'
    },
    {
        id: 56,
        value: 'São Vicente - SP'
    }
];

type CityPickerProps = {
    onCityChange: (cityId: number) => void;
};

export default function CityPicker(props: CityPickerProps) {
    const { colors } = useTheme();

    const [selectedCity, setSelectedCity] = useState<number>();

    const handleCityChange = (cityId: number) => {
        setSelectedCity(cityId);

        props.onCityChange(cityId);
    }

    return (
        <View
            style={[styles.container, {
                backgroundColor: colors.background
            }]}
        >
            <Ionicons name="location" size={24} color={colors.text} />
            <Picker
                style={[styles.pickerContainer, {
                    color: colors.text
                }]}
                dropdownIconColor={colors.text}
                selectedValue={selectedCity}
                onValueChange={(cityId: number) => handleCityChange(cityId)}
            >
                <Picker.Item label='Selecione uma cidade' value={null} />
                {
                    cities.map(city => (
                        <Picker.Item key={city.id} label={city.value} value={city.id} />
                    ))
                }
            </Picker>
        </View>
    );
}