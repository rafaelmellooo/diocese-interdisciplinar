import React, { memo } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { styles } from "./styles";
import { RootStackParamList } from "../../navigation";

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

const ChapelPreview = (props: ChapelPreviewProps) => {
  const { dark, colors } = useTheme();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Home">>();

  const dimensions = useWindowDimensions();

  const handleReminderButtonPress = async () => {
    navigation.navigate("NewReminder", {
      name: props.name,
      address: props.address,
    });
  };

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
          width: dimensions.width * 0.7,
          rowGap: 10
      }}>
        <View style={{
          width: dimensions.width * 0.7,
          flexDirection: "row",
          columnGap: 12,
        }}>
          <View style={{
            flex: 2,
          }}>
            <Text
              style={[
                styles.title,
                {
                  color: dark ? "#1386F2" : "#0D2744",
                  marginBottom: 0,
                },
              ]}>
              {props.name}
            </Text>
          </View>

          <View style={{
            flex: 1,
          }}>
            <Text style={[styles.distance, {
              borderColor: colors.primary,
              textAlign: "center",
            }]}>
              {props.distance}
            </Text>
          </View>
        </View>

        <ScrollView
            style={{
              height: 120,
            }}
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
          >
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
        </ScrollView>
      </View>

      <TouchableOpacity style={[styles.reminderButton, {
        backgroundColor: colors.primary
      }]} onPress={() => handleReminderButtonPress()}>
        <Ionicons name='notifications' color='#F5F3F3' size={16} />

        <Text
          style={[styles.reminderButtonText, {
            color: '#F5F3F3'
          }]}
        >
          Criar Lembrete
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default memo(ChapelPreview);
