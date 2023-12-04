import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StackScreenProps } from "@react-navigation/stack";
import { styles } from "./styles";
import { useTheme } from "@react-navigation/native";

import { Verse } from "../../interfaces/Verse";
import { RootStackParamList } from "../../navigation";
import { getRandomVerse } from "../../services/abibliadigital.api";

type DailyVerseProps = StackScreenProps<RootStackParamList, "DailyVerse">;

export default function DailyVerse(props: DailyVerseProps) {
  const { colors } = useTheme();

  const [verse, setVerse] = useState<Verse>();

  useEffect(() => {
    loadDailyVerse().then(() => {
      setTimeout(() => {
        props.navigation.navigate("Home");
      }, 5000);
    });
  }, []);

  const textOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity);

  const loadDailyVerse = async () => {
    const responseData = await getRandomVerse();

    const verse: Verse = {
      bookName: responseData.book.name,
      chapter: responseData.chapter,
      number: responseData.number,
      text: responseData.text,
    };

    setVerse(verse);
    textOpacity.value = withTiming(1, {
      duration: 1000,
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          alignItems: "center",
        },
      ]}>
      <Animated.Text
        style={[
          styles.title,
          animatedStyle,
          {
            color: colors.text,
          },
        ]}>
        {verse?.bookName} {verse?.chapter}:{verse?.number}
      </Animated.Text>

      <Animated.Text
        style={[
          styles.text,
          animatedStyle,
          {
            color: colors.text,
          },
        ]}>
        {verse?.text}
      </Animated.Text>

      <TouchableOpacityAnimated
        style={[{
          marginTop: 40,
          borderColor: colors.text,
          borderWidth: 2,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10
        }, animatedStyle]}
        onPress={() => props.navigation.navigate("Home")}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 32,
            marginLeft: 10,
          }}
        >
          Fechar
        </Text>
      </TouchableOpacityAnimated>
    </View>
  );
}
