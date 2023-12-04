import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { styles } from "./styles";

type ChapelPreviewProps = {
  name: string;
  info: {
    title?: string;
    text?: string;
  };
  distance: string;
  address?: string;
  contact?: string;
};

export default function ChapelPreview(props: ChapelPreviewProps) {
  const { dark, colors } = useTheme();

  const dimensions = useWindowDimensions();

  const handleReminderButtonPress = async () => { };

  return (
    <View
      style={[
        styles.card,
        {
          width: dimensions.width * 0.8,
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 10
        }}>
        <View style={{
          flex: 1
        }}>
          <Text
            style={[
              styles.title,
              {
                color: dark ? "#1386F2" : "#0D2744",
              },
            ]}>
            {props.name}
          </Text>

          <Text style={[{
            fontWeight: 'bold',
            color: colors.text
          }]}>
            {props.info.title}
          </Text>

          <Text
            style={[
              {
                color: colors.text,
              },
            ]}>
            {props.info.text}
          </Text>

          <Text style={[{
            marginTop: 10,
            fontWeight: 'bold',
            color: colors.text
          }]}>
            Endereço
          </Text>

          <Text
            style={[
              {
                color: colors.text
              }
            ]}>
            {props.address}
          </Text>

          {
            props.contact && (
              <Text style={[{
                marginTop: 10,
                color: colors.text
              }]}>
                Telefone: {props.contact}
              </Text>
            )
          }
        </View>

        <Text style={[styles.distance, {
          borderColor: colors.primary,
        }]}>
          {props.distance}
        </Text>
      </View>

      <TouchableOpacity style={[styles.reminderButton, {
        backgroundColor: colors.primary
      }]} onPress={() => handleReminderButtonPress()}>
        <Ionicons name='notifications' color={dark ? '#0A1D33' : '#F5F3F3'} size={16} />

        <Text
          style={[styles.reminderButtonText, {
            color: dark ? '#0A1D33' : '#F5F3F3'
          }]}
        >
          Criar Lembrete
        </Text>
      </TouchableOpacity>
    </View>
  );
}
