import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";

const cities = [
  {
    id: 60,
    value: "Bertioga - SP",
  },
  {
    id: 57,
    value: "Cubatão - SP",
  },
  {
    id: 58,
    value: "Guarujá - SP",
  },
  {
    id: 61,
    value: "Itanhaém - SP",
  },
  {
    id: 63,
    value: "Mongaguá - SP",
  },
  {
    id: 62,
    value: "Peruíbe - SP",
  },
  {
    id: 64,
    value: "Praia Grande - SP",
  },
  {
    id: 59,
    value: "Santos - SP",
  },
  {
    id: 56,
    value: "São Vicente - SP",
  },
];

type CustomPickerProps = {
  selectedValue: number | undefined;
  onChange: (value: number) => void;
};

export default function CustomPicker(props: CustomPickerProps) {
  const { dark, colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <Ionicons lineBreakStrategyIOS="hangul-word" name="location" size={20} color={colors.text} />
      <Picker
        style={[
          styles.pickerContainer,
          {
            color: colors.text,
          },
        ]}
        dropdownIconColor={colors.text}
        selectedValue={props.selectedValue}
        onValueChange={(value: number) => props.onChange(value)}>
        <Picker.Item
          color={Platform.OS === 'ios' ? colors.text : undefined}
          label="Selecione uma cidade"
          value={undefined} />
        {
          cities.map((city) => (
            <Picker.Item
              color={Platform.OS === 'ios' ? colors.text : undefined}
              key={city.id}
              label={city.value}
              value={city.id}
            />
          ))
        }
      </Picker>
    </View>
  );
}
